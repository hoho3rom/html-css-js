
class Serializable {
    serialize() {
        if (this === null || typeof this !== 'object') {
            throw TypeError(`only objects can be serialized, not ${typeof this}`)
        }
        return this.constructor.name + ":" + JSON.stringify(this)
    }

    dateTimeReviver = function (key, value) {
        var a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(value);
            if (a) {
                return new Date(+a[1]);
            }
        }
        return value;
    }

    wakeFrom(str) {
        let name = str.split(":")[0];
        if(name != this.constructor.name) {
            throw TypeError(`Misentity awakening: to: ${this.constructor.name}, from: ${name}`)
        }

        let obj = JSON.parse(str.replace(name + ":", ""), this.dateTimeReviver)
        obj.__proto__ = this.__proto__
        return obj
    }
}

class Cat extends Serializable {
    constructor(color, name) {
        super()
        this.color = color;
        this.name = name;
    }
    print() {
        return `Pretty ${this.color} catty ${this.name}!`
    }
}

class Dog extends Serializable {
    constructor(birthday, name) {
        super()
        this.birthday = birthday;
        this.name = name;
    }
    print() {
        return `${this.name} was born ${this.birthday}`
    }
}

let bella = new Cat('white', 'Bella')
let woovy = new Dog(new Date(), 'Woovy')

const strCat = bella.serialize();
const strDog = woovy.serialize();

bella = null;
woovy = null;

let zombieBella = (new Cat()).wakeFrom(strCat);
let angelWoovy = (new Dog()).wakeFrom(strDog)

console.log(zombieBella instanceof Cat); // true
console.log(zombieBella.print()); // `Pretty white catty Bella!`

console.log(angelWoovy instanceof Dog); // true
console.log(angelWoovy.print()); // `Woovy was born ${this.birthday}`

class UserDTO extends Serializable {
    constructor({ firstName, lastName, phone, birth } = {}) {
      super();
  
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
      this.birth = birth;
    }
  
    printInfo() {
      console.log(`${this.firstName[0]}. ${this.lastName} - ${this.phone}, ${this.birth.toISOString()}`);
    }
  }
  
  let tolik = new UserDTO({
    firstName: 'Anatoliy',
    lastName: 'Nashovich',
    phone: '2020327',
    birth: new Date('1999-01-02'),
  });
  
  tolik.printInfo(); //A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z
  
  const serialized = tolik.serialize();
  tolik = null
  
  const resurrectedTolik = (new UserDTO()).wakeFrom(serialized);
  
  console.log(resurrectedTolik instanceof UserDTO); // true
  console.log(resurrectedTolik.printInfo()); // A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z
  
  class Post extends Serializable {
    constructor({ content, date, author } = {}) {
      super()
  
      this.content = content;
      this.date = date;
      this.author = author;
    }
  }
  
  console.log((new Post()).wakeFrom(serialized));
//   throw an error because the srialized line does contain data for User class