const log = {
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
      
        console.log("Суммарный доход: " + getSum(gains));
        console.log("Суммарный расход: " + getSum(loses));
      
        console.log("Средний доход: " + getAverage(gains));
        console.log("Средний расход: " + getAverage(loses));
      },
}
const analitics = {
    randomInt: (min, max) => 
        min + Math.floor(Math.random() * (max - min)),

    createRandomArray: (min, max, length) => {
        let arr = [];
        for (let i = 0; i < length; i++){
            arr.push(randomInt(min, max));
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
    getAverage: numbers => getSum(numbers) / numbers.length,
}
console.log(Object.entries(log))