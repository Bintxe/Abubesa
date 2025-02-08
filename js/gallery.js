//Global variables
var sortedImageList = [];

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

    sortedImageList = [...images].sort((a, b) => a.getBoundingClientRect().top > b.getBoundingClientRect().top ? 1 : -1)
                             .filter(function(obj){ return !obj.classList.contains("hidden") });


    //sortedImageList.forEach((element) => console.log(element));

    if(button)
    {
        let filterButtons = document.getElementById("gallery-filters");
        let selectedButtons = filterButtons.getElementsByClassName("selected");
        for (let i = 0; i < selectedButtons.length; i++) 
        {
            selectedButtons[i].classList.remove("selected");
        }
    
        button.classList.add("selected");
    }
    
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

    document.addEventListener("keydown", checkArrowKeys);
}

function navigateImages(dir){
    let overlay = document.getElementById("gallery-overlay");
    if(overlay.classList.contains("hidden")) return;

    let imgOverlay = document.getElementById("overlay-image");

    let currentIndex = sortedImageList.findIndex(a => a.src === imgOverlay.src) + dir;

    if(currentIndex == sortedImageList.length) currentIndex = 0;
    else if(currentIndex < 0) currentIndex = sortedImageList.length - 1;

    onGalleryImageClick(sortedImageList[currentIndex]);
}

function checkArrowKeys(event){
    console.log("check key")
    switch (event.key) {
        case 'ArrowLeft':
            navigateImages(-1);
            break;
        case 'ArrowRight':
            navigateImages(1);
    }
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

function sortImages(columncount){
    let gallery =  document.getElementById("gallery");

    let columns = [];
    let columnWidth = (gallery.clientWidth / 5) - (window.innerWidth * 0.01) ;

    console.log(gallery.clientWidth+"/5 - "+window.innerWidth+"*0.01 = "+columnWidth);
    for (let i = 0; i < columncount; i++) 
    {
        //initialize columns (0 height for each)
        columns.push(200)
    }

    let imageList = gallery.children;

    for (let i = 0; i < imageList.length; i++) 
    {
        if(imageList[i].classList.contains("hidden")) continue;

        console.log("image: "+imageList[i].src)
        let min = Math.min.apply(null, columns);
        let index = columns.indexOf(min);
        let xpos = index * columnWidth;

        columns[index] += imageList[i].clientHeight + window.innerWidth * 0.01;

        
        imageList[i].setAttribute("style", "width:"+(columnWidth) +"px !important;");
        imageList[i].style.position = "absolute";
        imageList[i].style.left = xpos+"px";
        imageList[i].style.top = min+"px";
    }

}

//Main execution cycle
window.onload = (event) =>
{
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
        document.removeEventListener("keydown", checkArrowKeys);
    });

    let overlayImg = overlay.getElementsByClassName("overlay-image-box")[0];
    overlayImg.addEventListener('mouseover', function(){
        showImageTextOverlay(true);
    });

    overlayImg.addEventListener('mouseout', function(){
        showImageTextOverlay(false);
    });

    //sortImages(5);

    filterGallery(null, 'sfw');

    

}