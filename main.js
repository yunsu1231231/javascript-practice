// 숫자 맞추기 up and down 게임: 로직  
// 1. 랜덤번호 지정 
// 2. 유저가 번호를 입력하고 go 버튼을 누른다 -> html UI가 필요
// 3. 만약에 유저가 번호를 맞추면, 맞췄습니다
// 4. 랜덤번호가 < 유저번호 down 
// 5. 랜덤번호가 > 유저번호 up 
// 6. reset 버튼을 누르면 게임이 리셋
// 7. 5번의 기회가 다쓰면 게임이 끝난다. (더 이상 추측 불가능 = 버튼 disable)
// 8. 유저가 1 ~ 100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 9. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다. -> 과거 유저 입력 정보를 알아야한다.

let computerNum = 0;
let playButton = document.getElementById("play-button") // documnet = 웹사이트 자체 -> 에서 id로 html 태그를 선택 // html 요소를 가지고 오기
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chanceArea = document.getElementById("chance-area")
let chances = 5
let gameOver = false
let history = []


playButton.addEventListener("click", play) // click 이벤트가 발생하면 -> play 함수를 실행 // 함수를 변수로 넘김, 그래서 play()가 아닌 play 
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function(){userInput.value=""})


// 랜덤번호 뽑는 함수 
function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", computerNum);
}

function play(){
    // 1. 사용자 입력 번호를 가지고 오기 
    let userValue = userInput.value

    // 유효성 검사
    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "1과 100 사이 숫자를 입력하시오"
        return
    }

    // history 중복 검사
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다." // ex. DOM 요소는 상속 구조를 가지며 일반적으로 “글자를 표시할 수 있는 요소”는 모두 textContent로 제어!!
        return
    }

    // 1.5 
    chances --
    chanceArea.textContent = `남은기회: ${chances}번` // "" 정적인 값, `` 백틱 -> 
    // console.log("chances", chances)


    // 2. 비교 로직
    if(userValue < computerNum) {
        // console.log("UP")
        resultArea.textContent = "UP" // resultArea의 textContent을 up
    } else if (userValue > computerNum){
        // console.log("DOWN")
        resultArea.textContent = "DOWN"
    } else {
        // console.log("맞췄습니다!")
        resultArea.textContent = "맞췄습니다"
    }

    history.push(userValue) // 저장
    console.log(history)

    if(chances < 1){
        gameOver = true
    }

    if(gameOver == true){
        playButton.disabled = true // <button> 객체의 속성 // 버튼 객체는 내가 만든 게 아니라, "브라우저"가 HTML을 읽으면서 자동으로 만들어준 객체
    }
}


function reset(){
    // 단계별 사고 
    // 1. user input창이 깨끗하게 정리
    userInput.value = ""

    // 2. 새로운 번호가 생성 
    pickRandomNum()

    resultArea.textContent = "결과값이 여기에 나온다!"
}


pickRandomNum();

// 공부할 부분: 브라우저가 만든 태그 객체에 속성, 함수에 대한 부분 
// HTML 속성 = JS 객체의 속성 ex. input tag -> userInput.value = "",, value 속성으로 main.js에서 사용 

