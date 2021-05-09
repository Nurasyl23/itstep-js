// возможноть прервать/покинуть/прекратить игру (полностью)
//
// Добавить счетчик открытий и использовать его как финальный счет/результат
//
// Выводить в карточки не цифры а картинки
//
// Добавить список результатов Выводить время, количество ходов и (Дату и время игры)
//
// ** В настройки добавить возможность выбирать "скин" игры.
//
// цвет, внешний вид карточки
// анимация открытия закрытия
// специально отображение отгаданных карточек.
//
//--------------------------------------------------------------------------------------
// *** Провести рефакторинг функции createGame
//
// либо переделать все внутренние функци в чистые и вынести обратно наружу
//
// либо переделать в класс Game в котором все состояние будет храниться и обрабатываться
// 
// Придумать как обновлять таймер на странице не в нутри game а внутри ui
// --------------------------------------------------------------------------------------

console.log(document);
const generateValues = (n, m) =>
  createArray(index => [Math.floor(index / 2), Math.random()]) (n * m)
  .sort((a, b) => a[1] - b[1])
  .map(a => a[0]);

const generateState = (n, m) => createArray(() => false) (n * m);

const generateTimersList = (n, m) => createArray(() => null) (n * m);

const width = 150;
const height = 200;

//const N;
//const M;

const createGame = (gameDiv, timerDiv, gameOverCallback) => {
    
  const values = generateValues(N, M);
  const state =  generateState(N, M);
  const timers = generateTimersList(N, M);

  let gameTimer = null;
  let startTime = 0;
  let pauseTime = 0;
  let endTime = 0;

  let isRunning = false;

  //console.log(values);


  const createCard = (index, value) => {
    const div = $("div", { 
      className: "card card_closed",
      dataset: {
        index: index,
      },
      onclick:  handleClick, // addEventListener("click", () => ...)
    }, 
      $("div", { className: "card__face card__front"}, value),
      $("div", { className: "card__face card__back"}),
    );

    return div;
  }
  
  let pair = []; // 0-2 элементов

  const openCard = (cardDiv) => {
    cardDiv.classList.add("card_open");
    cardDiv.classList.remove("card_closed");
    pair.push(cardDiv);
  }

  const closeCard = (cardDiv) => {
    cardDiv.classList.add("card_closed");
    cardDiv.classList.remove("card_open");
  }

  const extractCardIndex = (cardDiv) => parseInt(cardDiv.dataset.index);

  const handleClick = (event) => {
    if (!isRunning) {
      return;
    }

    const cardDiv = event.currentTarget;
    const cardIndex = extractCardIndex(cardDiv);

    if (timers[cardIndex] !== null) {
      clearTimeout(timers[cardIndex]);
      timers[cardIndex] = null;
    }

    if (state[cardIndex]) {
      return;
    }

    const isOpen = pair.includes(cardDiv); // cardDiv.classList.contains("card_open"); 

    if (!isOpen) {
      openCard(cardDiv)
    }
    
    if (pair.length === 2) {
      const indexes = pair.map(extractCardIndex);
      const [value1, value2] = indexes.map(index => values[index]);

      //console.log(value1, value2, value1 === value2);

      if (value1 === value2) {
        indexes.forEach(index => state[index] = true);
        if (state.every(flag => flag)) {
          endTime = Date.now();
          //console.log("YOU WIN", endTime);
        
          clearInterval(gameTimer);
          gameTimer = null;

          gridDiv.remove(); // Удаляем элемент со страницы
          // gridDiv.parentElement.removeChild(gridDiv); // removeChild - удалем у родителя переданный элемент
          isRunning = false;
          gameOverCallback(endTime - startTime);
        }
      
        pair = [];
      } else {

        pair.forEach(cardDiv => {
          const index =  extractCardIndex(cardDiv);
          
          timers[index] = setTimeout(() => {
            closeCard(cardDiv);
            timers[index] = null;
          }, 700);
        });

        pair = [];
      }

    }
    //console.log("after", pair, timers);
  }

  
  const gridDiv = $("div", { 
      className: "grid",
      style: {
        gridTemplateRows: "repeat(" + M + ", " + height + "px)", // repeat(4, 200px)
        gridTemplateColumns: "repeat(" + N + ", " + width + "px)",
      } 
    }, 
    ...createArray(index => createCard(index, String(values[index])))(N * M)
  );
  gameDiv.append(gridDiv);


  const togglePause = () => {
    if (isRunning) {
      pauseTime = Date.now();
      isRunning = false;
      // показать home-screen
    } else {
      startTime += Date.now() - pauseTime;
      pauseTime = 0;
      isRunning = true;
    }
  };
    


  timerDiv.innerText = "00:00";
  const updateGameTimer = () => {
    if (!isRunning) {
      return;
    }

    const time = Date.now() - startTime;

    const s = Math.round(time / 1000) % 60;
    const m = Math.floor(time / (60 * 1000));

    timerDiv.innerText = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }


  return {
    start: () => {
      isRunning = true;
      startTime = Date.now(); // количество миллисекунд прошедших с 1 января 1970  Эпоха Unix
      gameTimer = setInterval(updateGameTimer, 1000);
    },

    togglePause: () => {
      togglePause();

      return isRunning;
    }
  };
  
};