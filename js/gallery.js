//Functions
function filterGallery(button, type)
{
    var gallery = document.getElementById("gallery");
    var images = gallery.getElementsByTagName("img");

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

    var filterButtons = document.getElementById("gallery-filters");
    var selectedButtons = filterButtons.getElementsByClassName("selected");
    for (var i = 0; i < selectedButtons.length; i++) 
    {
        selectedButtons[i].classList.remove("selected");
    }

    button.classList.add("selected");
}


//Execute


window.addEventListener('scroll', () => {updateNavbarOnScroll()});