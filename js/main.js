//Global variables
var prevScrollpos = window.scrollY;
const MOBILE_WIDTH = 500;
const MEDIUM_TABLET_WIDTH = 900;
const LARGE_TABLET_WIDTH = 1200;

//Functions
function updateNavbarOnScroll (id) {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) 
    {
        document.getElementById(id).style.top = "0";
    } else if(currentScrollPos > 300)
    {
        document.getElementById(id).style.top = "-12vh";
    }
    prevScrollpos = currentScrollPos;
}

function toggleMobileMenu(){
    var menu = document.getElementById("menu-mobile-overlay");
    var menu_bg = document.getElementById("menu-mobile-overlay-bg");

    var hidden = menu.classList.contains("hidden-top");
    if(hidden){
        menu.classList.remove("hidden-top");
        menu_bg.classList.remove("hidden");
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }
    else{
        menu.classList.add("hidden-top");
        menu_bg.classList.add("hidden");
        document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
    
}



//Main execution cycle
window.onload = (event) =>
{
    window.addEventListener('scroll', () => {updateNavbarOnScroll("navbar-mobile")});
}