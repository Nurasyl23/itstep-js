const log = {
  nNoun: (form1, form2, form3) => {
    return (n) => {
  
      let absN = Math.abs(n);
  
      // 123456
      let lastDigt = absN % 10;  // 6
      let secondToLastDigits = Math.trunc(absN / 10) % 10; // 12345 % 10 = 5 
  
      let word;
      if (secondToLastDigits === 1) {
        word = form3;
      } else {
        if (lastDigt === 1) {
          word = form1;
        } else if (2 <= lastDigt && lastDigt <= 4) {
          word = form2;
        } else {
          word = form3;
        }
      }
  
      return n + " " + word;
    }
  },

  logBoxState: box => {
    console.log("В ящике " + nApples(box));

    if (box > 0) {
      console.log("Полная коробка");
    } else if (box === 0) {
      console.log("Пустая коробка");
    } else { // box < 0
      console.log("Кредитная коробка");
    }
  },

  logTransaction: amount => {
  
    console.log("----------");
    if (amount >= 0) {
      console.log("Получили " + nApples(amount));
    } else {
      console.log("Потеряли " + nApples(Math.abs(amount)));
    }
  },

  logResult: (box, goal) => {
    
    console.log("----------");
    if (box >= goal) {
      console.log("Ура мы накопили " + nApples(box) + "!");
    } else {
      console.log("Не повезло, не фартануло. Мы накопили только " + nApples(box) + " =(");
    }
  },

  logStatistics: transactions => {
    let gains = filterOnlyPositive(transactions);
    let loses = filterOnlyNegative(transactions);

    console.log("Суммарный доход: " + analitics.getSum(gains));
    console.log("Суммарный расход: " + analitics.getSum(loses));

    console.log("Средний доход: " + analitics.getAverage(gains));
    console.log("Средний расход: " + analitics.getAverage(loses));
  },
}
const analitics = {
  randomInt: (min, max) => 
    min + Math.floor(Math.random() * (max - min)),


  createRandomArray: (min, max, length) => {
    let arr = [];
    for (let i = 0; i < length; i++){
      arr.push(analitics.randomInt(min, max));
    }
    return arr;
  },

  filter: predicate => array => {
      let filtered = [];

    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        filtered.push(array[i]);
      }
    }

    return filtered;
  },


  getSum: numbers => {
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }

    return sum;
  },

  getAverage: numbers => analitics.getSum(numbers) / numbers.length,
}


let transactions = [];

const filterOnlyNegative = analitics.filter(n => n < 0);
const filterOnlyPositive = analitics.filter(n => n > 0);

const amounts = analitics.createRandomArray(-10, 20, 30);

log.logResult(goal) = 100;

let box = 0;



const nApples = log.nNoun("яблоко", "яблока", "яблок");

while (log.logResult(box) < log.logResult(goal) && amounts.length > 0) {
  let amount = amounts.shift();
  log.logResult(box) += amount;

  log.logStatistics(transactions).push(amount);

  log.logTransaction(amount);
  log.logBoxState(box);
}

log.logBoxState(box);



log.logResult(box, goal);
log.logStatistics(transactions);
