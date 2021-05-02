/*
 * Есть активная игра
 * Есть предыдущая игра
 * 0 0 - Нет таймера, нет паузы, есть кнопка начать
 * 0 1 - Таймер предыдущей игры, нет паузы, есть кнопка начать
 * 1 _ - Таймер текущей игры, есть паузаб , нет кнопки начать (прервать текущую )
 * 
 */

const hasActiveGame = false;
const hasPerviousGame = false;

const createUi = () => {
  const home = document.getElementById("home");
  //home.append()
  //const list = document.getElementById
  const gameContainer = document.getElementById("game");
  const buttonStart = document.getElementById("button-start");
  
  const gameTimer = document.getElementById("game-timer");

  const gameState = document.getElementById("game-state");
  const buttonPause = document.getElementById("button-pause");

  const menu = document.getElementById("menu");
  
  const selectFirstElement = document.querySelector('.home__list-1');
  const selectSecondElement = document.querySelector('.home__list-2');

  selectFirstElement.classList.remove("home__list-hidden");
  selectSecondElement.classList.remove("home__list-hidden");

  selectFirstElement.addEventListener('change', (event) => {
      console.log(event.target.value)
      let i = 0;
      N = i + event.target.value

    selectSecondElement.addEventListener('change', (event) => {
        console.log(event.target.value)
        let i = 0;
        M = i + event.target.value
      buttonStart.addEventListener("click", () => {
        buttonStart.classList.add("button-start_hidden");
        home.classList.add("home_hidden");

        gameState.classList.remove("game-state_hidden");
        buttonPause.classList.remove("button-pause_hidden");
    
        const game = createGame(gameContainer, gameTimer, (time) => {
        home.classList.remove("home_hidden");
          buttonPause.classList.add("button-pause_hidden");
          buttonStart.classList.remove("button-start_hidden");

          buttonPause.removeEventListener("click", togglePause);

          console.log("Game over", time);
        });

      const togglePause = () => {
        const isRunning = game.togglePause();
        // const isRunning = game.togglePause();

        console.log(isRunning);

        if (isRunning) {
          home.classList.add("home_hidden");
          selectFirstElement.classList.remove("home__list-hidden");
          selectSecondElement.classList.remove("home__list-hidden");
          menu.classList.add("menu__hidden");
        } else {
          home.classList.remove("home_hidden");
          selectFirstElement.classList.add("home__list-hidden");
          selectSecondElement.classList.add("home__list-hidden");
          menu.classList.remove("menu__hidden");
        }
      };

      buttonPause.addEventListener("click", togglePause);

      game.start();
  
      });
  
    });
  });
}