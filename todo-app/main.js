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
let tabs = document.querySelectorAll(".task-tabs div") // 조건에 만족하는 모든것을 가지고오기
let mode = "all"
let taskList = []
let filterList = []
let doneList = []


addButton.addEventListener("click", addTask) // click 이벤트, 함수

for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)
    })
}

// ctrl + d = 동시 선택 단축키 
// tabs[i].addEventListener("click", function(event)) -> event 전달
function filter(event){
    mode = event.target.id
    if(mode === "all"){
        // 전체 리스트 
        render()
    } else if(mode === "ongoing"){
        filterList = []
        // 진행중인 아이템을 보여주기 = task.isComplete = false
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
                // 1. 진행중인것만 모아놓는 리스트 필요
                filterList.push(taskList[i])
            }
        }
    } else if (mode === "done"){
        doneList = []
        // 끝나는 케이스 = task.isComplete = true
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === true){
                // 1. 진행중인것만 모아놓는 리스트 필요
                doneList.push(taskList[i])
            }
        }
    }
}

function addTask(){
    // let taskContent = taskInput.value
    // task 객체 
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value, // 이미 저장되어 있는 input 객체의 속성을 읽는 것
        isComplete:false
    } 

    if(task.taskContent === ""){
        return
    }

    taskList.push(task)
    console.log(task);

    render();

    taskInput.value = "";
}

function render(){
    // 1. 내가 선택한 탭에 따라서 리스트를 다르게 보여주기 -> 선택한 탭을 전달 // 
    let list = [] 
    if(mode === "all"){
        // taskList
        list = taskList;
    } else if (mode === "ongoing"){
        // filterList
        list = filterList;
    } else if (mode == "done"){
        list = doneList;
    }
    
    
    let resultHTML = ''
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            // "task-done" css 속성 추가 
            resultHTML += `<div class ="task">
                    <div class = "task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`
        } else {
            resultHTML += `<div class ="task">
                        <div>${list[i].taskContent}</div>
                        <div>
                            <button onclick="toggleComplete('${list[i].id}')">Check</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
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
    let list = [] 
    if(mode === "all"){
        // taskList
        list = taskList;
    } else if (mode === "ongoing"){
        // filterList
        list = filterList;
    } else if (mode == "done"){
        list = doneList;
    }

    for(let i = 0; i < list.length; i++){
        if(list[i].id == id){
            list.splice(i, 1);
            break
        }
    }
    render(); // 값 업데이트 -> UI 업데이트!! // 이걸 대신 해주는게 REACT
}


// 함수 입장에서 -> 어떤 아이템이 선택됐는지 알지 -> 함수에 어떤 아이템이 선택됐는지 알려줘야함 -> 아이템 속성에 구분자를 주고 그걸 함수에 전달해주기
// generate random id javascript

// 1. addButton.addEventListener("click", addTask) // click 이벤트, 함수
// 2. onclick -> 바로 버튼 tag에 클릭 이벤트를 주는 방식

// how to change cursor on div tag css 
// 부트스트랩 사용법: 한 번 더 공부

// 진행중, 끝남 -> 반복해서 누르면 -> 반복해서 생성되는 것 

// 이벤트 핸들러 함수는 인자를 안 받아도
// DOM 요소(태그)에 접근할 수 있다.
// 이유는 이벤트 때문이 아니라
// 스코프와 DOM 참조 때문