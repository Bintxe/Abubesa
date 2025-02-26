//Global variables
var descHong = ["RAVEN", "HONG", "56", "[REDACTED]","<p>Todos los lugareños de los alrededores del lago Kivu saben quién es la ermitaña del bosque, pero nadie la conoce realmente.</p><p>Maestra de artes marciales y experta en supervivencia, Raven Hong se enfrenta a cualquier guerrilla o ejército en solitario con tal de defender a su gente sin importar lo despiadados y crueles que puedan ser.</p><p>Las reminiscencias de su pasado le recuerdan a diario que ella no fue tan diferente a las personas contra las que lucha.</p>"];
var descMagambo = ["", "MAGAMBO", "??", "aaaaaa", "<p>blablabla</p>"];
var descEbba = ["", "EBBA", "??", "aaaaaa","<p>blebleble</p>"];
var descThulani = ["", "THULANI", "??", "aaaaaa","<p>bliblibli</p>"];
var descAsh = ["", "ASH", "??", "aaaaaa","<p>blobloblo</p>"];
var descViktor = ["", "VIKTOR", "??", "aaaaaa","blublublublu"];



//Functions
function selectCharacter(button){
    let characterBox = document.getElementById("character-box");

    //Return if the button of the currently displayed character is pressed
    if(characterBox.dataset.character == button.dataset.character)
    {
        return;
    }

    let charContent = characterBox.getElementsByClassName("inside-paragraph")[0];
    let charImage = characterBox.getElementsByClassName("main-image")[0];

    /*
    let charTitle = document.createElement("h1");
    charTitle.innerHTML = button.dataset.character;*/

    charContent.classList.add("invisible");
    charImage.classList.add("invisible");

    characterBox.dataset.character = button.dataset.character;

    let charName = charContent.getElementsByClassName("char-name")[0];
    let charSurame = charContent.getElementsByClassName("char-surname")[0];
    let charAge = charContent.getElementsByClassName("char-age")[0];
    let charNation = charContent.getElementsByClassName("char-nationality")[0];
    let charDesc = charContent.getElementsByClassName("char-description")[0];

    this.setTimeout(function(){
        switch(button.dataset.character){
            case "Hong":
                charName.innerHTML = descHong[0];
                charSurame.innerHTML = descHong[1];
                charAge.innerHTML = descHong[2];
                charNation.innerHTML = descHong[3];
                charDesc.innerHTML = descHong[4];
                charImage.src="./img/Hong/Characters/Hong.png";
                break;
            case "Magambo":
                charName.innerHTML = descMagambo[0];
                charSurame.innerHTML = descMagambo[1];
                charAge.innerHTML = descMagambo[2];
                charNation.innerHTML = descMagambo[3];
                charDesc.innerHTML = descMagambo[4];
                charImage.src="./img/Hong/Characters/Magambo.png";
                break;
            case "Ebba":
                charName.innerHTML = descEbba[0];
                charSurame.innerHTML = descEbba[1];
                charAge.innerHTML = descEbba[2];
                charNation.innerHTML = descEbba[3];
                charDesc.innerHTML = descEbba[4];
                charImage.src="./img/Hong/Characters/Ebba.png";
                break;
            case "Thulani":
                charName.innerHTML = descThulani[0];
                charSurame.innerHTML = descThulani[1];
                charAge.innerHTML = descThulani[2];
                charNation.innerHTML = descThulani[3];
                charDesc.innerHTML = descThulani[4];
                charImage.src="./img/Hong/Characters/Thulani.png";
                break;
            case "Ash":
                charName.innerHTML = descAsh[0];
                charSurame.innerHTML = descAsh[1];
                charAge.innerHTML = descAsh[2];
                charNation.innerHTML = descAsh[3];
                charDesc.innerHTML = descAsh[4];
                charImage.src="./img/Hong/Characters/Ash.png";
                break;
            case "Viktor":
                charName.innerHTML =
                charSurame.innerHTML =
                charAge.innerHTML =
                charNation.innerHTML =
                charDesc.innerHTML =
                charImage.src="./img/Hong/Characters/Viktor.png";
                break;
        }
    
        //charContent.insertBefore(charTitle, charDescription.firstChild);

        charContent.classList.remove("invisible");
        charImage.classList.remove("invisible");
    }, 200);

    let buttons = document.getElementById("char-selection").children;
    for(let i=0; i<buttons.length; i++)
    {
        if(buttons[i] != button){
            buttons[i].classList.remove("selected");
        }else if(!buttons[i].classList.contains("selected")){
            buttons[i].classList.add("selected");
        }
    }
    
}


//Main execution cycle
