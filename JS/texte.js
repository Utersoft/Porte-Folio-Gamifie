/*eslint-env es6*/
/*eslint-disable no-console*/
/*global document*/

const F_SPEED = 200;
const N_DAY = 5;
const S_SECONDPASSAGE = "Second passage";



//Initialisation du tableau contenant le dialogue d'intro
function initTab() {
    
    let introTab = [
        ["Oh", "non!", "Stéphane", "n\'arrive", "plus", "à se", "souvenir", "de ses", "projets!"],
        ["Il", "faut", "l\'aider!"],
        ["Vous!"],
        ["Vous", "pouvez", "le faire!", "Pénétrez", "dans les", "bribes", "de sa", "mémoire", "et", "restaurez", "la!"],
        ["Et ensemble,", "vous", "pourrez", "(re)découvrir", "ses", "créations."]
    ];
    
    return introTab;
}

function initTabIndexText() {
    let indexText = "Ici, vous pouvez rejoindre les souvenirs perdus et aider ce jeune homme à ce souvenir de ses projets. /Il vous suffit de cliquer sur sa tête pour y accéder. /Vous devrez alors réussir les épreuves qui seront sur votre chemin pour retrouver ce qui a été perdu. /Ne vous découragez pas et bonne chance à vous !"
    
    return indexText;
}


//affichage du tableau de string initialisé dans la fonction initTab
function affichTab() {
    var introTab = initTab();
    
    let n_i = 4;
    const textContainer = createBalise(document.getElementById("intro"), "div", "id", "textIntro", n_i);
    var pCreate;
        
    //Avec cette boucle on ajoute des containers <p></p> en html après un certain temps * n_i
    introTab.forEach(element => {
        pCreate = createBaliseB(textContainer, "p", n_i);
        appendChildTimeOut(pCreate, textContainer, n_i);
        //Avec celle-ci on a affiche chaque élément du tableau après un certain temps * n_i
        element.forEach(textElement => { 
            affichTextTimeout(textElement, pCreate, n_i);
            n_i++;
        });
        n_i += 3;
    });
    
    return n_i;
}


//création du container du div d'acceptation
function createIntroAccept() {
    var textAccept = "Allez-vous l'aider ?";
    
    
    let n_i = affichTab();
    
    const bodyVar = document.getElementById("pageContainer");
    const acceptDiv = createBalise(bodyVar, "div", "id", "acceptContainer", n_i);
    const textP = createBaliseB(acceptDiv, "p", n_i);
    
    textAccept = textAccept.split(" ");
    textAccept.forEach(text => {
        affichTextTimeout(text, textP, n_i);
        n_i++;
    });
    return n_i;
}

//Crée le bouton et le place dans le div ou se trouve le message du div acceptContainer
function createButton(n_i, element) {
    const buttonAccept = createBalise(element, "button", "id", "acceptButton", n_i);
    buttonAccept.setAttribute("value", "Accepter");
    buttonAccept.setAttribute("OnClick", "buttonRefresh()");
    buttonAccept.innerHTML = "Accepter";
}

//Affichage de l'intro
function affichIntro() {
    let n_i = createIntroAccept();
    
    n_i += 3;
    
    setTimeout(function(){ 
        const acceptDiv = document.getElementById("acceptContainer");
        createButton(0, acceptDiv);
    }, n_i * F_SPEED);
}

//Permet ajouter du texte dans les nouvelles balises <p>
function appendText(addedText, textContainer) {
    textContainer.append(addedText + " ");
}

//Permet de faire un timeout d'un certain temps entre chaque ajout de balise dans le div
function appendChildTimeOut(childContainer, parentContainer, n_i){
    setTimeout(function(){ parentContainer.appendChild(childContainer)}, n_i * F_SPEED);
}

//Permet d'afficher le texte après un certains temps sur la page
function affichTextTimeout(addedText, textContainer, n_i){
    setTimeout(appendText, n_i * F_SPEED, addedText, textContainer);
}

