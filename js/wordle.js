// 정답글자
const right = "APPLE";

// 정답확인
let attempts = 0;

// 줄 넘김
let index = 0;

// 타이머 설정
let timer;
// 게임이 종료되었을 때 종료 되었다고 문자 출력되도록
// 자바스크립트에서 실행
// 별로 좋은 방법은 아님
function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:35vw; background-color:white; width:300px; height:300px;";
    document.body.appendChild(div);
  };

  // 맞추지 못하면 다음 줄로 넘기지만
  // 6번째 줄까지 넘어가서도 정답을 맞추지 못하면 종료
  const nextLine = () => {
    if (appStart === 6) return;
    attempts += 1;
    index = 0;
  };

  // 정답을 맞추면 게임을 종료
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    // 게임종료시 타이머도 종료된다
    clearInterval(timer);
  };

  // 엔터키를 입력하면 다음줄로
  const handleEnterKey = () => {
    let rightEA = 0;

    // 다음
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[date-index='${attempts}${i}']`
      );

      // 정답 입력
      const letter = block.innerText;
      // 정답 확인
      const rightCheck = right[i];
      // 입력한 글자의 정답과 칸을 확인하여 맞은면 그린
      // 칸은 다르지만 정답이면 옐로우
      // 둘 다 다르면 그레이
      if (letter === rightCheck) {
        rightEA += 1;
        block.style.background = "green";
      } else if (right.includes(letter)) block.style.background = "yellow";
      else block.style.background = "gray";

      block.style.color = "white";
    }

    // 정답을 확인하여 맞으면 게임오버
    // 아니라면 다음 줄로
    if (rightEA === 5) gameover();
    else nextLine();
  };

  // 백스페이스 정상작동
  const handleBackspace = () => {
    if (index > 0) {
      const preblock = document.querySelector(
        `.board-block[date-index='${attempts}${index - 1}']`
      );
      preblock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  // 키 입력시 영어 대문자로 입력이 되도록
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisblock = document.querySelector(
      `.board-block[date-index='${attempts}${index}']`
    );

    // 백스페이스 키를 입력할 수 있도록
    if (event.key === "Backspace") handleBackspace();
    // 백스페이스 키가 아니면
    // 글자를 5글자 다 입력하였을 때
    // 엔터키 입력시 다음 줄로 넘기도록
    // 키코드가 65(a) 보다 높거나 90(z) 키보다 낮으면 입력됨
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisblock.innerText = key;
      // 세가지가 다 비슷한 표현
      //index += 1;
      //index = index + 1;
      index++;
    }
  };

  // 게임 시작시 타이머가 돌도록 설정
  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const realtime = new Date();
      const flowtime = new Date(realtime - start_time);
      const minutes = flowtime.getMinutes().toString().padStart(2, "0");
      const seconds = flowtime.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${minutes}:${seconds}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  // 키보드를 눌렀을시 키가 입력되도록
  window.addEventListener("keydown", handleKeydown);
}

appStart();
