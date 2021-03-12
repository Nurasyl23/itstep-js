const randomInt = (min, max) => 
  min + Math.floor(Math.random() * (max - min));

const createRandomArray = (min, max, length) => {
  let arr = [];
  for (let i = 0; i < length; i++){
    arr.push(randomInt(min, max));
  }
  return arr;
}

const nNoun = (form1, form2, form3) => {
    return (n) => {
      let word;
  
      if (n % 10 === 1 && n % 100 !== 11) {
        word = form1;
      } else if (n % 10 === 2 && n % 100 !== 12) {
        word = form2;
      } else if (n % 10 === 3 && n % 100 !== 13) {
        word = form2;
      } else if (n % 10 === 4 && n % 100 !== 14) {
        word = form2;
      } else if (n % 10 === 5) {
        word = form3;
      } else if (n % 10 === 6) {
        word = form3;
      } else if (n % 10 === 7) {
        word = form3;
      } else if (n % 10 === 8) {
        word = form3;
      } else if (n % 10 === 9) {
        word = form3;
      } else if (n % 10 === 0) {
        word = form3;
      } else if (n % 100 === 11) {
        word = form3;
      } else if (n % 100 === 12) {
        word = form3;
      } else if (n % 100 === 13) {
        word = form3;
      } else if (n % 100 === 14) {
        word = form3;
      }
  
      return n + " " + word;
    }
  }

const nApples = nNoun("яблоко", "яблока", "яблок");

const logBoxState = box => {
    console.log("В ящике " + nApples(box));
  
    if (box > 0) {
      console.log("Полная коробка");
    } else if (box === 0) {
      console.log("Пустая коробка");
    } else { // box < 0
      console.log("Кредитная коробка");
    }
  }


const logTransaction = amount => {
    console.log("-----------")
    if (amount >= 0) {
      console.log("Получили " + nApples(amount));
    } else {
      console.log("Потеряли " + nApples(Math.abs(amount)));
    }
  }

const logResult = (box, goal) => {
    console.log("----------");
    if (box >= goal) {
      console.log("Ура мы накопили " + nApples(box) + "!");
    } else {
      console.log("Не повезло, не фартануло. Мы накопили только " + nApples(box) + " =(");
    }
  }

let amounts = createRandomArray(-10, 20, 30);
  
let goal = 100;
  
let box = 0;
logBoxState(box);

let transactions = [];
while (box < goal && amounts.length > 0) {
  let amount = amounts.shift();
  box += amount;

  transactions.push(amount);
  logTransaction(amount);
  logBoxState(box);
}

logResult(box, goal);