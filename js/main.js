//Global variables
var prevScrollpos = window.scrollY;

//Functions
function updateNavbarOnScroll () {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) 
    {
        document.getElementById("navbar").style.top = "0";
    } else if(currentScrollPos > 300)
    {
        document.getElementById("navbar").style.top = "-8vh";
    }
    prevScrollpos = currentScrollPos;
}