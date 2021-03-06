// chiedo all'utente la difficoltà (magari con un bottone? in tal caso dovrò impostare un reset prima della creazione della nuova griglia)
// in base alla difficoltà scelta genero griglia quadrata con ogni cella un numero in un range
// quando l'utente clicca sulla casella (addEventListener) si colora di azzurro

//strumenti

//3 bottoni con event listener per far scegliere la difficoltà e scegliere quale ciclo innescare
//3 cicli uno per difficoltà vincolati all if - bottone cliccato per generare la griglia con innerHTML, append o insertAdjacentHTML, dovrebbero funzionare tutti e 3
//essendo 3 cicli uguali farò una funzione
//per i numeri delle celle scriverò dentro alla cella stessa l'i del ciclo nel processo di generazione
//eventListener (click, ) nelle celle per colorarle con il click

// comincio con i 3 bottoni di generazione della griglia
// ok li ho creati in HTML
const hardN = 49;
const mediumN = 81;
const easyN = 100;
let counter = 0;

//questa variabile l'ho aggiunta per semplificarmi la vita con la creazione delle bombe, in base al click prende un valore di quelli sopra
var cellN;

//array vuoto dove andranno i numeri casuali delle bombe
let bombs = [];

// dò costante alla cella
const cell = document.getElementsByClassName("cell");

// l'event listener  per qualche strano motivo non mi prende gli argomenti e/o non accetta la funzione, provo con return true e if sotto
//non funziona, probabilmente con il prompt mi semplificherei la vita di molto

//sbagliavo qualcosa nella sintassi, ora inserendo la funzione così me la prende (grazie Fabiola)

document.getElementById("buttOne").addEventListener("click", function() {
    counter = 0;
    document.getElementById("result").classList.add("hidden")
    var cellN = easyN;
    generateBombs(cellN);
    generateGrid("easy", cellN);
    clicker();
    
    // gridAndBombs ("easy", cellN);
}); 

document.getElementById("buttTwo").addEventListener("click", function() {
    var cellN = mediumN;

    counter = 0;
    document.getElementById("result").classList.add("hidden")
    var cellN = mediumN;
    generateBombs(cellN);
    generateGrid("medium", cellN);
    clicker();
    // generateGrid("medium", cellN);
    // generateBombs(cellN);
}); 


document.getElementById("buttThree").addEventListener("click", function () {
    var cellN = hardN;

    counter = 0;
    document.getElementById("result").classList.add("hidden")
    var cellN = hardN;
    generateBombs(cellN);
    generateGrid("hard", cellN);
    clicker();
    // generateGrid("hard", cellN);
    // generateBombs(cellN);
}); 



//ora creo funzione, prima funzione normale poi se funziona inserisco anche reset

//ho dovuto cambiare il metodo di inserimento nella DOM, invece di creare tutto il blocco inserisco l'elemento div come ha fatto vedere fabio a lezione, innerHTML per i numeri dentro (dati da i) il if contains serve per non aggiungere infinite volte la classe (in realtà non so se senza quello me la aggiunge una sola volta, non ho provato) (ok, ho provato, è completamente non necessario perché non duplica le classi già da solo XD )


//AGGIUNTO RESET!!!
//document.querySelector(".container").innerHTML = "";

//avrebbe senso scomporre la mega funzione enorme qua sotto in più funzioni (ad esempio una per clicked e una per il reset), ma sono le 18:30 e c'era la masterclass e io mi ero scordato

/**
 * Funzione che serve a generare una griglia con un click con un numero variabile di celle all'interno di un container, aggiunge anche la possibilità di clickare la casella e aggiungere una classe click. Inizia con un reset.
 * @param {string} difficulty qua mettiamo la difficoltà (che sarà una classe)
 * @param {number} cellN qua mettiamo il numero di celle (che dipenderà dalla difficoltà)
 */
