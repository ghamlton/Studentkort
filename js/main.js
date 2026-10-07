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
    localStorage.setItem("historik", JSON.stringify(history));
    

    


}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
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

    // Uppdatera history och visningen på sidan
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


// När sidan laddas:
// - läs in och visa eventuell tidigare historik