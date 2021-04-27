// Организовать вывод яблочных транзакций в тело документа div ul > li
//
// Оформить по желанию
//
// Используем события которые мы добавили в коробку amountChanged
// C яблоками Добавить кнопку / див, по нажатию добавлять случайную транзакцию т.е. полностью избавляемся от генерации предварительного массива и while цикла.
// когда набрали goal (целевое количество)

// убираем кнопку со страницы
// выводим статистику.
/**
 * 
 * @param {*} tag 
 * @param {*} attributes 
 * @param  {...any} children 
 * @returns {HTMLElement}
 */
 const e = (tag, attributes = {}, ...children) => {
    const element = document.createElement(tag);
  
    Object.entries(attributes)
      .forEach(([key, value]) => {
        if (key === "style") {
          Object.entries(value).forEach(([cssKey, cssValue]) => {
            element.style[cssKey] = cssValue;
          });
        } else if (key.startsWith("on")) { // Строка начинается с "on" 
            element.addEventListener(key.slice(2), value);
        } else {
          element[key] = value;
        }
  
      });
  
    element.append(...children);
  
    return element;
  }
  
window.addEventListener("load", () => {
    
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

    const button = e("button", {
        id: "button",
        className: "button",
    });

    let transactions = [];
    button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(event);
        /*
        a.classList.toggle("link_red");
        a.classList.toggle("link_green");
        */
        if (box.amount < goal && amounts.length > 0) {
            let amount = amounts.shift();
            //transactions.push(amount);
            box.changeAmount(amount);
            document.body.append(list);
        }
        if (box.amount < goal && amounts.length > 0) {
            document.body.append(block)
        }
        //const result = document.body.append(block)
        
    });
    //if (box.amount < goal && amounts.length > 0) {
        //document.body.append(block)
    //}
    document.body.append(button)

    const list = e("div", {
        id: "list",
        className: "list",
    });

    const block = e("div", {
        id: "block",
        className: "block",
    });

    const log = {
  
        result: (box, goal) => {

            if (box.amount >= goal) {
                block.append(e("div", {
                    id: "win",
                    className: "allcollected green",
                }, "Ура мы накопили " + box.amount + "!"));
            } else {
                block.append(e("div", {
                    id: "lose",
                    className: "allcollected red",
                }, "Не повезло, не фартануло. Мы накопили только " + box.amount + " =("));
            }
        },
  
        statistics: transactions => {

            let gains = analitics.getPositives(transactions);
            let loses = analitics.getNegatives(transactions);

            block.append(e("div", {
                id: "total-income",
                className: "allcollected green",
            }, "Суммарный доход: " + analitics.getSum(gains)));


            block.append(e("div", {
                id: "total-consumption",
                className: "allcollected red",
            }, "Суммарный расход: " + analitics.getSum(loses)));
    

            block.append(e("div", {
                id: "average-income",
                className: "allcollected green",
            }, "Средний доход: " + analitics.getAverage(gains)));

            block.append(e("div", {
                id: "average-consumption",
                className: "allcollected red",
            }, "Средний расход: " + analitics.getAverage(loses)));
    
            if (analitics.areAllPositive(transactions)) {
                block.append(e("div", {
                    id: "all-positive",
                    className: "allcollected green",
                }, "Все транзакции были положительными!"));
            }
        },
    }

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

    let amounts = createRandomArray(-10, 20) (30);
  
    let goal = 100;
  
    let box = new Box();
    /*
    box.addEventListener("amountChanged", (_, transaction) => {
        transactions.push(transaction)
    });
*/
    box.addEventListener("amountChanged", (_, transaction) => {
        transactions.push(transaction)
    });
    box.addEventListener("amountChanged", (amount, transaction) => {
    
        list.append(e("div", {
            id: "transaction",
            className: "row transaction",
        }, "Новая транзакция: " + transaction));
    
        list.append(e("div", {
            id: "amount",
            className: "row transaction"
        }, "Новая состояние коробки: " + amount));
    
    });
    
    box.addEventListener("amountChanged", (amount) => {
    
        if (amount > 0) {
            list.append(e("div", {
                id: "box-full",
                className: "row green",
            }, "Полная коробка"));
          } else if (amount === 0) {
            list.append(e("div", {
                id: "box-empty",
                className: "row red",
            }, "Пустая коробка"));
          } else { // box < 0
            list.append(e("div", {
                id: "box-credit",
                className: "row red",
            }, "Кредитная коробка"));
          }
    });

    console.log(transactions)
    log.result(box, goal);
    log.statistics(transactions);

});


