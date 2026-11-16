// src/domain/MusicAlbum.ts

import Buyable from './Buyable';

export default class MusicAlbum implements Buyable {
    constructor(
        public readonly id: number,
        public artist: string,
        public title: string,
        public price: number,
        // Имя товара для корзины (имплементация интерфейса)
        public name = `${this.artist} — ${this.title}`,
    ) {}

    toString(): string {
        return JSON.stringify(this);
    }

    toDict() {
        return { ...this };
    }
}
