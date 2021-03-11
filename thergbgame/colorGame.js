var squares = document.querySelectorAll(".square");
var display = document.querySelector(".display");
var h1Color = document.getElementsByTagName("h1")[0];
var guess = document.getElementsByClassName("guess")[0];
var resetButton = document.querySelector(".reset");
var mode = document.querySelectorAll(".mode");

var currentArrayMode = 6;
var colors = arrayColorFill(currentArrayMode);
var randomColor;

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for (var i = 0; i < mode.length; i++) {
		mode[i].addEventListener("click",function(){
			mode[0].classList.remove("currentMode");
			mode[1].classList.remove("currentMode");
			this.classList.add("currentMode");
			this.textContent === "Easy" ? currentArrayMode = 3 : currentArrayMode = 6;
			reset();
		});
	}
}

function setupSquares(){
	display.textContent = randomColor;
	squares.forEach(function(square,index){
		square.addEventListener("click",function(){
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === randomColor) {
				guess.textContent = "Correct!"
				resetButton.innerHTML = "Play Again?"
				changeColors(randomColor)	
			}
			else{
				square.classList.add("wrongGuess");
				guess.textContent = "Try Again"
			}
		})
	});
}
function reset(){
	colors = arrayColorFill(currentArrayMode);
	randomColor = randColorSelect()
	squares.forEach(function(square,index){
		if (colors[index]) {
			square.style.display = "block";
			square.style["background-color"] = colors[index];
		}
		else {
			square.style.display = "none";
		}
		square.classList.remove("wrongGuess");
	});
	display.textContent = randomColor;
	h1Color.style.backgroundColor = "steelblue";
	resetButton.innerHTML = "New Colors"
	guess.textContent = "";
}


function changeColors(color){
	h1Color.style["background-color"] = randomColor;
	squares.forEach(function(square){
		square.style.backgroundColor = color;
		square.classList.remove("wrongGuess");
	});
}

function randColorSelect(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function arrayColorFill(arrayItemLength){
	var randomArrayColors = []
		for (var i = 0; i < arrayItemLength; i++) {
			randomArrayColors.push(generateColor());
		}
	return randomArrayColors;
}

function generateColor(){
	var r = Math.floor(Math.random() *256);
	var g = Math.floor(Math.random() *256);
	var b = Math.floor(Math.random() *256);
	return "rgb(" + r + ", " + g + ", " + b +")";
}

resetButton.addEventListener("click",function(){
	reset();
})