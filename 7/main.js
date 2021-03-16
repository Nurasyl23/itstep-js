const randomInt = (min, max) => 
  min + Math.floor(Math.random() * (max - min));

const createRandomArray = (min, max, length) => {
  let arr = [];
  for (let i = 0; i < length; i++){
    arr.push(randomInt(min, max));
  }
  return arr;
}

let amounts = createRandomArray(-10, 20, 30);


let filterPositive = amounts.filter(function (item){
  return item >= 0;
});

let filterNegative = amounts.filter(function (item){
  return item < 0;
});


let filterOnlyPositive = amounts.reduce(function(sum, elem) {
	if (elem >= 0) {
		return sum + elem;
	} else {
		return sum;
	}
});

let filterOnlyNegative = amounts.reduce(function(sum, elem) {
	if (elem < 0) {
		return sum + elem;
	} else {
		return sum;
	}
}, 0);


const getAverageGains = filterOnlyPositive / filterPositive.length;

const getAverageLoses = filterOnlyNegative / filterNegative.length;


const allRight = amounts.every(isPositive);

function isPositive(item) {
  return item > 0;
}

let incomeArray = amounts.map(function(item) {
  if (item >= 0) {
    return "Доход: " + item
  } else if(item < 0){
    return "Расход: " + item
  }
});


const nNoun = (form1, form2, form3) => {
  // n + " " + (n === 1 ? singular : plural);
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
  
  console.log("----------");
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
const logStatistics = transactions => {
  console.log("Суммарный доход: " + filterOnlyPositive);
  console.log("Суммарный расход: " + filterOnlyNegative);

  console.log("Средний доход: " + getAverageGains);
  console.log("Средний расход: " + getAverageLoses);

  console.log("все транзакции были положительные: " + allRight);
  console.log("все транзакции" + incomeArray )
}
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
logStatistics(transactions);
