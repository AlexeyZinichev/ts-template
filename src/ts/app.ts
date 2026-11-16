import Cart from './service/Cart';
import Book from './domain/Book'; // Путь проверил?
import MusicAlbum from './domain/MusicAlbum';
import Movie from './domain/Movie';

const cart = new Cart();
console.log(cart.items); // []

// Правильный порядок аргументов (см. ниже структуру классов)
cart.add(new Book(1001, 'Л.Н. Толстой', 'Война и мир', 599, 1225));
cart.add(new MusicAlbum(1008, 'Linkin Park', 'Meteora', 399));
cart.add(new Movie(1009, 'Мстители', 'США', 2012, '"Avengers Assemble!"', ['фантастика'], 140, 699));

console.log('Товары:', cart.items.map((item) => item.name));
console.log('Сумма без скидки:', cart.totalPrice());
console.log('Скидка 10%:', cart.discountedTotal(10));
