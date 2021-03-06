// Переменные как переменные 
// Функции - процедуры
// Объекты - данные (POJO), Модули - набор функционала (префикс), 

// username - обязательное, не меньше 5 символов
// passwrods - обязательное, не меньше 8 символов, (содержит символ !) (содержит большую букву и цифру)
// age - число, целое, (0, 150)


// В процедурной версии добавить проверку поле рост
// необязателньое
// целое число
// от 0 до 300


let validForm = {
  username: "anton",
  password: "anton!anton",
  age: "20",
  height: "160",
};

let invalidForm = {
  username: "anto",
  password: "anto",
  age: "20a",
  height: "160d",
};

// const maxUsernameLength = 5;

const handleSubmit = (form) => {
  // const username = form.username;
  // ..
  const { username, password, age, height } = form;

  let isValid = true;
  let errors = { };

  if (username.length < 5) {
    errors["username"] = "Логин должен быть не меньше 5 символов";
    isValid = false;
  }
  
  if (password.length < 10) {
    errors["password"] = "Пароль должен быть не меньше 8 символов";
    isValid = false;
  }

  if (password.indexOf("!") < 0) {
    errors["password"] = "Пароль должен содержать '!'";
    isValid = false;
  }

  if (height == Number) {
    errors["height"] = "Рост измеряется числом";
    isValid = false;
  }
  let heightNumber = parseInt(height); 

  let ageNumber = parseInt(age);
  // "20" !== "20.1"

  if (isNaN(ageNumber) || age !== String(ageNumber)) {
    errors["age"] = "Возраст должен быть числом";
    isValid = false;
  }

  if (age < 0 || age > 150) {
    errors["age"] = "Возраст должен быть в промежутке от 0 до 150 лет";
    isValid = false;
  }

  if (isNaN(heightNumber) || age !== String(heightNumber)) {
    errors["height"] = "Рост измеряется числом";
    isValid = false;
  }

  if (height < 0 || height > 300) {
    errors["height"] = "Рост должен быть в промежутке от 0 до 300";
    isValid = false;
  }

  if (isValid) {
    // отправить форму 
    const user = {
      username,
      password,
      age,
      height,
      dateOfRegistration: new Date(),
    };

    console.log("Создаем пользователя", user);
  } else {
    // отображаем ошибки в форме
    console.log("Форма заполнена с ошибками", errors, form);
  }
}

/// 

handleSubmit(validForm);
console.log("-----");
handleSubmit(invalidForm);