//Global variables
var imageList;

//Functions
function filterGallery(button, type)
{
    //let gallery = document.getElementById("gallery");
    //let images = gallery.getElementsByTagName("img");

    for (let i = 0; i < imageList.length; i++) 
    {
        if(type == null)
        {
            imageList[i].classList.remove("hidden");
        }
        else if( imageList[i].classList.contains(type))
        {
            imageList[i].classList.remove("hidden");
        }else
        {
            imageList[i].classList.add("hidden");
        }
    }

    /*
    sortedImageList = [...images].sort((a, b) => a.getBoundingClientRect().top > b.getBoundingClientRect().top ? 1 : -1)
                             .filter(function(obj){ return !obj.classList.contains("hidden") });

    */
   sortImages();

    /*
    let found=0;
    for(let i = 0; i < desiredImageOrder.length; i++)
    {
        let index = sortedImageList.findIndex( (e) => e.src === desiredImageOrder[i].src);

        console.log("image "+desiredImageOrder[i].src+" found in "+index)
        if(index >= 0)
        {
            console.log("swap "+index+" with "+found)

            sortedImageList[index].src = sortedImageList[found].src;
            sortedImageList[index].alt = sortedImageList[found].alt;
            sortedImageList[index].classList = sortedImageList[found].classList;
            sortedImageList[index].dataset = sortedImageList[found].dataset;

            sortedImageList[found].src = desiredImageOrder[i].src;
            sortedImageList[found].alt = desiredImageOrder[i].alt;
            sortedImageList[found].classList = desiredImageOrder[i].classList;
            sortedImageList[found].dataset = desiredImageOrder[i].dataset;
            found++;
        }
    }
    */
    /*
    let j = 0;
    for (let i=0; i<sortedImageList.length; i++){
        while(desiredImageOrder[j].classList.contains("hidden") && j < desiredImageOrder.length-1){
            j++;
        }

        console.log("change "+sortedImageList[i].src+" with "+desiredImageOrder[j].src);

        sortedImageList[i].src=desiredImageOrder[j].src;

        j++;
    }
        */
    //desiredImageOrder.forEach((element) => console.log(element));

    if(button == null) return;

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

    document.addEventListener("keydown", checkArrowKeys);
}

function navigateImages(dir){
    let overlay = document.getElementById("gallery-overlay");
    if(overlay.classList.contains("hidden")) return;

    let imgOverlay = document.getElementById("overlay-image");

    let currentIndex = [...imageList].findIndex(a => a.src === imgOverlay.src);

    do{
        currentIndex += dir;

        if(currentIndex == imageList.length) currentIndex = 0;
        else if(currentIndex < 0) currentIndex = imageList.length - 1;
    }
    while(imageList[currentIndex].classList.contains("hidden"));

    

    onGalleryImageClick(imageList[currentIndex]);
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

function sortImages(){
    
    let gallery =  document.getElementById("gallery");

    let columns = [];
    let columnWidth = (gallery.clientWidth - (4 * window.innerWidth * 0.01)) / 5;

    let galleryBounds = gallery.getBoundingClientRect();

    console.log(gallery.clientWidth+"/5 - "+window.innerWidth+"*0.01 = "+columnWidth);


    for (let i = 0; i < 5; i++) 
    {
        //initialize columns (0 height for each)
        columns.push(0);
    }

    let imageList = gallery.children;

    for (let i = 0; i < imageList.length; i++) 
    {
        if(imageList[i].classList.contains("hidden")) continue;

        //console.log("image: "+imageList[i].src)
        let min = Math.min.apply(null, columns);
        let index = columns.indexOf(min);
        let xpos = index * columnWidth + index * window.innerWidth * 0.01;

        imageList[i].style.width =columnWidth +"px";
        //imageList[i].style.position = "absolute";
        imageList[i].style.left = xpos+"px";
        imageList[i].style.top = min+"px";


        columns[index] += imageList[i].getBoundingClientRect().height + window.innerWidth * 0.01;
        
        console.log(imageList[i].src+": "+imageList[i].getBoundingClientRect().height + " + "+window.innerWidth * 0.01);
    }

    gallery.style.height = Math.max.apply(null, columns)+"px";

}

//Main execution cycle
window.onload = (event) =>
{
    window.addEventListener('scroll', () => {updateNavbarOnScroll()});

    let gallery = document.getElementById("gallery");
    imageList = gallery.getElementsByTagName("img");

    for (let i = 0; i < imageList.length; i++) 
    {
        
        let img = imageList[i];
        imageList[i].addEventListener('click', function(){onGalleryImageClick(img);});
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
    /*
    originalImgList = gallery.cloneNode(true);


    desiredImageOrder = [...originalImgList.children];
    */

    filterGallery(null, 'sfw');


    window.addEventListener('resize', function(event) {
        sortImages();
    }, true);

    

}