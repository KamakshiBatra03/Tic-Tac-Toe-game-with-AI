let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".btn");
let newgame = document.querySelector("#newgame");
let result = document.querySelector("#result");
let msg_cont = document.querySelector(".hide");
let rr = document.querySelector(".hh");


let gameover = false;
let turn0 = true;
let count = 0;


const winpattern = [
  [0,1,2], [0,3,6], [0,4,8],
  [1,4,7], [2,5,8], [2,4,6],
  [3,4,5], [6,7,8]
];


let disablebox = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

let enablebox = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  msg_cont.classList.add("hide");
  rr.style.display = "";
  gameover = false;
  count = 0;
  turn0 = true;
};

let showWinner = (winner) => {
  result.innerText = `congo, winner is ${winner}`;
  msg_cont.classList.remove("hide");
  rr.style.display = "none";
  disablebox();
  gameover = true;
};

let drawgame = () => {
  result.innerText = "game was draw";
  msg_cont.classList.remove("hide");
  rr.style.display = "none";
  disablebox();
  gameover = true;
};


let checkWinner = () => {
  for (let pattern of winpattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("winner", pos1);
        showWinner(pos1);
      }
    }
  }
};

let genCompChoice = () => {
  if (gameover) return;

  // find empty boxes
  let emptybox = Array.from(boxes).filter(box => box.innerText === "");
  if (emptybox.length === 0) return;

  let arridx = Math.floor(Math.random() * emptybox.length);
  let bb = emptybox[arridx];
  bb.innerText = "x";
  bb.disabled = true;
  count++;
  turn0 = true;

  checkWinner();

  if (!gameover && count >= 9) {
    drawgame();
  }
};


reset.addEventListener("click", () => {
  enablebox();
});

newgame.addEventListener("click", () => {
  enablebox();
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!turn0 || gameover) return;

    count++;
    box.innerText = "o";
    box.disabled = true;
    turn0 = false;

    checkWinner();

    if (!gameover && count >= 9) {
      drawgame();
      return;
    }

    if (!gameover && count < 9) {
      setTimeout(() => {
        if (!gameover) {
          genCompChoice();
        }
      }, 1000);
    }
  });
});