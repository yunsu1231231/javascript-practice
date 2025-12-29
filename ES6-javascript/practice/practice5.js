// let getNumber = () => {
//     let array = [1,2,3,4,5,6]
//     return let [array[0], array[2], array[3]]
// }

function getNumber(){
    let array = [1,2,3,4,5,6]
    let [first,,third, forth] = array // 어레이에 건너뛰고싶은 부분이 있다면 , 를 이용해 그자리를 비울 수 있다.
    return {first, third, forth}

}

console.log(getNumber())