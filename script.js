const scoreboard = document.getElementsByClassName("scoreboard")[0];
const informationForm = document.querySelector(".information");
const addPlayer = document.querySelector(".add-button");
const errorbox = document.getElementsByClassName("errorbox")[0];
const buttonContainer = document.querySelectorAll(".button-container");

const scoreManager = (e) =>{
    const clickedButton = e.target.closest("button");
        const parentItem = clickedButton.closest(".item");
        const score = parentItem.querySelector(".score-container");

        if (clickedButton.classList.contains("delete")) {
            parentItem.remove();
        } else if (clickedButton.classList.contains("increase") && (5 + +score.innerText) <= 100) {
            score.innerText = `${5 + +score.innerText}`;
        } else if (clickedButton.classList.contains("decrease") && (score.innerText - 5) >= 0) {
            score.innerText = `${score.innerText - 5}`;
        }

        sortLeaderBoard();
};

function createItem (inputFName, inputLName, inputCountry, inputScore){
const item = document.createElement("div");
item.className = "item";
item.innerHTML= `<div class="name-container">
<div class="name">
    ${inputFName +" "+ inputLName}
</div>
<div class="time">
    ${generateDateAndTime()}
</div>
</div>
<div class="country-container">
${inputCountry}
</div>
<div class="score-container">
${inputScore}
</div>
<div class="button-container">
<button class="delete">
    <img src="./delete-button-svgrepo-com.svg" alt="">
</button>
<button class="increase">
    +5
</button>
<button class="decrease">
    -5
</button>
</div>`

return item;
}

informationForm.addEventListener("submit",(e)=>{
e.preventDefault();

const inputFName = e.target.children[0].value;
const inputLName = e.target.children[1].value;
const inputCountry = e.target.children[2].value;
const inputScore = e.target.children[3].value;

if(inputFName == "" || inputLName == "" || inputCountry == "" || inputScore ==""){
errorbox.style.display = "block";
return;
}else{
    errorbox.style.display = "none";
}
const item = createItem(inputFName, inputLName, inputCountry, inputScore);
scoreboard.append(item);
const buttonContainer = document.querySelectorAll(".button-container");

buttonContainer.forEach((ele) => {
    console.log(ele);
     ele.addEventListener("click", scoreManager)
});
sortLeaderBoard();
e.target.reset();

})

// buttonContainer.forEach((ele)=>{
//     ele.addEventListener("click", (e)=>{
//         const score =parentItem.querySelector(".score-container");
//         console.log(score);
//             // if(e.target.parentElement == deleteItem){
//             //     deleteItem.parentElement.parentElement.parentElement.remove();
//             // }else if(e.target == increaseScore && (5 + + score.innerText) <= 100){
//             //     score.innerText = `${5 + +score.innerText}`; 
//             // } else if(e.target == decreaseScore && (score.innerText - 5)>= 0){
//             //     console.log(score);
//             //     score.innerText = `${score.innerText -=5}`
//             // }
//             // sortLeaderBoard();
//             const clickedButton = e.target.closest("button");

//         const parentItem = clickedButton.closest(".item");

//         if (clickedButton.classList.contains("delete")) {
//             parentItem.remove();
//         } else if (clickedButton.classList.contains("increase") && (5 + +score.innerText) <= 100) {
//             score.innerText = `${5 + +score.innerText}`;
//         } else if (clickedButton.classList.contains("decrease") && (score.innerText - 5) >= 0) {
//             console.log(score);
//             score.innerText = `${score.innerText -= 5}`;
//         }

//         sortLeaderBoard();
//         });
        
// })
buttonContainer.forEach((ele) => { ele.addEventListener("click", scoreManager)
});



const sortLeaderBoard = ()=>{
    const item = document.querySelectorAll(".item");
    const itemArray = Array.from(item);
    itemArray.sort((a,b)=>{
        const score1 = parseInt(a.children[2].innerText);
        const score2 = parseInt(b.children[2].innerText);
        if(score1 > score2){
            return -1;
        } else if(score2 > score1){
            return 1;
        }else {
            return 0;
        }
    });
    itemArray.forEach((ele)=>{
        scoreboard.append(ele);
    })
}
sortLeaderBoard();

function generateDateAndTime(){
    let dateObject = new Date();
    // console.log(dateObject);
    let month = dateObject.toLocaleString("default", {month:"long"})
    // console.log(month);
    day = dateObject.getDate(),
    year = dateObject.getFullYear(),
    time = dateObject.toLocaleTimeString().slice(0,8);
    // console.log(time);

    let generateResult = `${month} ${day}: ${year} ${time}`

    return generateResult;
}