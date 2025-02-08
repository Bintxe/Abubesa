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
    imgOverlay.src=image;

    console.log("show overlay");

    let overlay = document.getElementById("gallery-overlay");
    overlay.classList.remove("hidden");
}

//Execute

window.addEventListener('scroll', () => {updateNavbarOnScroll()});

let gallery = document.getElementById("gallery");
let images = gallery.getElementsByTagName("img");

for (let i = 0; i < images.length; i++) 
{
    
    let img = images[i].src;
    images[i].addEventListener('click', function(){onGalleryImageClick(img);});
}

let overlay = document.getElementById("gallery-overlay");
let overlayBg = document.getElementById("overlay-background");

overlayBg.addEventListener('click', function(){ 
    console.log("hiding overlay");
    overlay.classList.add("hidden"); 
});