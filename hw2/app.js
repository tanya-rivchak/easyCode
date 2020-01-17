/* 1. Дан объект **car**.
Написать условие если поле **lastService** больше 5 месяцев (*из строки 
    нужно достать число*) то нужно вывести в консоль сообщение 'Need Repair' 
и свойство **needRepair** в объекте **car** изменить на **true**; иначе 
изменить на **false**. */
let car = { 
    name: 'Lexus', 
    age: 10, 
    lastService: '1 month',
    create: 2008, 
    needRepair: false 
};

if(parseInt(car.lastService) > 5){
    console.log('Need Repair');
    car.needRepair = true;
}else{
    car.needRepair = false;
}

// 2.
let product = {
    name: 'Яблоко',
    price: '10$'
};

let min = 10; // минимальная цена
let max = 20; // максимальная цена
/* Написать условие **если цена товара больше или равна минимальной цене и меньше
 или равна максимальной цене** то вывести в консоль название этого товара, 
 иначе вывести в консоль что товар не найден. */
if(parseFloat(product.price) >= min && parseFloat(product.price) <= max){
    console.log(product.name);
}else{
    console.log('Товар не найден');
}

/* 3. На основе строки
*“JavaScript is a pretty good language”*
Cделать новую строку, где каждое слово начинается с большой буквы, а пробелы 
удалены. Использовать цикл **for.** */
let str = 'JavaScript is a pretty good language';

let res = '';
for(let i = 0; i < str.length; i++){
    if(str[i] == ' '){
        continue;
    }
    str[i-1] == ' ' ? res += str[i].toUpperCase() : res += str[i];
}
console.log(res);

/* 4. Создать функцию, которая принимает массив, а возвращает новый массив с 
дублированными элементами входного массива:
*doubleArray([1,2,3]) // [1,2,3,1,2,3]* */
function doubleArray(arr){
    let res = arr.concat(arr);
    console.log(res);
}
doubleArray([1,2,3]);

/* 5. Создать функцию, которая принимает произвольное (любое) число массивов и 
удаляет из каждого массива первый элемент, а возвращает массив из оставшихся
 значений:
*changeCollection([1,2,3], [‘a’, ’b’, ‘c’]) → [ [2,3], [‘b’, ‘c’] ],* 
*changeCollection([1,2,3]) → [ [2,3] ]* и т.д*.* */
//Вариант с использованием соверменного js - rest parametrers
function changeCollection(...arr){
    let res = [];
    for(let el of arr){
        el.shift();
        res.push(el);
    }
    console.log(res);
}
//Вариант с массивом аргументами
/* function changeCollection(){
    let res = [];
    for(let i = 0; i < arguments.length; i++){
        arguments[i].shift();
        res.push(arguments[i]);
    }
    console.log(res);
}
 */
changeCollection([1,2,3], ['a', 'b', 'c']);


// 6. Дан массив пользователей:
const users = [
    {
      "_id": "5d1c3860aa841704d3245513",
      "isActive": false,
      "balance": 2764.35,
      "age": 33,
      "name": "Allie Blair",
      "gender": "female",
      "company": "PHOTOBIN",
      "email": "allieblair@photobin.com",
      "phone": "+1 (951) 566-2987",
      "registered": "2018-11-30T02:29:00 -02:00"
    },
    {
      "_id": "5d1c386095ffb689687f2db9",
      "isActive": false,
      "balance": 3276.25,
      "age": 22,
      "name": "Yesenia Leblanc",
      "gender": "female",
      "company": "SKINSERVE",
      "email": "yesenialeblanc@skinserve.com",
      "phone": "+1 (947) 446-2840",
      "registered": "2015-10-31T01:10:31 -02:00"
    },
    {
      "_id": "5d1c3860e73ff2a338722e81",
      "isActive": true,
      "balance": 1868.65,
      "age": 38,
      "name": "Mamie Kramer",
      "gender": "female",
      "company": "EARBANG",
      "email": "mamiekramer@earbang.com",
      "phone": "+1 (885) 564-3305",
      "registered": "2014-06-03T09:36:40 -03:00"
    },
    {
      "_id": "5d1c386000e4f2fc62be1b1e",
      "isActive": true,
      "balance": 1003.15,
      "age": 32,
      "name": "Crawford Bryant",
      "gender": "male",
      "company": "DIGIRANG",
      "email": "crawfordbryant@digirang.com",
      "phone": "+1 (889) 408-2141",
      "registered": "2015-01-15T05:20:21 -02:00"
    },
    {
      "_id": "5d1c386008ff236a315d638b",
      "isActive": false,
      "balance": 3045.41,
      "age": 36,
      "name": "Helene Holland",
      "gender": "female",
      "company": "HYDROCOM",
      "email": "heleneholland@hydrocom.com",
      "phone": "+1 (937) 554-2040",
      "registered": "2014-09-15T08:22:59 -03:00"
    },
    {
      "_id": "5d1c3860b4c27c4d5fdb6c1f",
      "isActive": true,
      "balance": 1693.51,
      "age": 23,
      "name": "Hernandez Osborn",
      "gender": "male",
      "company": "TERRASYS",
      "email": "hernandezosborn@terrasys.com",
      "phone": "+1 (965) 595-3942",
      "registered": "2016-08-06T12:19:01 -03:00"
    }
];
/* Создать функцию которая принимает массив пользователей, поле которое по которому 
хочу фильтровать, значение на которое хочу фильтровать. Возвращать новый массив 
с пользователями соответсвующие указанным параметрам */
function funcGetUsers(users, filter, filterVal){
    let res = [];

    for(let el of users){
        let filters = {
            '_id' : el._id, 
            'isActive' : el.isActive, 
            'balance' : el.balance, 
            'age' : el.age,
            'name' : el.name, 
            "gender" : el.gender, 
            'company' : el.company, 
            'email' : el.email, 
            'phone' : el.phone, 
            'registered' : el.registered
        }

        if(filters[filter] === filterVal){
            res.push(el);
        }
    }
    console.log(res);
}
funcGetUsers(users, "gender", "male");

// 7. Проверить как изменится объект obj и найти объяснение

const obj = {};
(function(x) {
  x.b = 1;  //x: {b:1}, obj: {b:1}
  x = null;  //x: null, obj: {b:1}
})(obj);
console.log(obj);

/* Параметр вызова функции x - ее аргумент и передается в функции по значению.
Когда функция присваевает x null, глобально это не отображается. obj передается 
в функцию в качестве ссылки на объект, а не примитивного параметра, из-за этого 
функция изменяет свойства по ссылке и эти изменения видно снаружи функции. */

/* 8. Создать объект, у которого будет цена товара и его скидка, а также
два метода: для получения цены и для расчета цены с учетом скидки: */

const price = {
    price: 10,
    discount: '15%',
    getPrice: function(){
        console.log(`Цена на товар: ${this.price}$`);
    },
    getPriceWithDiscount: function(){
        console.log(`Цена товара с учетом скидки: ${this.price - this.price*parseFloat(this.discount)/100}$`);
    }
};
  
price.getPrice(); // 10
price.getPriceWithDiscount(); // 8.5

// 9. Даны объект и функция:
let sizes = { width: 5, height: 10 },
    getSquare = function () { return this.width * this.height };
/*  Не изменяя функцию или объект, получить результат функции
*getSquare* для объекта sizes */

console.log(getSquare.call(sizes));