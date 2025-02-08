//Functions
function filterGallery(button, type)
{
    let gallery = document.getElementById("gallery");
    let images = gallery.getElementsByTagName("img");

    for (var i = 0; i < images.length; i++) 
    {
        if(type == null)
        {
            images[i].classList.remove("hidden");
        }
        else if( images[i].classList.contains(type))
        {
            images[i].classList.remove("hidden");
        }else
        {
            images[i].classList.add("hidden");
        }
    }

    let filterButtons = document.getElementById("gallery-filters");
    let selectedButtons = filterButtons.getElementsByClassName("selected");
    for (let i = 0; i < selectedButtons.length; i++) 
    {
        selectedButtons[i].classList.remove("selected");
    }

    button.classList.add("selected");
}

function onGalleryImageClick(image){
    let imgOverlay = document.getElementById("overlay-image");
    imgOverlay.src=image.src;

    let titleOverlay = document.getElementById("overlay-text-title");
    let yearOverlay = document.getElementById("overlay-text-year");
    let commOverlay = document.getElementById("overlay-text-extra");

    titleOverlay.innerHTML = image.alt;
    yearOverlay.innerHTML = image.dataset.year;
    commOverlay.innerHTML = image.classList.contains("commission") ? "Commission" : "";

    document.getElementsByTagName("html")[0].style.overflow = "hidden";

    let overlay = document.getElementById("gallery-overlay");
    overlay.classList.remove("hidden");
}

function showImageTextOverlay(show){
    let textOverlay =  document.getElementById("overlay-image-text");
    if(show){
        textOverlay.style.bottom = "0";
        textOverlay.style.opacity = 1;
    }else{
        textOverlay.style.bottom = -textOverlay.clientHeight+"px";
        textOverlay.style.opacity = 0;
    }
    
}

//Execute
window.addEventListener('scroll', () => {updateNavbarOnScroll()});

let gallery = document.getElementById("gallery");
let images = gallery.getElementsByTagName("img");

for (let i = 0; i < images.length; i++) 
{
    
    let img = images[i];
    images[i].addEventListener('click', function(){onGalleryImageClick(img);});
}

let overlay = document.getElementById("gallery-overlay");
let overlayBg = document.getElementById("overlay-background");

overlayBg.addEventListener('click', function(){ 
    document.getElementsByTagName("html")[0].style.overflow = "auto";
    overlay.classList.add("hidden"); 
});

let overlayImg = overlay.getElementsByClassName("overlay-image-box")[0];
overlayImg.addEventListener('mouseover', function(){
    showImageTextOverlay(true);
});

overlayImg.addEventListener('mouseout', function(){
    showImageTextOverlay(false);
});