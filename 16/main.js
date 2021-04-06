//  С помощью РЕКУРСИИ!!!

//  Сумму цифр числа (только положительные числа) s(0) => 0, s(3) => 3, s(23) => (23 % 10) + s(Math.floor(23 / 10))
//  Проверить, что строка палиндром т.е. строка которая читается одинаково с обоих концов. "шалаш" , "abcba", "abba" Вернуть true или false p("") => true, p("f") => true, p("ab") => s[0] === s[length - 1] && p(""), p("abc") => s[0] === s[length - 1] && p("b")
//  3* Построить все комбинации/перестановки из заданный симоволов 
//  "ab" => ["ab", "ba"] // "abc" => ["abc", "acb", "bac", "bca", "cab", "cba"]
const reverseString = (string) => {
    let reversedString = ""
  
    for (let i = 0; i < string.length; i++) {
      reversedString = string[i] + reversedString;
    }
  
    return reversedString;
}

const reverseStringRecursive = string => {
    if (string.length === 1) { 
      return string;
    } else {
      return reverseStringRecursive(string.slice(1)) + string[0];
    }
}

console.log(reverseString("abcd"));
console.log(reverseStringRecursive("asdfsadf"));
  
const fibonacci = (n) => {
    if (n === 1) {
      return 0; 
    } else if (n === 2) {
      return 1;
    } else {
      return fibonacci(n - 2) + fibonacci(n - 1);
    }
  }

const arraySumRecursive = array => {
    if (array.length === 0) { 
      return 0;
    } else {
      return array[0] + arraySumRecursive(array.slice(1));
    }
}
  
  
  
  
const ar = [1, 2, 3];
console.log(arraySumRecursive(ar));
  
console.log(ar);
  
  
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
  
const permutations = string => {
    
    if (string.length === 0) {
      return [];
    } else if (string.length === 1) {
      return [string]; // Один символ
    } else {
      const p = [];
  
    for (let index = 0; index < string.length; index++) {
        const char = string[index];
        const remaining = string.slice(0, index) + string.slice(index + 1);
  
        const subpermutations = permutations(remaining);
  
        p.push(...subpermutations.map(permutation => char + permutation));
    }
    return p;
    }

} 
  
console.log(permutations(""));
  
console.log(permutations("a"));
  
console.log(permutations("abcd"));