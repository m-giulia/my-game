//let arrayNumero = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];

let arrayNumero = [...Array(17).keys()].slice(1);
let container = document.querySelector(".container");
let titolo = document.createElement("h1");
var tema = document.getElementById("tema");



function togglePausa() {
    if (tema.paused) {
        tema.play();
        document.querySelector(".pausa").src = "./images/pause.svg";
    } else {
        tema.pause();
        document.querySelector(".pausa").src = "./images/play.svg";
    }
  //return tema.paused ? tema.play() : tema.pause();
  //return finito.paused ? finito.play() : finito.pause();
};



function start() {
    let ready = document.querySelector(".ready");
    titolo.style.opacity = 1;
    ready.style.display = "none";
    tema.play();
    tema.volume = 0.1;
    iniziaGioco();
    
}



function iniziaGioco(){
    let quanteVolte = 0;
    arrayNumero.sort(() => Math.floor(Math.random() * 2) - 1);
    
    arrayNumero.forEach((numCarta,index) => {
        let divContCarta = document.createElement("div");

        divContCarta.style.animationDelay = "0." + numCarta + "s";

        let div = document.createElement("div");
        let divDavanti = document.createElement("div");
        let divDietro = document.createElement("div");
        let img = document.createElement("img");
        let imgRetro = document.createElement("img");
        titolo.innerHTML = "ME MO RY";
        imgRetro.src = "./images/0.png";
        img.className = "retro";

        if (quanteVolte == 8) {
            container.append(titolo);
            //console.log(quanteVolte);
        }

        if (parseInt(numCarta) <= 8) {
            img.className = "image-" + numCarta;
            img.src = "./images/" + numCarta + ".png";
            //console.log(numCarta);
        }
        else { 
            img.className = "image-" + (numCarta - 8);
            img.src = "./images/" + (numCarta - 8) + ".png";
            console.log(numCarta);
            console.log(numCarta - 8);
        }

        divContCarta.className = "contenitore-carta";
        div.className = "carta-" + numCarta + " coperta";
        divDavanti.className = "davanti";
        divDietro.className = "dietro";
        div.style.background = "";
        div.onclick = function(){giraCarte(numCarta)};
        
        //container.append(divContCarta);
        divContCarta.append(div);
        div.append(divDavanti);
        div.append(divDietro);
        divDavanti.append(img);
        divDietro.append(imgRetro);
        
        container.append(divContCarta);
        //console.log(divContCarta);
        
        quanteVolte++;
        //console.log(divContCarta);
    });
}


function giraCarte(numCarta) {
    let div = document.querySelector("div.carta-" + numCarta);
    let carta = document.querySelector("img.image-" + numCarta);
    
    // console.log(div);
    

    if (div.classList.contains('coperta')) {
        scopri.pause();
        scopri.play();
        scopri.volume = 0.5;
        div.classList.add('scoperta');
        div.classList.remove("coperta");
    } else {
    }
    
    
    let carteGirate = document.querySelectorAll(".scoperta .davanti img");
    if (carteGirate.length === 2) {
        if (carteGirate[0].className.toString() == carteGirate[1].className.toString()) {
            function suona() {
                corrette.play();
                corrette.volume = 0.5;
            }
            setTimeout(suona, 200);
            
            function pausa() {corrette.pause();}
            setTimeout(pausa, 1000);
        }
        setTimeout(controllaSeGirate, 700, carteGirate, div);
        //controllaSeGirate(carteGirate, div);
        //console.log(carteGirate[0].className.toString());
        //console.log(carteGirate[1].className.toString());
    }
}

function controllaSeGirate(carteGirate, div) {

    carteGirate.forEach((scoperta,indice) => {

        if (carteGirate[0].className.toString() == carteGirate[1].className.toString()) {
            
            scoperta.parentElement.parentElement.classList.add("corretta");
            scoperta.parentElement.parentElement.classList.remove("scoperta");
            scoperta.parentElement.parentElement.onclick = "";
            //console.log(carteGirate[0]);
            //console.log(carteGirate[1]);
        }
        else {
            scoperta.parentElement.parentElement.classList.remove("scoperta");
            scoperta.parentElement.parentElement.classList.add("coperta");
            copri.play();
            copri.volume = 0.5;
            setTimeout(()=>{copri.pause(); },500);
            
            //var classi = carteGirate[indice].className.toString();
            //setTimeout(()=>{scoperta.parentElement.parentElement.classList.add("coperta"); },1000);
        }
        //console.log(classi);
        tuttoCorretto();
    });
}
function tuttoCorretto() {

    let carteCorrette = document.querySelectorAll(".corretta");
    console.log(carteCorrette.length);

    if (carteCorrette.length == 16) { 
        tema.pause();
        finito.play();
        finito.volume = 0.1;
        console.log("finito");
        console.log(carteCorrette.length);
        titolo.className = "win";
        document.body.className = "win";
        titolo.innerHTML = "YOU WON!";
    }
}
 
//  ***** PROBLEMI *****
//  se vado troppo veloce a scoprire le carte se impalla e se girano tutte