function generateGrid(difficulty, cellN) {
    console.log(difficulty, cellN);
    document.querySelector(".container").innerHTML = "";
    for (let i = 1; i <= cellN; i++) {
        
        let gridCell = document.createElement("div");
        gridCell.className = `cell ${difficulty}`;
        gridCell.innerHTML = i;
        let cellNumber = parseInt(i);
        document.querySelector(".container").insertAdjacentElement("beforeend", gridCell);
        // gridCell.addEventListener("click", function(){
        //     //questo pensavo servisse per evitare di aggiungere infinite volte la classe ma fa da solo
        //     if (gridCell.classList.contains("clicked")) {

        //     } else 
        //     {
        //         this.classList.add("clicked")
        //     }
            // boom(cellNumber);
        // })
    }
}



// ho riscontrato problemi a inserire la funzione nell'event listener (non mi prende i parametri), ora provo a mettere gli if: 

// function generateGrid (easy, easyN);

// SONO STATO PIù DI UN'ORA BLOCCATO PERCHé IL DEBUGGER MI DICEVA CHE MANCAVA UNA GRAFFA E INVECE AVEVO SCRITTO MALE L'ADJACENT HTML

//ora provo a inserire il ciclo for testato nell'event listener tramite la funzione
    // for (let i = 1; i < easyN + 1; i++) {
    //     document.querySelector(".container").insertAdjacentHTML("beforeend", `<div class= "cell ${easy}">${i}</div>`);
    // }

    // if (easy) generateGrid(easy, easyN);

// let gridCell = document.getElementsByClassName("cell");  

// coloro di blu la cella dandogli la classe clicked
//il primo if mi serve per non mettere infinite classi .clicked per infiniti click
// gridCell.addEventListener("click", function(){
//     if (this.className.contains("clicked")) {

//     } else {this.classList.addClass("clicked")
// }
// })

//me lo esegue prima che la griglia sia generata, quindi mi dà errore. lo devo inserire sopra


//ora creo funzione di reset

// function reset () {
//     document.querySelector(".container").innerHTML = "";
// }


// genera 16 numeri casuali dove mettere una bomba, assegnali alle caselle generate
// se utente clicca una bomba gioco finisce (perso), se finisce le non bombe il gioco finisce (vinto)
//in ogni caso il software mostra tutte le bombe

//comincio dal generatore di numeri casuali


/**
 * Funzione presa da w3school per generare numero random da min a max inclusi
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
 function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }



//ora creo ciclo per farlo 16 volte


// while (bombs.length < 16) {
//     const bomb = getRndInteger(1, 81);
//     bombs.push(bomb);
//     console.log(bombs);
//     }

// fatto ciclo ma devo inserire if per evitare doppioni

// while (bombs.length < 16) {
//     const bomb = getRndInteger(1, cellN);
//     if (!bombs.includes(bomb)) {
//         bombs.push(bomb);
//     }
//     }

// console.log(bombs);

//ciclo fatto, dovrò renderlo una funzione e lo dovrò inserire nell'event listener dei bottoni e devo capire come "nestare" le funzioni
//creato variabile cellN (prende valore in base al click)


/**
 * Funzione che genera 16 numeri casuali in un range di numeri da 1 a cellN, poi aggiunge la classe 
 * @param {*} cellN max del range
 */
function generateBombs (max) {
    bombs = [];
    while (bombs.length < 16) {
        const bomb = getRndInteger(1, max);
        console.log(bombs);
        if (!bombs.includes(bomb)) {
            bombs.push(parseInt(bomb));
        }
        }
    console.log(bombs);
    // if (gridCell.id == bomb){
    //     gridCell.classList.add("bomb");
    // }
}

// function resetBombs () {
//     var bombs = [];
// }

//ok, inserito reset anche per l'array delle bombe, ora devo dargli l'effetto (classe bomb da css ad esempio)
// per il fine partita ci penso dopo
// let gridCell;

