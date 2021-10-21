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

//questa variabile l'ho aggiunta per semplificarmi la vita con la creazione delle bombe, in base al click prende un valore di quelli sopra
var cellN;

//array vuoto dove andranno i numeri casuali delle bombe
var bombs = [];

// l'event listener  per qualche strano motivo non mi prende gli argomenti e/o non accetta la funzione, provo con return true e if sotto
//non funziona, probabilmente con il prompt mi semplificherei la vita di molto

//sbagliavo qualcosa nella sintassi, ora inserendo la funzione così me la prende (grazie Fabiola)

document.getElementById("buttOne").addEventListener("click", function() {
    var cellN = easyN;
    generateGrid("easy", cellN);
    generateBombs(cellN);
}); 

document.getElementById("buttTwo").addEventListener("click", function() {
    var cellN = mediumN;
    generateGrid("medium", cellN);
    generateBombs(cellN);
}); 


document.getElementById("buttThree").addEventListener("click", function () {
    var cellN = hardN;
    generateGrid("hard", cellN);
    generateBombs(cellN);
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
        document.querySelector(".container").insertAdjacentElement("beforeend", gridCell);
        gridCell.addEventListener("click", function(){
            //questo pensavo servisse per evitare di aggiungere infinite volte la classe ma fa da solo
            if (gridCell.classList.contains("clicked")) {

            } else 
            {
                this.classList.add("clicked")
            }
        })
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
 * Funzione che genera 16 numeri casuali in un range di numeri da 1 a cellN
 * @param {*} cellN max del range
 */
function generateBombs (max) {
    var bombs = [];
    while (bombs.length < 16) {
        const bomb = getRndInteger(1, max);
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
        }
    console.log(bombs);
}

// function resetBombs () {
//     var bombs = [];
// }

//ok, inserito reset anche per l'array delle bombe, ora devo dargli l'effetto (classe bomb da css ad esempio)
// per il fine partita ci penso dopo