// Разобрватсья с clientWidth и offsetWidth
// Разобраться с .getBoundingClientRect(); https://developer.mozilla.org/ru/docs/Web/API/Element/getBoundingClientRect
// Починить правильный расчет координатов смещения блока внутри контейнера до текущего слайда

window.addEventListener("load", () => {
    const slider = Slider.fromData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], createSlide);
    
    // const slider2 = Slider.fromData([9, 8, 7, 6, 5 , 4, 3, 2, 1], createSlide);
  
  
    const sliderContainer = document.body.querySelector(".slider");
    slider.appendTo(sliderContainer);
    // slider2.appendTo(document.body.querySelector(".slider"));
  
    document.querySelector(".button_left").addEventListener("click", () => {
      slider.prevSlide();
      // slider2.prevSlide();
    });
    // document.querySelector(".button_left").addEventListener("mouseenter", () => {
    //   slider.play(-2);
    //   // slider2.nextSlide();
    // });
  
    // document.querySelector(".button_left").addEventListener("mouseleave", () => {
    //   slider.stop();
    //   // slider2.nextSlide();
    // });
  
    document.querySelector(".button_right").addEventListener("click", () => {
      slider.nextSlide();
      // slider2.nextSlide();
    });
    // document.querySelector(".button_right").addEventListener("mouseenter", () => {
    //   slider.play();
    //   // slider2.nextSlide();
    // });
  
    // document.querySelector(".button_right").addEventListener("mouseleave", () => {
    //   slider.stop();
    //   // slider2.nextSlide();
    // });
  
  
    let isSpacePressed = false;
    let delayedLeftPress = null;
    let delayedRightPress = null;
  
    let isIndexStarted = false;
    let indexBuffer = "";
  
    // let delayedClick = null;
  
  
    // Клавиша отпущенаp
    sliderContainer.addEventListener("keyup", (event) => {
      // console.log("keyup", event);
  
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
          // event.preventDefault();
        } break;
      }
  
      // console.log(event.code);
      if (event.key >= 0 && event.key <= 9) {
        console.log(event.key);
        indexBuffer += event.key;
      }
  
  
    });
  
  
    sliderContainer.addEventListener("keydown", (event) => {
      // console.log("keyup", event);
  
      switch (event.code) {
        case "Space": {
          isSpacePressed = true;
          event.preventDefault();
        } break;
  
        case "AltRight":
        case "AltLeft": {
          isIndexStarted = true;
          // event.preventDefault();
        } break;
      }
  
    });
  
  
    slider.goToSlide(2);
  });
  
  
  // const images = [
  //   "images/img1.jpg"
  // ];
  
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