let userscore=0;
let compscore=0;

const choices=document.querySelectorAll(".uchoice");
const Compchoice=()=>{
    const arr=["rock","paper","scissor"];
    const x=Math.floor(Math.random()*3);
    return arr[x]
}
const updateScores = () => {
    const scoreDisplay = document.querySelector("#scoreboard"); // Use a specific element for scores
    scoreDisplay.innerHTML = `Your Score: ${userscore} - Computer Score: ${compscore}`;
   
};
const gameplay=(userChoice)=>{
    const Cchoice=Compchoice();
    const resultElement = document.querySelector("pre");

    if (Cchoice === userChoice) {
        console.log("Draw");
        resultElement.classList.remove("lost", "won");
        resultElement.classList.add("draw");
        resultElement.textContent=`DRAW! Computer chose: ${Cchoice}, Your choice: ${userChoice}`;
    } else {
        if (
            (userChoice === "rock" && Cchoice === "paper") ||
            (userChoice === "paper" && Cchoice === "scissor") ||
            (userChoice === "scissor" && Cchoice === "rock")
        ) {
            compscore++;
            console.log("Computer Wins");
            document.querySelector("#output").textContent=`you lost Computer choice ${Cchoice} your choice ${userChoice}`;
            resultElement.classList.add("lost");
            resultElement.classList.remove("won", "draw");
        } else {
            userscore++;
            console.log("You Win");
            document.querySelector("#output").textContent=`you won, computer choice ${Cchoice} your choice ${userChoice}`;
            resultElement.classList.add("won");
            resultElement.classList.remove("lost", "draw");
        }
    }
    updateScores();
};
choices.forEach((uchoice)=>{
    uchoice.addEventListener ("click",()=>{
        const userChoice=uchoice.getAttribute("id");
        gameplay(userChoice);
    });
});
