// parser combinators


//
const equals = a => b => a === b;

const equalsCi = a => {
  a = a.toUpperCase();
  return b => a === b.toUpperCase();
}

const ar$join = xs => xs.join(""); 
const ar$flat =  xs => xs.flat(); 

// const compose = (...fs) =>    x => fs.reduceRight((r, f) => f(r), x);
const _ = f => g => (...x) => f(g(...x));

const formatError = ([tpl, ...xs]) => tpl.replace(/\$(\d+)/g, (_, i) => xs[i]);

// Parser :: Input -> Result v

class Input {
  source
  index

  get isEoI() {
    return this.index >= this.source.length;
  } 

  constructor(source, index) {
    this.source = source;
    this.index = index;
  }

  consume () {
    return [
      this.source[this.index], 
      new Input(this.source, this.index + 1)
    ];
  }

}


Input.from = source => new Input(source, 0);

class Result { }


class Success extends Result {
  state
  value

  constructor(state, value) {
    super();
    this.state = state;
    this.value = value;
  } 

  static of(value, state) {
    return new Success(state, value);
  }

  toString() {
    return "Success : " + this.value;
  }

  get isFailure() {
    return false;
  }
  
  
  get isSuccess() {
    return true;
  }

  match (_, f) {
    return f(this.value);
  }

  filter (predicate) {
    return predicate(this.value)
         ? this
         : Failure.of("Unexpexted " + this.value);
  }

  map (f) {
    return Success.of(f(this.value), this.state);
  }
}

class Failure extends Result {
  error

  constructor(error) {
    super();
    this.error = error;
  } 

  static of(...error) {
    return new Failure([error]);
  }

  toString() {
    return "Failure : " + this.error;
  }
  
  get isFailure() {
    return true;
  }
  
  get isSuccess() {
    return false;
  }

  match (f, _) {
    return f(this.error);
  }

  filter (predicate) {
    return this;
  }
  
  map (f) {
    return this;
  }
}

// parse :: string -> Result
const parse = parser => input => parser(Input.from(input));

const lazy = fparser => 
  input => fparser()(input); 

// filter :: (a -> bool) -> Parser a -> Parser a;
const filter = p => parser => 
  input => parser(input).filter(p);


// // bimap :: (ea -> eb) -> (a -> b) -> Parser a -> Parser b 
// const bimap = f  => g => parser => 
//   input => parser(input).bimap(f, g);

// map :: (a -> b) -> Parser a -> Parser b 
const map = f => parser => 
  input => parser(input).map(f);

// // map :: (ea -> eb) -> Parser a -> Parser a 
// const mapFail = f => parser => 
//   input => parser(input).mapFail(f);


// chain :: (a -> Parser b) -> Parser a -> Parser b
const chain = f => parser => 
  input => {
    const result = parser(input);

    if (result.isFailure) {
      return result;
    }

    return f (result.value) (result.state);
  };


// const label = l => parser =>
//   input => parser(input).mapFail(_ => ["Expecting ", l]);

const seq = (...parsers) =>
  input => {
    const results = [];

    for (const parser of parsers) {
      const result = parser(input);

      if (result.isFailure) {
        return result;
      } 
      
      results.push(result.value);
      input = result.state;
    }

    return Success.of(results, input);
  }

const any = (...parsers) => 
  input => {
    for (const parser of parsers) {
      const result = parser(input);

      if (result.isSuccess) {
        return result;
      }
    }

    return Failure.of("Sequence");
  }

const optional = alt => parser => 
  input => {
    const result = parser(input);
    return result.isFailure 
         ? Success.of(alt, input)
         : result;
  }

const many = parser => 
  input => {
    const results = [];

    while (true) {
      const result = parser(input);

      if (result.isFailure) {
        break;
      } 
      
      results.push(result.value);
      input = result.state;
    }

    return Success.of(results, input);
  }

const manyOne = 
  _ (chain 
      (v => input => v.length === 0 
                   ? Failure.of("Expected at least one") 
                   : Success.of(v, input))) 
    (many);

const sepBy = glue => parser => 
  optional ([]) 
    (map (([x, ...xs]) => [x, ...xs.flat().map(x => x[2])]) 
         (seq (parser, many (seq (glue, parser))))); 

const sepByN = n => glue => parser =>
  chain 
    (v => input => v.length < n
                 ? Failure.of("Expected at least " + n)
                 : Success.of(v, input))
    (sepBy (glue) (parser));

const gluedBy = glue => parser => 
   map (([x, ...xs]) => [x, ...xs.flat(2)])
       (seq (parser, manyOne (seq (glue, parser))));

const between = left => right => parser => 
  map (xs => xs[1]) 
      (seq(left, parser, right));


const eoi = 
  input => input.isEoI
         ? Success.of(undefined, input)
         : Failure.of("Expecting EOI");

const achar =
  input => input.isEoI 
         ? Failure.of("Unexpected EOI")
         : Success.of(...input.consume());

const fchar = p => filter (p) (achar);

const char = c => fchar (equals (c));

const charCi = c => fchar(equalsCi (c));

const mapArToStr = _ (map (ar$join)); 

const charSeq = mapArToStr (seq);

const str = str => charSeq(...Array.from(str).map(char));

const strCi = str => charSeq(...Array.from(str).map(charCi));

const charOptional = optional ();

const charMany = mapArToStr (many);

const charManyOne = mapArToStr (manyOne);
