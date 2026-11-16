import Countable from './Countable';

export default class Gadget implements Countable {
    constructor(
        public readonly id: number,
        public name: string,
        public price: number,
        public description: string,
    ) {}

    toString(): string {
        return JSON.stringify(this);
    }

    toDict() {
        return {...this};
    }
}
