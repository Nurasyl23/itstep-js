/*
В функциональной версии

Добавить недостоющие "кусочки" - проверка что число, проверка что число в промежутке
Собрать проверки всех полей
Добавить проверку поля рост
необязателньое
целое число
от 0 до 300
*/

let validForm = {
  username: "anton",
  password: "antonaca!",
  age: "20",
  height: "100",
};

let invalidForm = {
  username: "anto",
  password: "antoodivp",
  age: "20a",
  height: "500"
};


const createValidationState = (value) => ({
  value, // string - Исходное значение поля
  result: value, // any - Чистое значение поля
  isValid: true, //bolean - Флаг валидности поля
  error: null // string - Ошибка (если есть)
});

const withError = (state, error) => ({
  value: state.value,
  result: state.result,
  isValid: false,
  error
})
const required = (state) => {
  if (!state.isValid) {
    return state;
  }

  return state.result.length > 0 ? state : withError(state, "Обязательное поле");
}
const length = (minLength) => (state) => {
  if (!state.isValid) {
    return state;
  }

  return state.result.length >= minLength ? state : withError(state, "Длина должна быть не меньше " + minLength);
}
const hasChar = (state) => {
  if (!state.isValid) {
    return state;
  } 
  if (state.result.indexOf("!") < 0) {
    return withError(state, "Пароль должен содержать '!'");
  } else {
    return state;
  }
}

const isNumber = (state) => {
  if (!state.isValid) {
    return state;
  } 
  if (isNaN(parseInt(state.result)) || state.result !== String(parseInt(state.result))) {
    return withError(state, "Возраст должен быть числом");
  } else {
    return state;
  }
}

const isInRange = (min, max) => (state) => {
  if (!state.isValid) {
    return state;
  } 
  if (state.result < min || state.result > max) {
    return withError(state, "Должно быть между " + min + " и " + max);
  } else {
    return state;
  }
}
const validate = (...validators) => (initialState) => 
  validators.reduce((state, validator) => validator(state), initialState);


let UserFormValidation = {
  username: validate(required, length(5)),
  password: validate(required, length(8), hasChar),
  age: validate(required, isNumber, isInRange(0, 150)),
  height: validate(required, isNumber, isInRange(0, 300)),
};

const validateFiled = key => value => {
  const state = createValidationState(value);

  return (
    UserFormValidation.hasOwnProperty(key)
    ? UserFormValidation[key](state)
    : state
  );
}
const validateUserForm = form => {

  const validationStates = 
    Object.entries(form)
      .map(([key, value]) => [key, validateFiled(key)(value)])
      .filter(([, state]) => !state.isValid); // [ [key, ValidationState] ]

  const isValid = validationStates.length == 0;

  return [
    isValid, 
    Object.fromEntries(
      validationStates.map(([key, state]) => [key, state.error])
    ), 
    isValid && createUser(form)
  ];
}

const createUser = ({
  username,
  password,
  age,
  height
}) => ({
  username,
  password,
  age,
  height,
  dateOfRegistration: new Date()
});

const handleSubmit = (form) => {
  // проверка типов данных 
  const [isValid, errors, user] = validateUserForm(form);

  if (isValid) {
    // отправить форму 
    console.log("Создаем пользователя", user);
  } else {
    // отображаем ошибки в форме
    console.log("Форма заполнена с ошибками", errors, form);
  }
}

handleSubmit(validForm);
console.log("-----");
handleSubmit(invalidForm);