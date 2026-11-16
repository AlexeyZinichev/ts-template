// tests/cart.test.ts

import Cart from '../src/service/Cart';
import Movie from '../src/domain/Movie'; // Unique
import Gadget from '../src/domain/Gadget'; // Countable

describe('Класс Cart', () => {
    let cart: Cart;

    beforeEach(() => {
        cart = new Cart();
    });

    describe('Работа с уникальными товарами (Unique)', () => {
        it('добавляет товар только один раз', () => {
            const movie = new Movie(101, 'Мстители', 2012, 'США', '', [], 140, 699);
            cart.add(movie);
            expect(cart.items.length).toBe(1); // ✅

            cart.add(movie); // Повторное добавление игнорируется
            expect(cart.items.length).toBe(1); // ⚡️ Количество не изменилось
        });

        it('правильно считает сумму', () => {
            cart.add(new Movie(101, '', 0, '', '', [], 0, 500));
            cart.add(new Movie(102, '', 0, '', '', [], 0, 700));
            expect(cart.totalPrice()).toBe(1200); // ✅
        });
    });

    describe('Работа с счётными товарами (Countable)', () => {
        it('увеличивает количество при повторном добавлении', () => {
            const gadget = new Gadget(201, 'iPhone', 99_990, '');
            cart.add(gadget);
            expect(cart.items[0].quantity).toBe(1); // ✅

            cart.add(gadget);
            expect(cart.items[0].quantity).toBe(2); // ⚡️ Кол-во увеличилось
        });

        it('уменьшает количество товара', () => {
            const gadget = new Gadget(201, 'iPad', 59_990, '');
            cart.add(gadget);
            cart.add(gadget); // Стало 2 штуки

            cart.decrementQuantity(201);
            expect(cart.items[0].quantity).toBe(1); // ⚡️ Уменьшилось до 1

            cart.decrementQuantity(201);
            expect(cart.items.length).toBe(0); // ⚡️ Товар удалён из корзины
        });

        it('игнорирует попытку уменьшить несуществующий товар', () => {
            const result = cart.decrementQuantity(999);
            expect(result).toBe(false); // ⚡️ Вернуло false
        });
    });

    describe('Скидка и общая сумма', () => {
        it('корректно вычисляет общую стоимость', () => {
            cart.add(new Movie(101, '', 0, '', '', [], 0, 500)); // Уникальный
            cart.add(new Gadget(201, '', 1000, '')); // Счётный x1
            cart.add(new Gadget(201, '', 1000, '')); // Ещё раз тот же гаджет
            expect(cart.totalPrice()).toBe(2500); // 500 + 1000*2 = 2500 ✅
        });

        it('применяет скидку к итоговой сумме', () => {
            cart.add(new Movie(101, '', 0, '', '', [], 0, 1000));
            expect(cart.discountedTotal(10)).toBe(900); // ✅
            expect(cart.discountedTotal(50)).toBe(500); // ✅
        });

        it('выбрасывает ошибку при неверной скидке', () => {
            expect(() => cart.discountedTotal(-1)).toThrow(RangeError);
            expect(() => cart.discountedTotal(101)).toThrow(RangeError);
        });
    });
});
