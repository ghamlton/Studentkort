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
    // Kontrollera formulärets obligatoriska fält

    //Rensa felmeddelanden från array och ul-list
    errors = [];
    errorList.innerHTML = "";

    if (fullnameInput.value === ""){
        errors.push("Skriv förnamn och efternamn");
    }
    if (emailInput.value === ""){
        errors.push("Skriv in din mejladress")
    }
    if (phoneInput.value === ""){
        errors.push("Skriv in ditt telefonnummer");
    }
    
    // Visa eventuella felmeddelanden

    // Returnera resultatet (true eller false) av valideringen
    if(errors.length > 0){
        displayErrors();
    }
    else{
        return true;
    }
}


/**
 * Visar felmeddelanden på sidan.
 */
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


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret

    let name = fullnameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;
    let font = fontSelect.value;

    // Uppdatera studentkortet

    previewFullname.textContent = name;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;

    //Ändrar fonten av all inmatad data beroende på font-val i formuläret

    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;

    // Lägg till studentkortet i historiken
    let studentCard = {
        fullName: fullnameInput.value,
        eMail: emailInput.value,
        phoneNum: phoneInput.value,
        fontFam: fontSelect.value
    };

    history.push(studentCard);

    // Spara och uppdatera historiken
    //Använder färdiga funktioner så koden blir renare och snyggare
    saveHistory();
    loadHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("historik", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    let historik = JSON.parse(localStorage.getItem("historik"));
    history = historik;
    // Uppdatera history
    renderHistory(history);
}


/**
 * Visar historiken på sidan.
 */
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
        name.textContent = studentCard.fullName;
        email.textContent = studentCard.eMail;
        phone.textContent = studentCard.phoneNum;
        font.textContent = studentCard.fontFam;

        //Lägger till alla <p> element i <article>
        article.appendChild(name);
        article.appendChild(email);
        article.appendChild(phone);
        article.appendChild(font);

        //Till slut läggs själva <article> in i #history div
        historySection.appendChild(article);
    }
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    errors = [];
    errorList.innerHTML = "";
    form.reset();
    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.clear();
    // Uppdatera history och visningen på sidan
    history = [];
    historySection.innerHTML = "";
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", function(event){
    event.preventDefault();
    validateForm();

    //Om valideringen inte finner några fel exekveras funktionen som skapar studentkort
    if(validateForm(true)){
        createStudentCard();
    }
});
// - skapa studentkort om valideringen lyckas

// När användaren klickar på "Rensa"
clearButton.addEventListener('click', clearForm);


// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);


// När sidan laddas:
// - läs in och visa eventuell tidigare historik