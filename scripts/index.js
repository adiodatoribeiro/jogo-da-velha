const board = ['','','','','','','','',''];

let currentPlayer = 'X';

let gameActive = true;

let winnerHistory = [];

function updateGameHistory(winner){
    winnerHistory.push(winner);

    renderGameHistory();
}

function renderGameHistory(){
    const winnerHistoryElement = document.getElementById("winnerHistory");

    winnerHistoryElement.innerHTML = "";

    winnerHistory.forEach((winner, index) =>{
        const winnerElement = document.createElement("li");
        winnerElement.textContent = `Jogo ${index + 1}: ${winner}`;
        winnerHistoryElement.appendChild(winnerElement);
    })
}

const winnerCombinations = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6],          //diagonals
]

function resetGame(){
    board.fill("");

    document.getElementById("status").innerText = `Jogador ${currentPlayer} é a sua vez!`;

    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

    gameActive = true;
}

function checkWinner(){
    for(let i = 0; i < winnerCombinations.length; i++){
        const [a, b, c] = winnerCombinations[i];

        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board [a];
        }
    }

    return null;
}

function handleClick(idx){
    if(board[idx] !== "" || !gameActive) return;

    board[idx] = currentPlayer;

    document.getElementById(`cell-${idx}`) .innerHTML = currentPlayer;

    const winner = checkWinner();

    if(winner) {
        document.getElementById("status").innerText = `Jogador ${winner} venceu!`
        gameActive = false;

        updateGameHistory(winner);
    } else if(!board.includes("")){
        document.getElementById("status").innerText = `Empate!`;
        gameActive = false;

    } else {
        currentPlayer = currentPlayer =="X" ? "0" : "X";
        document.getElementById("status").innerText = `Jogador ${currentPlayer} é a sua vez!`;
    }
    
}