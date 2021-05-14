window.addEventListener("load", () => {
    let input = document.getElementById("calc");
  
    let div = document.getElementById("result");
  
    input.addEventListener("input", () => {

        const value = input.value;

        const re = /^-?\d{1,}(\.\d{1,})?[-+*\/]\d{1,}(\.\d{1,})?$/;

        if (value.match(re)) {
            div.innerHTML = eval(value);
        } else {
            div.innerHTML = "ощибка";
        }
    });
});