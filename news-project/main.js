const API_KEY = ``;

let newsList = []
const menus = document.querySelectorAll(".menus button") // 1. 버튼 들고오기 
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event))) // 2. menus 배열에 click 이벤트 주기,, 복기

const getLatestNews = async () => {
    const url = new URL (
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const response = await fetch(url)
    const data = await response.json() // .json // 그냥 파일 확장자 // 객체 타입 // 함수 단위로 서버 통신은 기다리기
    newsList = data.articles
    render() // newsList가 확정되어야 -> 화면을 그려주므로 // 여기에 붙여주기
    console.log("요기", data); // 이후 1. 데이터 저장 2. 보여주기 
    console.log("newsList", newsList)
}

// 버튼에 클릭 이벤트를 달아 두고, 클릭되면 그 버튼의 textContent를 카테고리로 사용해 API 요청을 보내고 해당 뉴스 데이터를 받아오기
// textContent는 HTML 요소가 가진 속성이고, 자바스크립트로 그 DOM 요소를 가져와서 그 값을 읽은 것!
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase() // 버튼 이벤트의 속성을 직접 접근해서 구분자 -> 이 부분 복기 
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
    const response = await fetch(url)
    const data = await response.json() // response.json() -> 당장 결과를 주는 함수가 아닌 비동기 Promise를 반환. 따라서 await으로 기다려줘야 한다.
    console.log("data", data)
    newsList = data.articles // 방금 받은 articles을 넣어주기
    render()
}

// 뉴스 그려주는 함수
const render = () => {
    const newsHTML = newsList.map(
        (news) => `<div class = "news row"> 
                <div class ="col-lg-4">
                    <img class = "news-img-size"src = "${news.urlToImage}">
                </div>

                <div class ="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>
                        ${news.description}
                    </p>
                    <div>
                        ${news.source.name} * ${news.publishedAt}
                    </div>
                </div>`).join(" ") // Array 반환 // 붙일 내용
    
    document.getElementById("news-board").innerHTML = newsHTML // id: news-board에 붙인다
}

getLatestNews()

// 1. 서버는 JSON “형식의 문자열(text)”을 보내고,
// 우리는 그 문자열을 파싱해서 자바스크립트 객체로 만든다.

// 2. JSON을 파싱하면 자바스크립트 엔진이
// 우리가 바로 사용할 수 있는 객체(Object/Array)를 자동으로 만들어준다.

// 로직
// 1. 버튼들에 click 이벤트를 주기
// 2. api를 통해 카테고리별 뉴스를 가져오기
// 3. 그 뉴스를 보여주기

// menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event))) // 2. menus 배열에 click 이벤트 주기,, 복기
// 1. menus를 대상으로
// 2. forEach 순회하면서 동일한 작업
// 3. 
// menu.addEventListener("click", handler)
// 1. 지금: 클릭되었을 떄 실행할 행동을 등록
// 2. 나중 실행: 사용자가 클릭했을 때
// 클릭이 발생하면
// 1. 브라우저가 event을 만들어 주고
// 2. 그걸 getNewsByCategory에 넘겨준다.

// forEach는 메뉴 버튼 하나씩 꺼내서 이벤트를 등록만 하고 역할이 끝나며,
// 실제 함수 실행은 클릭 시 브라우저가 event를 넘겨줄 때 handler가 실행된다.

// 중첩 코드 읽는 순서
// 1. 바깥 -> 안쪽
// 2. 대상 -> 작업 -> 전달값 순서 
