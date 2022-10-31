var button = document.getElementById('btn');
var error= document.getElementById('error');
var end = document.getElementById('end');
var table = document.getElementById('table');
var selectedCard = [];
var wait = false;
var errores = 0;
var aciertos = 0;

function startPlay(){
    button.style.display = 'none';
    errores=0;
    aciertos=0;
    let images = img.sort(() => Math.random() - 0.5);
    let cards = [];
    for (let i = 0; i < 16; i++) {
        cards.push(`<div class="cardArea col-3" onclick="chooseCard(${i})">
        <div class="card" id="card${i}">
            <div class="face back" id="back${i}">
            <img src="img/${images[0]}.jpg" alt="${images[0]}">
            </div>
            <div class="face startPosition">
            
            </div>
        </div>
    </div>`);
    if (i % 2 == 1) {
        images.splice(0, 1)
    }
    }
    cards.sort(() => Math.random() - 0.5);
    table.innerHTML = cards.join(" ");
    error.innerHTML = '<h4>Errores: '+ errores + '</h4>';
    end.innerHTML = '';
}

function chooseCard(i) {
    let card = document.getElementById("card" + i)
    if (card.style.transform != "rotateY(180deg)") {
        card.style.transform = "rotateY(180deg)";
        selectedCard.push(i);
    }
    if (selectedCard.length == 2) {
        let cartas= document.getElementsByClassName("cardArea");
        compare(selectedCard);
        selectedCard = [];
    }
}

function compare(selecciones) {
    setTimeout(() => {
        let card1 = document.getElementById("back" + selecciones[0])
        let card2 = document.getElementById("back" + selecciones[1])
        if (card1.innerHTML != card2.innerHTML) {
            errores ++;
            error.innerHTML = '<h4>Errores: '+ errores + '</h4>';
            document.getElementById("card" + selecciones[0]).style.transform = "rotateY(0deg)";
            document.getElementById("card" + selecciones[1]).style.transform = "rotateY(0deg)";
        }else{
            card1.style.background = "green";
            card2.style.background = "green";
            aciertos++;
            if (aciertos == 8){
                end.innerHTML = '<br /> <h3 class="text-success">Felicidades</h3>'
                button.style.transform = "translate (0%, 0%)"
                button.style.display = 'block';
            }
        }
    }, 500);
}