//Création cookie
function setCookie(secondPassage){
    const date = new Date();
    //date.setTime(date.getTime() + (N_DAY * 24 * 60 * 1000));
    date.setTime(date.getTime() + (10000));
    let expires = "expires=" + date.toUTCString;
    document.cookie = S_SECONDPASSAGE + "=" + secondPassage + ";" + expires + ";path=/";
}

//Récupération de la valeur de secondPassage (true or empty)
function getCookie(){
    let value = S_SECONDPASSAGE + "=";
    let splitCookie = document.cookie.split(";");
    for(let n_i = 0; n_i < splitCookie.length; n_i++){
        let caracter = splitCookie[n_i];
        while(caracter.charAt(0) == " "){
            caracter = caracter.substring(1);
        }
        if(caracter.indexOf(value) == 0){
            return caracter.substring(value.length, caracter.length);
        }
    }
    return false;
}

//On vérifie si les cookies ont été set et si oui on affiche un alert de retour
function checkCookie(){
    let alreadyClick = getCookie();
    if(alreadyClick != ""){
        alert("Tu es de retour pour m'aider :D");
    }
}

//Refresh la page après avoir cliqué sur le bouton est affiché true
function buttonRefresh(){
    setCookie(true);
    
    location.reload();
}

//On vérifie que l'utilisateur ne se soit pas déjà connecté
function firstPassageOrNot(){
    if(getCookie() == "true"){
        resetPage();
        createPageSelection();
    }else{
        affichIntro();
    }
    //affichIntro();
}

//On remet la page à zero
function resetPage(){
    document.body.innerHTML = "";
}

function createBalise(parent, baliseType, attributeName, attibuteValue, n_i){
    let baliseCreate = document.createElement(baliseType);
    baliseCreate.setAttribute(attributeName, attibuteValue);
    if(n_i == 0){
        parent.appendChild(baliseCreate);
    }else{
        appendChildTimeOut(baliseCreate, parent, n_i);
    }
    
    return baliseCreate;
}

function createBaliseB(parent, baliseType, n_i){
    let baliseCreate = document.createElement(baliseType);
    if(n_i == 0){
        parent.appendChild(baliseCreate);
    }else{
        appendChildTimeOut(baliseCreate, parent, n_i);
    }
    
    return baliseCreate;
}

//Création de la page principale
//On ajoute tout en différé pour éviter qu'en implémentant de nouvelle balise/contenue, il tombe sur un objet inexistant
function createPageSelection(){
    let n_i = 4;
    
    const divSelect = createBalise(document.body, "div", "id", "pageSelect", 0);
    
    const indexTitleContainer = createBalise(divSelect, "div", "id", "indexTitleContainer", 0);
    const indexTitle = createBalise(indexTitleContainer, "h1", "id", "indexTitle", 0);
    indexTitle.innerHTML = "Bienvenue à Porte Folia";
    
    const indexTextContainer = createBalise(divSelect, "div", "id", "indexTextContainer", n_i);
    const indexTextP = createBaliseB(indexTextContainer, "p", n_i);
    
    let tab = initTabIndexText().split(" ");
    
    tab.forEach(text => {
        if(text.charAt(0) == "/"){
            n_i += 3;
            appendChildTimeOut(document.createElement("br"), indexTextP, n_i);
            appendChildTimeOut(document.createElement("br"), indexTextP, n_i);
            appendChildTimeOut(document.createElement("br"), indexTextP, n_i);
            affichTextTimeout(text.substring(1, text.length), indexTextP, n_i);
        }else{
            affichTextTimeout(text, indexTextP, n_i);
            n_i++;
        }
    });
    
    n_i += 3;
    
    const imageContainer = createBalise(divSelect, "div", "id", "imageContainer", n_i);
    
    const imageLink = createBalise(imageContainer, "a", "href", "html/levelSelect.html", n_i);
    
    const img = createBalise(imageLink, "img", "src", "Images/teteB.png", n_i);
    img.setAttribute("id", "image");
}