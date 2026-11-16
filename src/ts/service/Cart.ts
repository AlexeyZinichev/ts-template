import { Unique } from '../domain/Unique';
import { Countable } from '../domain/Countable'; // Именованный импорт

export default class Cart {
  private readonly _items = new Map<
    number,
    | Unique
    | {
        item: Countable;
        quantity: number;
      }
  >();

  get items():
    | ReadonlyArray<Unique>
    | ReadonlyArray<{
        id: number;
        name: string;
        price: number;
        quantity: number;
      }> {
    const result = [];

    for (const [_, value] of this._items.entries()) {
      if ('item' in value) {
        // Это счётный товар (Gadget)
        // Берём все свойства самого товара и добавляем кол-во
        result.push({ ...value.item, quantity: value.quantity });
      } else {
        // Это уникальный товар (Movie или Book)
        // Возвращаем его полностью
        result.push(value);
      }
    }

    return result;
  }

  add(item: Unique): void {
    // Проверка во время выполнения программы
    if (!('quantity' in item)) {
      // Уникальный товар добавляется максимум один раз
      if (this._items.has(item.id)) return;
      this._items.set(item.id, item);
      return;
    }

    // Счётный товар (в нём точно есть quantity!)
    const existing = this._items.get(item.id);
    if (existing && 'item' in existing) {
      // Увеличиваем количество
      existing.quantity++;
    } else {
      // Первый раз добавили
      this._items.set(
        item.id,
        {
          item: item as Countable, // Явное приведение типа
          quantity: 1,
        },
      );
    }
  }

  remove(id: number): void {
    this._items.delete(id);
  }

  decrementQuantity(id: number): boolean {
    const entry = this._items.get(id);
    if (!entry || !('item' in entry)) return false;

    if (entry.quantity === 1) {
      // Последний экземпляр, удаляем из корзины
      this.remove(id);
      return true;
    }

    entry.quantity--;
    return true;
  }

  totalPrice(): number {
    let sum = 0;

    for (const [_, value] of this._items.entries()) {
      const qty = 'item' in value ? value.quantity : 1;
      const price = 'price' in value ? value.price : value.item.price;
      sum += price * qty;
    }

    return sum;
  }

  discountedTotal(discount: number): number {
    if (!(discount >= 0 && discount <= 100))
      throw new RangeError('Скидка должна быть от 0% до 100%.');
    
    return Math.round(this.totalPrice() - (this.totalPrice() / 100 * discount));
  }
}
