let string = 'some test string';

/* 1. Сделать первую и последнюю буквы строки в верхнем 
регистре. При помощи конкатенации и через шаблонные строки. */
string = `${string[0].toUpperCase()}${string.slice(1, -1)}${string[string.length-1].toUpperCase()} `
console.log(string);

// 2. Найти положение слова 'string' в строке.
console.log(string.toLowerCase().indexOf('string'));

/* 3. Найти положение второго пробела в строке 
(“вручную” ничего не считать). */
console.log(string.toLowerCase().lastIndexOf(" "));

// 4. Получить строку с 5-го по 9-й символы.
console.log(string.slice(5, 9));

/* 5. Получить число pi из Math и округлить его до 2-х 
знаков после точки. */
console.log(Math.PI.toFixed(2));

/* 6. Используя Math, найти максимальное и минимальное числа
 из представленного ряда 15, 11, 16, 12, 51, 12, 13, 51. */
console.log(`min: ${Math.min(15, 11, 16, 12, 51, 12, 13, 51)}, max: ${Math.max(15, 11, 16, 12, 51, 12, 13, 51)}`);

// 7. Получить случайное число и округлить его до двух цифр после запятой.
console.log(Math.random().toFixed(2));

/* 8. Получить случайное целое число от 0 до X. X - любое 
произвольное число. */
const x = 20;
console.log(`${(Math.random()*x + 1).toFixed()}`);

/* 9. Проверить результат вычисления 0.6 + 0.7 - как 
привести к нормальному виду (1.3)? */
const a = 0.6,
      b = 0.7;
console.log((a+b).toFixed(1));

// 10. Создать объект с полем **product**, равным 'iPhone'.
const someObject = {
	product: 'iPhone'
}
console.table(someObject);

/* 11. Добавить в объект поле **price**, 
равное 1000 и поле **currency**, равное 'dollar'. */
someObject.price = 1000;
someObject.currency = 'dollar';
console.table(someObject);

/* 12. Добавить поле **details**, которое будет 
содержать объект с полями **model** и **color** */
someObject.details = {
	model: 11,
	color: 'Purple'
};
console.table(someObject);