let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn")
let newGameBtn = document.querySelector(".new-game-btn")
let winner = document.querySelector(".winner")

let turnO = true;
let turnCount = 0;
let gameDraw = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,4,6],
    [1,4,7],
    [2,5,8],
    [0,4,8]
]

const disableGame = () => {
    for(box of boxes){
        box.disabled = true;
    }
    resetBtn.disabled = true;
    resetBtn.classList.add("hide");
}

const enableGame = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    resetBtn.disabled = false;
    resetBtn.classList.remove("hide");
    turnCount = 0;
}

const resetGame = () => {
    turnO = true;
    enableGame();
    winner.classList.add("hide")
}
// const newGame = () => {
//     turnO = true;
//     enableGame();
//     winner.classList.add("hide")
// }

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        if(turnCount>3){
            checkWinner();
        }
        
        turnCount++
    })
})

const checkWinner = () => {
    for(pattern of winPatterns){
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]])
        pos1Val = boxes[pattern[0]].innerText;
        pos2Val = boxes[pattern[1]].innerText;
        pos3Val = boxes[pattern[2]].innerText;


        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(turnCount<8){
                if(pos1Val === pos2Val && pos2Val === pos3Val){
                    winner.innerText = `Congratulations!! ${pos1Val} Won the Game`;
                    winner.classList.remove("hide");
                    disableGame();
                    gameDraw = false;
                }
            }
        }
    }
    if(gameDraw && turnCount == 8){
        winner.innerText = `oops!! it's a draw`;
        winner.classList.remove("hide");
        disableGame();
        gameDraw = true;
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);