// function gridAndBombs (difficulty, cellN){
//         console.log(difficulty, cellN);
//         document.querySelector(".container").innerHTML = "";
//         for (let i = 1; i <= cellN; i++) {
            
//             let gridCell = document.createElement("div");
//             gridCell.className = `cell ${difficulty}`;
//             gridCell.innerHTML = i;
//             gridCell.id = i;
//             document.querySelector(".container").insertAdjacentElement("beforeend", gridCell);
//             generateBombs(cellN);
//             gridCell.addEventListener("click", function(){
//                 //questo pensavo servisse per evitare di aggiungere infinite volte la classe ma fa da solo
//                 if (gridCell.classList.contains("clicked")) {
    
//                 } else 
//                 {
//                     this.classList.add("clicked")
//                 }
//             })
        
//         }
//     }

// la concatenazione delle funzioni non mi funziona, mi dà gridCell undefined, quindi provo in un altro modo
// function boom (element) {
//     const cellNumber = parseInt(element.innerText);
//     if (bombs.includes(cellNumber)) {
//         console.log("bomb");
//         element.classList.add("bomb");
//     } else {
//         console.log("go");
//     }
// }

function isBomb(cellNumber) {
    return bombs.includes(cellNumber);
}

// ho difficoltà a mettere tutto insieme nell'event listener se metto l'event listener nella generazione della griglia, provo a scorporarlo e inserirlo successivamente



// function clicker (){
//     gridCell.addEventListener("click", function(){
//         //questo pensavo servisse per evitare di aggiungere infinite volte la classe ma fa da solo
//         // if (gridCell.classList.contains("clicked")) {
    
//         // } else 
//         {
//             this.classList.add("clicked")
//         }


// }


// function clicker () {
//     cell.addEventListenerner("click", function() {
//         this.classList.add("clicked")
//     }
//     )
// }

// non funziona perché sono tante celle e quindi mi serve un ciclo per darlo ad ognuna

//ok, il clicker per la classe clicked funziona, ora devo inserire "boom"

function clicker () {
    console.log(bombs);
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i <= cells.length; i++) {
        let element = cells[i];
        const cellNumber = parseInt(element.innerText);
        // console.log(element);
        // element.addEventListener("click", function() {
        //     this.classList.add("clicked");
        //     console.log(bombs);
        //     boom(this);
        //     console.log(cellNumber);
        // })
        if (isBomb(cellNumber)) {
            element.classList.add("mine");       
        }

        element.addEventListener("click", function() {
            //questo if serve per evitare conteggi multipli per click sulla stessa cella
            if (!this.classList.contains("clicked")) {
                counter++;
                this.classList.add("clicked");         
            }
            
            if(isBomb(cellNumber)) {
                endLose ();
            } else {
                if (cell.length - counter == 16) {
                    endWin ();
                }
            } 
        })
    }
}

/**
 * restituisce set di azioni sconfitta
 */
function endLose(cells) {
    var cells = document.querySelectorAll('.cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.add('end');
    }
    document.getElementById("result").classList.add("lose");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").innerHTML = `HAI PERSO, il tuo punteggio è ${counter - 1}`;
    cells.forEach(cell => {

        //probabilmente per rimuovere l'event listener dovrei mettere la funzione a parte ed evocarla nell'event listener, invece di farla così
        
        cell.removeEventListener("click", function() {
            //questo if serve per evitare conteggi multipli per click sulla stessa cella
            if (!this.classList.contains("clicked")) {
                counter++;
                this.classList.add("clicked");         
            }
            
            if(isBomb(cellNumber)) {
                endLose ();
            } else {
                if (cell.length - counter == 16) {
                    endWin ();
                }
            } 
        })
    })
}

function endWin() {
    var cells = document.querySelectorAll('.cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.add('end');
    }
    document.getElementById("result").classList.add("win");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").innerHTML = `HAI VINTO!!!`;
}