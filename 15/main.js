const isPalindromRecursive = string => {
    if (string.length === 0 || string.length === 1) {
      return true;
    } else {
      return string[0] === string[string.length - 1] && isPalindromRecursive(string.slice(1, -1))
    }
}
  
  
  
let strings = ["a", "aa", "asa", "asd", "шалаш", "ШаЛаШ", "каКаду"];
strings.forEach(string => console.log(string + " - палиндром? Ответ - " + isPalindromRecursive(string.toLowerCase())));
  
const numberElementsSumRecursive = (number) => {
    if (number == 0) {
      return 0;
    } else {
      return (number % 10) + numberElementsSumRecursive(Math.trunc(number / 10));
    }
}