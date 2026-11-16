import { Unique } from './Unique';

// Счётный товар наследует всё от уникального + имеет кол-во
export  interface Countable extends Unique {
    quantity?: number; // Кол-во по умолчанию undefined или null
}
