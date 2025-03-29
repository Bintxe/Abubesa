//Global variables
var language = "es";
var totalImages = 134;

var gallery = document.getElementById("webtoon-box");
var webtoonImages = gallery.children;

var baseWidth = 800;
var baseHeight = 1280;

/*
var continueLoad = true;
var endLoad = false;

var img;
var galleryIndex = 1;
*/

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
    

    if(checkViewportSize(MOBILE_WIDTH))
    {
        baseWidth = window.innerWidth;
        baseHeight = baseWidth * baseHeight / 800;
    }

    for(var i = 0; i < totalImages; i++)
    {
        let img = new Image();
        img.src = "../img/DummyImage.png";
        img.width = baseWidth;
        img.height = baseHeight;

        gallery.appendChild(img);
    }
}

function loadWebtoonImage(){
    let currentScrollPos = window.scrollY;

    let scrolledImg = Math.round(currentScrollPos / baseHeight);

    //load scrolled img, 1 previous and 3 next
    for(let i = Math.max(scrolledImg - 1, 0); i< Math.min(scrolledImg + 3, webtoonImages.length); i++){
        
        let desiredSrc = '../img/Hong/Webtoon/'+ language + '/Hong_' +  String(i+1).padStart(3,0) + '.png';
        if(webtoonImages[i].getAttribute("src") != desiredSrc){
            webtoonImages[i].src = desiredSrc;
            webtoonImages[i].removeAttribute("height");
        }        
    }

    setCookie(COOKIE_HONG_SCROLLPOS, currentScrollPos, 365);
}

function changeLanguage(btn){
    let sel = btn.dataset.language;

    if(language === sel) return;

    switch(sel){
        case "es":
        case "en":
            language = sel;
            updateLanguageButton(sel);
            loadWebtoonImage();
            break;
    }

    setCookie(COOKIE_LANGUAGE, language, 365);
}

function updateLanguageButton(lan)
{
    let allFlags = document.getElementsByClassName("menu-flag");
    for(let i=0; i<allFlags.length; i++){
        if(allFlags[i].dataset.language != lan){
            allFlags[i].classList.add("greyed");
        }else
        {
            allFlags[i].classList.remove("greyed");
        }     
    }
}


//Main execution cycle
/*let myInterval = setInterval(() => {LoadWebtoonImage(myInterval);}, 1);*/

window.onload = (event) =>
{
    preloadImages();

    let cookieLanguage = getCookie(COOKIE_LANGUAGE);
    if(cookieLanguage !== "")
    {
        language = cookieLanguage;
        updateLanguageButton(language);
    }

    let cookieScroll = getCookie(COOKIE_HONG_SCROLLPOS);
    if(cookieScroll > 0)
    {
        window.scrollTo(0, cookieScroll);
    }

    loadWebtoonImage();

    window.addEventListener('scroll', () => {updateNavbarOnScroll("navbar")});
    window.addEventListener('scroll', () => {updateMobileNavbarOnScroll("navbar-mobile")});
    window.addEventListener('scroll', () => {loadWebtoonImage()});
}