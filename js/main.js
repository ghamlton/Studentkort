"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Gabriel Hamilton
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {

    //Rensa felmeddelanden från array och ul-list
    errors = [];
    errorList.innerHTML = "";

    //Kollar om input-fälten innehåller någonting, och baserat på resultat skriver ut felmeddelande eller ej
    if (fullnameInput.value.trim() === ""){
        errors.push("Skriv förnamn och efternamn");
    }
    if (emailInput.value.trim() === ""){
        errors.push("Skriv in din mejladress")
    }
    if (phoneInput.value.trim() === ""){
        errors.push("Skriv in ditt telefonnummer");
    }

    //Kollar om errors[] innehåller någonting (felmeddelanden)
    //Om errors[] innehåller någonting så kör den displayErrors() nedanför
    //Annars returnerar den bara true
    if(errors.length > 0){
        displayErrors();
    }
    else{
        return true; // Vid return true så kommer createStudentCard() att köras (se eventListener längst ner)
    }
}

//Visar felmeddelanden på sidan i form av en ul-list
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";
    // Skriv ut aktuella felmeddelanden till DOM
    for(let i = 0; i < errors.length; i++){
        let listitem = document.createElement("li");
        listitem.textContent = errors[i];
        errorList.appendChild(listitem);
    }
}

//Skapar studentkort som lagras i localStorage, array och visas i historiken på hemsidan
function createStudentCard() {

    //Hämtar information från formuläret och lägger in det i variabler. De används sedan för att skapa ett objekt som läggs in i history[]
    let name = fullnameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;
    let font = fontSelect.value;

    //Uppdaterar själva "preview"-kortet på hemsidan ovanför formuläret

    previewFullname.textContent = fullnameInput.value;
    previewEmail.textContent = emailInput.value;
    previewPhone.textContent = phoneInput.value;

    //Ändrar fonten av all inmatad data beroende på font-val i formuläret
    //Detta ser man i "preview" ovanför formuläret

    previewFullname.style.fontFamily = fontSelect.value;
    previewEmail.style.fontFamily = fontSelect.value;
    previewPhone.style.fontFamily = fontSelect.value;

    //Skapar objekt studentCard som innehåller all information för skapande av studentkort på hemsidan
    let studentCard = {
        fullName: name,
        eMail: email,
        phoneNum: phone,
        fontFam: font
    };

    //Lägger till ett objekt studentCard i history[] i slutet av arrayen
    history.push(studentCard);

    //Använder färdiga funktioner så koden blir renare och snyggare
    saveHistory();
    loadHistory();
}

//Sparar historiken i localStorage
function saveHistory() {
    //Enkelt sparande i localStorage med nyckel "historik" för att hämta arrayen vid senare tillfällen
    localStorage.setItem("historik", JSON.stringify(history));
}

//Hämtar enbart historik om det finns sparat i localStorage.
function loadHistory() {
    //Försökte att hämta från localStorage utan en if-sats men det gav error, så detta blev lösningen.
    if(localStorage.getItem("historik") !== null){
        let historik = JSON.parse(localStorage.getItem("historik"));
        history = historik;
        renderHistory(history);
    }
}



//Visar historiken på sidan
function renderHistory(history) {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";
    // Skriv ut innehållet i history till DOM
    for(let studentCard of history){

        //Skapar element som utgör ett studentkort i historiken på sidan
        let article = document.createElement("article");
        let name = document.createElement("p");
        let email = document.createElement("p");
        let phone = document.createElement("p");
        let font = document.createElement("p");

        //Style för själva article-elementet
        article.style.backgroundColor = "lightgray";
        article.style.padding = "5px";
        article.style.marginBottom = "10px";
        article.style.boxShadow = "5px 5px 20px";

        //Värdena av properties från objekt studentCard läggs in som textContent in i <p> element som skapats ovan
        name.textContent = "Namn: " + studentCard.fullName;
        email.textContent = "E-post: " + studentCard.eMail;
        phone.textContent = "Telefon: " + studentCard.phoneNum;
        font.textContent = "Font: " + studentCard.fontFam;

        //Lägger till alla <p> element i <article>
        article.appendChild(name);
        article.appendChild(email);
        article.appendChild(phone);
        article.appendChild(font);

        //Till slut läggs själva <article> in i #history div
        //Lägger till style/css så att den nyaste kortet visas överst med flexbox
        historySection.appendChild(article);
        historySection.style.display = "flex";
        historySection.style.flexDirection = "column-reverse";
    }
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    //Återställer "preview"-kortet med ursprunglig text
    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    //Använder också den ursprungliga fonten på texten
    previewFullname.style.fontFamily = "Helvetica";
    previewEmail.style.fontFamily = "Helvetica";
    previewPhone.style.fontFamily = "Helvetica";

    //Återställer formuläret genom att rensa input-fälten och <select>-knappen för font
    form.reset();

    //Arrayen blir tom och tar bort felmeddelanden från hemsidan
    errors = [];
    errorList.innerHTML = "";
}


//Historik tas bort
function deleteHistory() {
    // Raderar sparad historik i localStorage
    localStorage.clear();
    //Arrayen för historik blir tom och all historik på hemsidan rensas
    history = [];
    historySection.innerHTML = "";
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", function(event){
    event.preventDefault();
    validateForm();

    //Om valideringen inte finner några fel (return true) exekveras funktionen som skapar studentkort createStudentCard()
    if(validateForm(true)){
        createStudentCard();
    }
});

// När användaren klickar på "Rensa"-knappen
clearButton.addEventListener('click', clearForm);


// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);

//När sidan laddas körs funktionen loadHistory() som visar historik på hemsidan som är sparad i localStorage
//Detta innebär att man kan ladda om/stänga och öppna hemsidan utan att förlora historik om man skapade studentkort tidigare
window.addEventListener("load", function(){
    loadHistory();
});