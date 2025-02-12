//Global variables
var language = "es";
var totalImages = 77;

var gallery = document.getElementById("webtoon-box");
var webtoonImages = gallery.children;

var continueLoad = true;
var endLoad = false;

var img;
var galleryIndex = 1;

//Functions
/*
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
*/

function preloadImages()
{
    for(var i = 0; i < totalImages; i++)
    {
        let img = new Image();
        img.src = "../img/DummyImage.png";
        img.width = 800;
        img.height = 1280;

        gallery.appendChild(img);
    }
}

function loadWebtoonImage(){
    let currentScrollPos = window.scrollY;

    let scrolledImg = Math.round(currentScrollPos / 1280);

    //load scrolled img, 1 previous and 3 next
    for(let i = Math.max(scrolledImg - 1, 0); i< Math.min(scrolledImg + 3, webtoonImages.length); i++){
        
        let desiredSrc = '../img/Hong/Webtoon/'+ language + '/Hong-Episodio1_' +  String(i+1).padStart(3,0) + '.png';
        if(webtoonImages[i].getAttribute("src") != desiredSrc){
            webtoonImages[i].src = desiredSrc;
            webtoonImages[i].removeAttribute("height");
        }
        
    }
    
}

function changeLanguage(btn){
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

            loadWebtoonImage();
            break;
    }
}


//Main execution cycle
/*let myInterval = setInterval(() => {LoadWebtoonImage(myInterval);}, 1);*/

window.onload = (event) =>
{
    preloadImages();
    loadWebtoonImage();

    window.addEventListener('scroll', () => {updateNavbarOnScroll()});
    window.addEventListener('scroll', () => {loadWebtoonImage()});
}