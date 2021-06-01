window.addEventListener("load", () => {
    const slider = Slider.fromData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], createSlide);
  
  
    const sliderContainer = document.body.querySelector(".slider");
    slider.appendTo(sliderContainer);
  
    document.querySelector(".button_left").addEventListener("click", () => {
      slider.prevSlide();
    });
    
  
    document.querySelector(".button_right").addEventListener("click", () => {

      slider.nextSlide();

    });
  
    let isSpacePressed = false;
    let delayedLeftPress = null;
    let delayedRightPress = null;
  
    let isIndexStarted = false;
    let indexBuffer = "";

    
    sliderContainer.addEventListener("keyup", (event) => {
  
      switch (event.code) {
        case "ArrowLeft": {
  
          if (event.ctrlKey || isSpacePressed) {
            slider.firstSlide()
          } else if (delayedLeftPress === null) {
            delayedLeftPress = setTimeout(() => {
              slider.prevSlide();
              delayedLeftPress = null;
            }, 200);
          } else {
            clearTimeout(delayedLeftPress);
            delayedLeftPress = null;
            slider.firstSlide();
          }
  
        } break;
  
        case "ArrowRight": {
          
          if (event.ctrlKey || isSpacePressed) {
            slider.lastSlide()
          } else if (delayedRightPress === null) {
            delayedRightPress = setTimeout(() => {
              slider.nextSlide();
              delayedRightPress = null;
            }, 200);
          } else {
            clearTimeout(delayedRightPress);
            delayedRightPress = null;
            slider.lastSlide();
          }
  
          event.preventDefault();
        } break;
        
        case "Space": {
          isSpacePressed = false;
          event.preventDefault();
        } break;
  
  
        case "AltRight":
        case "AltLeft": {
          isIndexStarted = false;
  
          if (indexBuffer) {
            slider.goToSlide(Number(indexBuffer) - 1);
          }
  
          indexBuffer = "";
        } break;
      }
  
      if (event.key >= 0 && event.key <= 9) {
        console.log(event.key);
        indexBuffer += event.key;
      }
  
  
    });
  
  
    sliderContainer.addEventListener("keydown", (event) => {
  
      switch (event.code) {
        case "Space": {
          isSpacePressed = true;
          event.preventDefault();
        } break;
  
        case "AltRight":
        case "AltLeft": {
          isIndexStarted = true;
        } break;
      }
  
    });
  
    slider.goToSlide(2);
  

    let posInit = 0;
    let posX1 = 0;
    let posX2 = 0;
    let posFinal = 0;
    let posThreshold = 50;



  
const startSlide = (event) => {

  posInit = posX1 = event.clientX;

  console.log(posInit);

  
  sliderContainer.addEventListener('mousemove', swipeAction);
  sliderContainer.addEventListener('mouseup', swipeEnd);

}

const swipeAction = (event) => {

  posX2 = posX1 - event.clientX;
  posX1 = event.clientX;

}
swipeEnd = () => {

  posFinal = posInit - posX1;

  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('mouseup', swipeEnd);

  if (Math.abs(posFinal) > posThreshold) {
    if (posInit < posX1) {
      slider.prevSlide();
    } else if (posInit > posX1) {
      slider.nextSlide();
    }
  }
};

  
sliderContainer.addEventListener("mousedown", startSlide);
});
  
  const images = [
    "images/img1.jpg"
  ];
  
  const createSlide = (index) => {
    return $("div", { 
        className: "slide__content", 
        style: {
          width: randomInt(150, 350) + "px",
          height: randomInt(100, 250) + "px",
        }
      }, 
      index
    );
  }
