const API_KEY = ``;

let newsList = []
const menus = document.querySelectorAll(".menus button") // 1. 버튼 들고오기 
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event))) // 2. menus 배열에 click 이벤트 주기,, 복기

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
let totalResults = 0
let page = 1 // 현재 page
const pageSize = 10
const groupSize = 5

// 실제 API 호출
const getNews = async() => {
    try {
        url.searchParams.set("page", page) // 쿼리 뒤에 값 셋팅 // page 파리미터의 page 값 셋팅 &page = page
        url.searchParams.set("pageSize", pageSize)
        const response = await fetch(url)
        const data = await response.json()
        if(response.status === 200){
            if(data.articles.length === 0){
                throw new Error("No result for this search"); // Edge 케이스, 응답을 받지만 0일 때 
            }
            newsList = data.articles
            totalResults = data.totalResults
            render()
            pageNationRender() 
        } else {
            throw new Error(data.message)
        }
    } catch (error){
        errorRender(error.message)
    }
}

const getLatestNews = async () => {
    url = new URL (
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    getNews() 
    // console.log("요기", data); // 이후 1. 데이터 저장 2. 보여주기 
    // console.log("newsList", newsList)
}

const getNewsByKeyword = async() => {
    const keyword = document.getElementById("search-input").value // input value 가지고 오기
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)
    getNews() 
} 

// 버튼에 클릭 이벤트를 달아 두고, 클릭되면 그 버튼의 textContent를 카테고리로 사용해 API 요청을 보내고 해당 뉴스 데이터를 받아오기
// textContent는 HTML 요소가 가진 속성이고, 자바스크립트로 그 DOM 요소를 가져와서 그 값을 읽은 것!
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase() // 버튼 이벤트의 속성을 직접 접근해서 구분자 -> 이 부분 복기 
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
    const response = await fetch(url)
    getNews() 
}

// 에러 메세지 보여주는 함수
const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`

    document.getElementById("news-board").innerHTML = errorHTML // news-board section에 보여주는 것 
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

const pageNationRender = () => {
    // totalResult
    // page
    // pageSize
    // groupSize    
    // totalPages
    const totalPages = Math.ceil(totalResults / pageSize)
    // pageGroup
    const pageGroup = Math.ceil(page / groupSize)
    // lastPage
    let lastPage = pageGroup * groupSize
    // 마지막 페이지 그룹이 그룹 사이즈보다 작다? => lastPage = totalPage
    if(lastPage > totalPages){
        lastPage = totalPages 
    }
    // firstPage
    const firstPage = 
        lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1) // 0보다 작아도 무조건 1부터
    // first ~ last 그리기

    let paginationHTML = `<li class="page-item" onclick ="moveToPage(${page - 1})"><a class="page-link" href="#">Previous</a></li>`

    for(let i = firstPage; i <= lastPage; i++){
        paginationHTML += `<li class="page-item" onclick = "moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }

    paginationHTML += `<li class="page-item" onclick ="moveToPage(${page + 1})"><a class="page-link" href="#">Next</a></li>`



    document.querySelector(".pagination").innerHTML = paginationHTML

    // `<nav aria-label="Page navigation example">
    // <ul class="pagination">
    //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //     <li class="page-item"><a class="page-link" href="#">1</a></li>
    //     <li class="page-item"><a class="page-link" href="#">2</a></li>
    //     <li class="page-item"><a class="page-link" href="#">3</a></li>
    //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
    // </ul>
    // </nav>`
}

// pageNumber = 동적으로 몇 번째 페이지인데 받기
const moveToPage = (pageNumber) => {
    page = pageNumber
    getNews() // 다시 뉴스 API를 호출
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

// 리팩토링
// 1. 반복되는 코드 따로 빼놓기

// Error
// 1. status 번호로 1차 확인가능
// 2. Error codes로 조금 더 디테일 내용 판단 가능 

// 부트스트랩 복습
// 1. HTML 36번 라인
// 2. pageNationRender() 