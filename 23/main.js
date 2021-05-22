// Слайдер
//
// Написать интерсную функцию дл содержимого сладов: картинки, с подписями, кнопки ...
//
// Сделать слайды на всю страницу, как миниму по ширине CSS
//
// Добавить создание кнопок "влево", "вправо" по умполчанию 
//
// 4*. Сделать точечки как в инстаграме
// Написать интерсную функцию дл содержимого сладов: картинки, с подписями, кнопки ...

// Сделать слайды на всю страницу, как миниму по ширине CSS

// Добавить создание кнопок "влево", "вправо" по умполчанию 4*. Сделать точечки как в инстаграме

// Переключение по цифрам а. Зажимаем альт, накапливаем нажатые цифры, отпускаем альт, превращаем цифры в индекс, сдвигаем слайдер б. накапливать нажатия на цифры с максмальным промежутком N (200ms), превращаем цифры в индекс, сдвигаем слайдер

window.addEventListener("load", () => {
  const slider = Slider.fromData([1, 2, 3, 4, 5], createSlide);
  
  const post = document.body.querySelector(".post")

  const sliderContainer = document.body.querySelector(".slider");
  slider.appendTo(sliderContainer);
  // slider2.appendTo(document.body.querySelector(".slider"));

  document.querySelector(".button_left").addEventListener("click", () => {
    slider.prevSlide();
    // slider2.prevSlide();
  });
  document.querySelector(".button_right").addEventListener("click", () => {
    slider.nextSlide();
    // slider2.nextSlide();
  });
  
  post.append(sliderContainer);

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
});

const images = [
   "1.jpg",
   "2.jpg",
   "3.jpeg",
   "4.jpg"
];

const createSlide = (index) => {
  return $("div", { 
      className: "slide__content", 
      style: {
        width: "1400px",
        height: "800px",
      }
    },index, $("img", {
      className: "slide__img",
      style: {
        width: "1400px",
        height: "800px",
      },
    },
    ),
  )
};
console.log(document.getElementsByClassName("slide__img"))
//console.log([document.getElementsByClassName("slide__content")])
//let img = document.getElementsByClassName("slide__img");
/*
console.log(document.getElementsByClassName("slide__img"))
function myFunction() {
  document.getElementsByClassName("slide__img").src = "1.jpg";
}*/
//let img = [document.getElementsByClassName("slide__img")];
//console.log(img)
//img.forEach();
//document.getElementsByClassName("slide__img").setAttribute("src", "1.jpg");
/*
document.getElementsByClassName("slide__img").forEach(function(item, index) {
  console.log(item, index);
});*/
