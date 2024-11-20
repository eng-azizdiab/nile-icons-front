// scroll up
const upBtn = document.getElementById('up')
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        upBtn.style.display = "flex"
    } else {
        upBtn.style.display = "none"
    }
})

upBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

document.getElementById('mobile-bar').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('activeMenu');
});
// function goTo() {
//     window.location.href = `article.html`;
// }

let toUp = document.getElementById('up')
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            toUp.style.display = "flex"
        } else {
            toUp.style.display = "none"
        }
    })
    toUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });

// toogle menu and links 
let links = document.getElementById('links')
let mobileBar = document.getElementById('mobile-bar')


// Set initial display properties based on window width
if (window.innerWidth > 1150) {
    mobileBar.style.display = 'none'
    links.style.display = 'flex'
} else {
    mobileBar.style.display = 'block'
    links.style.display = 'none'
}

//resize 
window.addEventListener('resize', (e) => {
    if (e.target.innerWidth > 1150) {
        mobileBar.style.display = 'none'
        links.style.display = 'flex'
    } else {
        mobileBar.style.display = 'block'
        links.style.display = 'none'
    }
})