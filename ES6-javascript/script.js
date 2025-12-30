// let name = "y"
// let age = 1

// // let person = {name: name, age: age}
// let person = {name, age}

// console.log(person)

// let b = {
//     name: "a",
//     num: 7
// }
// // let name = b.name
// // let num = b.num

// let {name, num} = b

// console.og(name,num)

// let name = "a"
// let age = 1

// console.log("이름은", name + age + "입니다")

// console.log(`이름은 ${name}, 나이는 ${age} 입니다.`)

// let array = [1,2,3]
// // let a = array[0]
// // let b = array[1]
// // let c = array[2]

// // let [a,b,c] = array
// let [a,...rest] = array
// console.log(rest)

// console.log(a,b,c)

// let person = {
//     name: "a",
//     age : 1,
//     c : true
// }

// let {name,... restInfo} = person 
// console.log(name, restInfo) // a {age: 1, c : true}


// let a = [1,2]
// let b = [3,4]
// let c = [5,6]

// // let result = a.concat(b,c) // [1,2,3,4,5,6]

// let result = [...a,...b,...c] // ... 연산자, 배열 전체를 복사

// function foo(){
//     console.log(hello)
//     return "a"
// }

// let foo = () => "a"

// // 함수를 변수처럼, => 연산자를 function으로 대체 
// let foo = () => {
//     console.log("hello")
// }

// let age = 17

// let person = {
//     name:"hege",
//     age: 20,
//     getInfo:function(){
//         console.log(age) // 17
//         console.log(this.age) // 20
//     }
// }

// person.getInfo() // this는 함수를 부르는 객체, 여기서는 this = person 

// this -> 일반함수, 화살표 함수 x
// 그게 아니면 화살표 함수 





