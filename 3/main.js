/*
1 яблоко form1 2 яблока form2 3 яблока form2 4 яблока form2 5 яблок form3 6 яблок form3 7 яблок form3 8 яблок form3 9 яблок form3 10 
яблок form3 xxxx11-19 яблок form3 xxxx20 яблок xxxx21 яблоко xxxx22 яблока xxxx23 яблока xxxx24 яблока xxxx25 яблок xxxx26 
яблок xxxx27 яблок xxxx28 яблок xxxx29 яблок xxxx30 яблок
*/
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
  const logBox = (apples) => {
    console.log("В ящике " + apples + " яблок");
  
    if (apples > 0) {
      console.log("Полная");
    } else if (apples === 0) { 
      console.log("Пустая");
    } else {
      console.log("Кредитная коробка");
    }
  }
  
  const printWeHaveSomething = (f) => (n) => {
    console.log("Мы получили " + f(n) + "!");
    logBox(apples);
  }
  
  
  const printApples = printWeHaveSomething(nNoun("яблоко", "яблока", "яблок"));
  
  let apples = 0;
  printApples(apples);
  
  apples += 1;
  printApples(apples);
  
  apples += 10;
  printApples(apples);
  
  apples += 2;
  printApples(apples);
  
  apples += 4;
  printApples(apples);
  
  apples += 110;
  printApples(apples);
  
  apples += 17;
  printApples(apples);
  
  apples += 12;
  printApples(apples);
    