// Перевести все логирование внутри while на систему событий - подписчиков
// Добавить подписчика, который будет накапливать массив транзакций, который дальше передастся в log.statistics(transactions);
/*
C яблоками + файл events.js с занятия:
Перевести все логирование внутри while на систему событий - подписчиков
Добавить подписчика, который будет накапливать массив транзакций, который дальше передастся в log.statistics(transactions);
*/
const randomInt = (min, max) => 
  min + Math.floor(Math.random() * (max - min));

const createArray = (mapFunction = index => index) => length => 
  Array.from({ length }, (_, index) => mapFunction(index));

const createRandomArray = (min, max) => 
  createArray(() => randomInt(min, max));

const analitics = {

  getPositives: numbers => numbers.filter(n => n > 0),
  getNegatives: numbers => numbers.filter(n => n < 0),
  
  getSum: numbers => 
    numbers.reduce((sum, number) => sum + number, 0),

  getAverage: numbers => analitics.getSum(numbers) / numbers.length,

  areAllPositive: numbers => numbers.every(n => n > 0),

  getAllDivisible: (divisor, numbers) => numbers.filter(n => n % divisor === 0) 
};

// ---

const log = {
  boxState: box => {
    console.log("В ящике " + box.amount);
  
    if (box.amount > 0) {
      console.log("Полная коробка");
    } else if (box.amount === 0) {
      console.log("Пустая коробка");
    } else { // box < 0
      console.log("Кредитная коробка");
    }
  },

  transaction: (box, amount) => {
  
    console.log("----------");
    if (amount >= 0) {
      console.log("Получили " + amount);
    } else {
      console.log("Потеряли " + Math.abs(amount));
    }
  },

  result: (box, goal) => {
    
    console.log("----------");
    if (box.amount >= goal) {
      console.log("Ура мы накопили " + box.amount + "!");
    } else {
      console.log("Не повезло, не фартануло. Мы накопили только " + box.amount + " =(");
    }
  },

  statistics: transactions => {
    let gains = analitics.getPositives(transactions);
    let loses = analitics.getNegatives(transactions);
  
    console.log("Суммарный доход: " + analitics.getSum(gains));
    console.log("Суммарный расход: " + analitics.getSum(loses));
  
    console.log("Средний доход: " + analitics.getAverage(gains));
    console.log("Средний расход: " + analitics.getAverage(loses));
  
    if (analitics.areAllPositive(transactions)) {
      console.log("Все транзакции были положительными!");
    }
  
    console.log(transactions.map(transaction => transaction >= 0 ? "Доход" : "Расход"));
  
    console.log("Круглые транзакции", analitics.getAllDivisible(5, transactions));
  },
}


//-----
class Box {
  amount;

  listeners = {
    "amountChanged": [], // (amount, transaction, box) => void;
  };

  constructor(amount = 0) {
    this.amount = amount;
  }
  
  addEventListener(eventName, handler) {
    this.listeners[eventName].push(handler);
  }

  changeAmount(transaction) {
    this.amount += transaction;
    
    // Оповещаем подписчиков, сообщаем транзакцию и новое состояник коробки, и коробку
    this.listeners["amountChanged"]
      .forEach(handler => handler(this.amount, transaction, this));
  }
}

// ---- 
let amounts = createRandomArray(-10, 20) (30);

let goal = 100;

let box = new Box();

box.addEventListener("amountChanged", (_, transaction) => {
  console.log("----------");
    if (transaction >= 0) {
      console.log("Получили " + transaction);
    } else {
      console.log("Потеряли " + transaction);
    }
});

box.addEventListener("amountChanged", (_, transaction) => {
  console.log("Новая транзакция: ", transaction);
});

box.addEventListener("amountChanged", (amount) => {
  console.log("Новая состояние коробки: ", amount);
});

box.addEventListener("amountChanged", (amount) => {
  console.log("В ящике " + amount);
  
  if (amount > 0) {
    console.log("Полная коробка");
  } else if (amount === 0) {
    console.log("Пустая коробка");
  } else { // box < 0
    console.log("Кредитная коробка");
  }
});

box.addEventListener("amountChanged", (_, transaction) => {
  transactions.push(transaction)
});

//console.log(box);
// log.boxState(box);

let transactions = [];

while (box.amount < goal && amounts.length > 0) {
  let amount = amounts.shift();
  box.changeAmount(amount);
  
  //transactions.push(amount);
  
  //log.transaction(amount);
  //log.boxState(box);
}

log.result(box, goal);
log.statistics(transactions);