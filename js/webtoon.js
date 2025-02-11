//Global variables
var language = "es";

var gallery = document.getElementById("webtoon-box");
var webtoonImages = gallery.children;

var continueLoad = true;
var endLoad = false;

var img;
var galleryIndex = 1;

//Functions
function LoadWebtoonImage() {
    
    if (endLoad) {
        clearInterval(myInterval);
        return;
    }

    if (continueLoad) {

        continueLoad = false;

        if(galleryIndex <= webtoonImages.length){
            img = webtoonImages[galleryIndex-1];
        }else{
            img = new Image();
        }
        img.onload = OnImageExists;
        img.onerror = OnImageError;
        img.src = '../img/Hong/Webtoon/'+ language + '/Hong-Episodio1_' +  String(galleryIndex).padStart(3,0) + '.png';
    }

}

function OnImageExists() {
    gallery.appendChild(img);
    galleryIndex++;
    continueLoad = true;
}

function OnImageError() {
    endLoad = true;
}

function ChangeLanguage(btn){
    let sel = btn.dataset.language;

    if(language === sel) return;

    switch(sel){
        case "es":
        case "en":
            language = sel;
            let allFlags = document.getElementsByClassName("menu-flag");
            for(let i=0; i<allFlags.length; i++){
                if(allFlags[i].dataset.language != sel){
                    allFlags[i].classList.add("greyed");
                }        
            }
            btn.classList.remove("greyed");
            break;
    }
}


//Main execution cycle
let myInterval = setInterval(() => {LoadWebtoonImage(myInterval);}, 1);

window.onload = (event) =>
{
    window.addEventListener('scroll', () => {updateNavbarOnScroll()});


}