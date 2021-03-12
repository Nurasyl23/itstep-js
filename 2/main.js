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
const changeBox = (apples, pieces) => {
    return apples + pieces;
} 


let apples = 0; 

logBox(apples);

apples = changeBox(apples, 10);
logBox(apples);

apples = changeBox(apples, -10);
logBox(apples);

apples = changeBox(apples, -15);
logBox(apples); 