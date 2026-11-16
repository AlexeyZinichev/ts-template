import Buyable from './Buyable';

export default class Book implements Buyable {
    constructor(
        public readonly id: number,
        public author: string,
        public title: string,
        public price: number,         // Четвёртый аргумент
        public pagesCount?: number,   // Пятый аргумент (опциональный)
        public name = `${this.author} — ${this.title}`, // Имя товара
    ) {}

    toString(): string {
        return JSON.stringify(this);
    }

    toDict() {
        return { ...this };
    }
}
