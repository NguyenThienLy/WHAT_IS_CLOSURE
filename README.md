## Mục lục
0. Vấn đề
1. Lexical scoping là gì ?
2. Closure là gì?
3. Giả lập class bằng closures
4. Closure Scope Chain
5. Các bài phỏng vấn thường thấy về closure
6. Kết bài 

## 0. Vấn đề

***Heyzo what's up***

Xin chào tất cả mọi người, mọi người có biết **closures** à gì không? Đối với một người mới đi làm như mình thì cũng mơ hồ

> Mình rất cay vì mình luôn được phỏng vần về **closure** tưởng đã chuẩn bị chắc ăn nhưng cuối cùng toàn trả lời fail. Vì vậy hôm nay mình sẽ tổng hợp về **closure** để tạo ra một bí kíp riêng cho mình và chia sẻ cùng mọi người nha

Bài viết này mình tổng hợp từ nhiều nguồn, nếu mọi người có góp ý gì thì mình rất sẵn lòng tiếp thu.

Bắt đầu thôi @-@

## 1. Lexical scoping là gì?

Xem xét ví dụ dưới đây

``` js
function outerFuc() {
  var name = 'Nguyen Thien Ly'; 

  function innerFunc() { 
    console.log(name);  
  }

  innerFunc();
}

outerFuc(); // Kết quả ra là Nguyen Thien ly
```

Bên trong hàm **outerFunc** gồm: Một biến cục bộ **name**, và function **innerFunc**. Bên trong function **innerFunc** không có biến cục bộ nào cả nhưng trong hàm này đang sài một biết **name** của cha nó function **functionOuter**. Vậy đây là một ví dụ về **lexical scopping** cách mà các function sử dụng một biến của một hàm nó lòng trong, hoặc nhiều hàm lòng vào nhau.

## 2. Closure là gì?

> Closure là một hàm được viết lồng vào bên trong một hàm khác (hàm cha) nó có thể sử dụng biến toàn cục, biến cục bộ của hàm cha và biến cục bộ của chính nó (lexical scoping)

Tiếp tục đoạn code trên và thay đổi một chút

``` js
function outerFuc() {
  var name = 'Nguyen Thien Ly'; 

  function innerFunc() { 
    console.log(name);  
  }

  return innerFunc;
}

var refInnerFunc = outerFuc();

refInnerFunc(); // Kết quả ra là Nguyen Thien ly
```

Nếu mà bạn không để ý thì bạn sẽ để ý được sự khác biệt mà **javascript** mang lại.

Cái chỗ thằng **refInnerFunc** được gán bằng kết quả thực hàm **outerFuc()**  vậy thì giờ thằng **refInnerFunc** đang references đến kết quả chạy hàm **outerFuc()** (refInnerFunc trỏ đến hàm innerFunc nhưng chưa thực thi hàm này nhé)

Hàm **outerFuc()** giờ đã thực thi xong các biến cục bộ của nó sẽ được giải phóng

Giờ đến lượt thực thi function **innerFunc()** (Chạy dòng này nè refInnerFunc()). kết quả in ra **Nguyen Thien Ly**. Ủa đây là biến thằng cha mà, nó đã bị hủy rồi sao còn in ra được zậy, không phải **undefined** à. Vậy đã có điều gì xảy ra?

Ở **javascript** khi một hàm nằm trong một hàm khác, thì cái hàm nằm trong chưa thực thi mà thằng cha nó lỡ thực thi trước, thì nó sẽ tạo ra một **Lexical Enviroment** để đặt tất cả các biến của nó đang có và "gắn" vào hàm con để đề phòng trường hợp thằng con có cần thì có mà xài :v

Ở trường hợp trên sau khi function **outerFuc()** đã chết rồi nó để lại di chúc cho thằng hàm con trong nó là một tài sản biến **name**, sẽ đi theo thằng hàm **innerFunc()** cho đến khi mà thằng này cũng chết thì nó mới giải phóng

Vậy trong ví dụ trên ai là Closure? Câu trả lời là **refInnerFunc** vì nó đang là một hàm nằm trong hàm khác (Vì nó đã được assign **innerFunc**) và nó đang có biến **name** của cha nó (Có thể sài dù cha nó có thể mất đi) và biến global (nếu có) và biến cục bộ của nó (nếu có). (Lexical enviroment). **refInnerFunc** sẽ reference đến cái **Lexical enviroment** (Trỏ vào đây). Vậy thằng **refInnerFunc** đang trỏ vào function **innerFunc()** và lexical enviroment của nó nhá. 

Nhìn vào hình dưới đây sẽ thấy

[<img src="https://i.imgur.com/2DsHJru.png">](closure)


Một ví dụ khác :v

