// 로직
// 1. 유저가 값을 입력한다
// 2. 플러스 버튼을 클릭하면 -> 클릭 이벤트, 할 일이 추가된다. -> 어디에 추가? 리스트에,, 배열을 생성
// 3. delete 버튼을 누르면 할 일이 삭제된다.
// 4. check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다. -> 모든 테스크가 본인이 끝남 유무를 가지고 있어야 한다 -> 객체로 생성
// check 버튼을 누르면 (click 이벤트) true -> false
// true이면 끝난거으로 간주 -> 밑줄 


// 6. 진행 중 끝남 탭을 누르면, 언더바가 이동한다
// 7. 전체 탭, 끝남 탭, 진행 중 탭에 따른 아이템 표시 

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click", addTask) // click 이벤트, 함수

function addTask(){
    // let taskContent = taskInput.value
    // task 객체 
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    } 

    taskList.push(task)
    console.log(task);

    render();

    taskInput.value = "";
}

function render(){
    let resultHTML = ''
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){
            // "task-done" css 속성 추가 
            resultHTML += `<div class ="task">
                    <div class = "task-done">${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                        <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                    </div>
                </div>`
        } else {
            resultHTML += `<div class ="task">
                        <div>${taskList[i].taskContent}</div>
                        <div>
                            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                        </div>
                    </div>`
        }
    }
    // .innerHTML → 그 div 태그 안쪽 내용을 가리키는 속성
    // resultHTML → 그 태그의 내부 HTML을 통째로 교체
    document.getElementById("task-board").innerHTML = resultHTML;
}

// <button onclick = "toggleComplete('${taskList[i].id})')">Check</button>
// onclick 이벤트가 발생하면 -> id를 받고 -> 해당하는 id의 아이템을 찾기 
function toggleComplete(id){
    console.log("id: ", id);
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            // taskList[i].isComplete = true
            taskList[i].isComplete = !taskList[i].isComplete // switch처럼 왔다갔다-> !
            break
        }
    }
    render(); // togglerComplete 끝나면 -> render 불러주기!! (다시 UI 값을 그리기)
    console.log(taskList)
}

function randomIDGenerate(){
    return crypto.randomUUID();
}

function deleteTask(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1);
            break
        }
    }
    render(); // togglerComplete 끝나면 -> render 불러주기!! (다시 UI 값을 그리기)
}


// 함수 입장에서 -> 어떤 아이템이 선택됐는지 알지 -> 함수에 어떤 아이템이 선택됐는지 알려줘야함 -> 아이템 속성에 구분자를 주고 그걸 함수에 전달해주기
// generate random id javascript

// 1. addButton.addEventListener("click", addTask) // click 이벤트, 함수
// 2. onclick -> 바로 버튼 tag에 클릭 이벤트를 주는 방식






















// 부트스트랩 사용법: 한 번 더 공부