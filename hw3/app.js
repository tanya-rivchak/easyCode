/* 1. На основе массива **map** и массива **users** собрать новый массив объектов где в каждом объекте будут только те свойства которые перечислены в массиве **map** */
const map = ["_id", "name", "isActive", "balance"];
const users = [
    {
    "_id": "5d220b10e8265cc978e2586b",
    "isActive": true,
    "balance": 2853.33,
    "age": 20,
    "name": "Buckner Osborne",
    "gender": "male",
    "company": "EMPIRICA",
    "email": "bucknerosborne@empirica.com",
    "phone": "+1 (850) 411-2997",
    "registered": "2018-08-13T04:28:45 -03:00"
    },
    {
    "_id": "5d220b10144ef972f6c2b332",
    "isActive": true,
    "balance": 1464.63,
    "age": 38,
    "name": "Rosalie Smith",
    "gender": "female",
    "company": "KATAKANA",
    "email": "rosaliesmith@katakana.com",
    "phone": "+1 (943) 463-2496",
    "registered": "2016-12-09T05:15:34 -02:00"
    },
    {
    "_id": "5d220b1083a0494655cdecf6",
    "isActive": false,
    "balance": 2823.39,
    "age": 40,
    "name": "Estrada Davenport",
    "gender": "male",
    "company": "EBIDCO",
    "email": "estradadavenport@ebidco.com",
    "phone": "+1 (890) 461-2088",
    "registered": "2016-03-04T03:36:38 -02:00"
    }
];
/* На выходе мы должны получить массив вида: [ { _id: ..., name: ..., isActive: ..., balance: ... }, ... ]; */
const res = [];

users.map(el => {
    const obj = {};
    map.map(i => {
        obj[i] = el[i];
    })
    res.push(obj);
});

console.table(res);

/* 2. Дан массив объектов, где каждый объект содержит информацию о букве и месте её положения в строке {буква: “a”, позиция_в_предложении: 1}: */
const array = [{char:"a",index:12}, {char:"w",index:8}, {char:"Y",index:10}, {char:"p",index:3}, {char:"p",index:2},
{char:"N",index:6}, {char:" ",index:5}, {char:"y",index:4}, {char:"r",index:13}, {char:"H",index:0},
{char:"e",index:11}, {char:"a",index:1}, {char:" ",index:9}, {char:"!",index:14}, {char:"e",index:7}];
/* Напишите функцию, которая из элементов массива соберет и вернёт строку, основываясь на index каждой буквы. Например: */
// [{char:"H",index:0}, {char:"i",index: 1}, {char:"!",index:2}] → "Hi!"
function createString(arr){
    let res = '';

    arr.sort((prev, next) => prev.index - next.index)
        .map(el => res += el.char);

    return res;
}

let str = createString(array);
console.log(str);

/* 3. Организовать функцию getInfo, которая принимает объект вида{ name: ..., info: { employees: [...], partners: [ … ] } }и выводит в консоль имя (если имени нет, показывать ‘Unknown’) и первые две компании из массива partners: */
const organisation = { 
    name: 'Google', 
    info: { 
      employees: ['Vlad', 'Olga'], 
      partners: ['Microsoft', 'Facebook', 'Xing'] 
  } };
// getInfo(organisation); → Name: Google Partners: Microsoft Facebook
getInfo(organisation);

function getInfo(company){
    // const {name = 'Unknown', info: {partners}} = company;
    // console.log(`Name: ${name} Partners: ${partners.slice(0,2)}`);
    //или
    const {name = 'Unknown', info: {partners: [p1,p2] }} = company;
    console.log(`Name: ${name} Partners: ${p1}, ${p2}`);
}

/* 4. Дан объект:
 */
let date = new Date;
const person = {
    name: 'Denis',
    age: 30,
    lastGet: '',
    lastUpdate: ''
};

/* Сделать так что-бы при получении или изменении свойства **name** в свойствах **lastGet** и **lastUpdate** сохранялась дата последнего получения или последнего обновления соответсвенно. */
person.getName = function getName(){
    this.lastGet = date.toUTCString();
    return this.name;
};
person.updateName = function updateName(val){
    this.lastUpdate = date.toUTCString();
    return this.name = val;
};

person.getName();
person.updateName('Artur');

console.table(person);

/* 5. Дан объект: */
const product = {
    brand: 'Apple',
    model: 'iPhone 7',
    price: '$300'
};
/* сделать геттер который будет возвращать brand и model в виде строки "Apple iPhone 7" а также сделать сеттер в который будет передаваться строка например "Samsung S8 Gold" и в объекте в поле brand будет записано "Samsung" а в поле model будет записано "S8 Gold"  */

Object.defineProperty(product, 'name', {
    get: function(){
        return `${this.brand} ${this.model}`;
    },
    set: function(str){
        // str = str.split(' ');
        // this.brand = str.splice(0,1).toString();
        // this.model = str.join(' ');
        //или
        const [newBrand, ...newModel] = str.split(' ');
        this.brand = newBrand;
        this.model = newModel.join(' ');
    }
})
console.log(product.name);
product.name = "Samsung S8 Gold";
console.table(product);
console.log(product.name);