``` js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
Cả hai thằng **add5** và **add10** đều là **closure** và thằng mỗi thằng có mỗi **lexical enviroment** riêng. 

add5 (Cha nó để lại di chúc biến **x=5** và nó đang trỏ tới anonymous function và trong đó có biến cục bộ là **y**) 

ddd10 (Cha nó để lại di chúc biến **x=10** và nó đang trỏ tới anonymous function và trong đó có biến cục bộ là **y**) 

Đậy là dạng **closure** dùng khác **lexical enviroment** (thằng x = 5 thằng x = 10) và chung xử lí (Chung hàm anonymous y)
(Dạng 1)

## 3. Giả lập class bằng closures

javascript là ngôn ngữ hướng hàm **functional programming** nhưng ai cũng biết được rằng ngôn ngữ hướng đổi tưởng **object oriented programming** có những thứ rất hay ho ví dụ: Tính chất bao bọc và bảo vệ dữ liệu, vậy trong ES6 có class thì thực chất là khai báo và dùng tính chất closure này để mô phỏng tương đối 

``` js

//Ví dụ 2
var counter1 = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
     changeBy(-1);
    },
    value: function() {
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

//Ví dụ 2
var counter2 = (function() {
  var privateCounter = 0;
  // function changeBy(val) {
  //   privateCounter += val;
  // }
  return {
    increment: function() {
      privateCounter ++;
    },
    decrement: function() {
      privateCounter --;
    },
    value: function() {
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
```

Ở đây ta có một closure:
- counter

Dùng chung một **lexical enviroment** gồm:
- Biến privateCounter
- Function changeBy

Và khác phần xử lí
- increment
- decrement
- value

(Dạng 2) coi lại dạng 1 phần 2

Vì dùng chung nên cả ba thằng này đều có thể dùng function **changeBy()** để điểu khiến biến **privateCounter** như ví dụ 1 hoặc có thể tự điều khiển **privateCounter** bên trong mỗi hàm như ví dụ 2

Vậy ta không thể thấy hay điều khiển được các biến trong **lexical enviroment** này mà chỉ được tác động đến **privateCounter** thông qua những function mà nó cung cấp (**increment, decrement, value**) . Khá giống với OOP phải không nào ^^

## 4. Closure Scope Chain

Ví dụ dưới đây

``` js
// global scope
var e = 10;
function sum(a){
  return function sum2(b){
    return function sum3(c){
      // outer functions scope
      return function sum4(d){
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
```

Trong ví đụ dưới đây ta thấy có các closure như sau

- s (Có lexical enviroment gồm biến a và e trỏ vào function **sum2** )

- s1 (Có lexical enviroment gồm biến a, b và e trỏ vào function **sum3** )

- s2 (Có lexical enviroment gồm biến a, b, c và e trỏ vào function **sum4** )

- s3 (Có lexical enviroment gồm biến a, b, c, d và e và thực thi và giải phong a, b, c, d)

Vậy nhận ra rằng

- Tất cả có chung biến global là e
- Thằng đằng trong sẽ lấy tất cả các dữ liệu thằng ngoài có

## 5. Bài phỏng vấn thường thấy về closure

Ví dụ dưới đây

``` js
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000)
}

// logs 3, 3, 3
```

Chúng ta thấy rằng function **anonymous để console biến i của cha nó** sẽ chạy sau khi cha nó chạy xong (Vì thằng này delay ít nhất 1s), vì vậy **javascript** sẽ tạo ra **closure** để cung cấp cho thằng hàm con trong có thể sài, vì vòng lặp là 3 nên sẽ tạo ra 3 **closure**

Giờ xem xét cái **lexical enviroment** nào, t biết rằng **var i** tuân thủ nguyên tắc **function scope** nó sẽ được tạo mới trong mỗi function còn ngoài function thì **var i** nhiều lần cũng chỉ là biến **i** đó thôi. Vậy chúng nó sài chung **lexical enviroment** (Giống bài mô phỏng class phần 3).

Mà để hàm thực thi function **log i** ra cần tới 1s sau, vậy theo như ví dụ trên, vòng lặp for sẽ được chạy xong trước khi thực thi function **log i** sớm nhất được thực thi vậy biến i lúc này sẽ luôn là giá trị sau khi chạy xong vòng **for, i = 3**.

Vậy sẽ ra kết quả là 3, 3, 3

Để sửa lỗi này t có nhiều cách nhưng mình sẽ đề xuất một cách là dùng **let** thay cho **var** vì let theo nguyên tắc **block scope** biến sẽ được tạo mới trong dấu **{  }** nên sẽ có 3 closure dùng 3 **lexical enviroment** khác nhau nhé

``` js
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000)
}

// logs 0, 1, 2
```

## 6. Kết bài

Đến đây cũng đã hết bài viết rồi, cảm ơn mọi người đã theo dõi. Nếu có góp ý hay thắc mắc gì thì cứ để lại comment bên dưới mình sẽ trả lời. Xin chào mọi người. 

#### Link tham khảo:
- https://medium.com/@giangcoffee/closure-l%C3%A0-g%C3%AC-ebd02b153f07
- https://developer.mozilla.org/vi/docs/Web/JavaScript/Closures

















