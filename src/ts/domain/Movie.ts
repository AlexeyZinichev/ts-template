import Buyable from './Buyable';

export default class Movie implements Buyable {
    constructor(
        public readonly id: number,
        public title: string,
        public country: string,
        public year: number,
        public slogan: string,
        public genres: string[],
        public durationMin: number,
        public price: number,
        public name = this.title, // Реализация интерфейса Buyable
    ) {}

    toString(): string {
        return JSON.stringify(this);
    }

    toDict() {
        return { ...this };
    }
}
