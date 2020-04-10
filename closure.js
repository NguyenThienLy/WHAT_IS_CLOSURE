function init() {
  var name = 'Nguyen Thien Ly'; // name là biến cục bộ của hàm init
  function displayName() { // displayName() là hàm closure
    console.log(name); // sử dụng biến của hàm cha
  }
  displayName();
}
init();

console.log('------------------------------------');
function outerFuc() {
  var name = 'Nguyen Thien Ly';

  function innerFunc() {
    console.log(name);
  }

  return innerFunc;
}

var refInnerFunc = outerFuc();
refInnerFunc(); // Kết quả ra là Nguyen Thien ly

console.log('------------------------------------');
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12

console.log('------------------------------------');
//Ví dụ 2
var counter1 = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    }
  };
})();

console.log(counter1.value()); // logs 0
counter1.increment();
counter1.increment();
console.log(counter1.value()); // logs 2
counter1.decrement();
console.log(counter1.value()); // logs 1

console.log('------------------------------------');
//Ví dụ 2
var counter2 = (function () {
  var privateCounter = 0;
  return {
    increment: function () {
      privateCounter++;
    },
    decrement: function () {
      privateCounter--;
    },
    value: function () {
      return privateCounter;
    }
  };
})();

console.log(counter2.value()); // logs 0
counter2.increment();
counter2.increment();
console.log(counter2.value()); // logs 2
counter2.decrement();
console.log(counter2.value()); // logs 1

console.log('------------------------------------');
// global scope
var e = 10;
function sum(a) {
  return function sum2(b) {
    return function sum3(c) {
      // outer functions scope
      return function sum4(d) {
        // local scope
        return a + b + c + d + e;
      }
    }
  }
}

var s = sum(1);
var s1 = s(2);
var s2 = s1(3);
var s3 = s2(4);
console.log(s3) //log 20

console.log('------------------------------------');
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000)
}


for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000)
}

