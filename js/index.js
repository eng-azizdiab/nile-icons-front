const apiSource = `https://back.nileicons.com/`

// toogle menu and links 
let links = document.getElementById('links')
let mobileBar = document.getElementById('mobile-bar')


// Set initial display properties based on window width
if (window.innerWidth > 1290) {
    mobileBar.style.display = 'none'
    links.style.display = 'flex'
} else {
    mobileBar.style.display = 'block'
    links.style.display = 'none'
}

//resize 
window.addEventListener('resize', (e) => {
    if (e.target.innerWidth > 1290) {
        mobileBar.style.display = 'none'
        links.style.display = 'flex'
    } else {
        mobileBar.style.display = 'block'
        links.style.display = 'none'
    }
})

// fixed nav scroll 


let nav = document.getElementById('nav')
let main = document.getElementById('main')

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('fixedNav');
        main.style.marginTop = "100px";

    } else {
        nav.classList.remove('fixedNav');
        main.style.marginTop =  "0";

    }
});



// scroll to up 
let toUp = document.getElementById('toUp')
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

// togle x with bar in mobile menu

let mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false; 

mobileBar.innerHTML = `<i class="fa-solid fa-bars" id="open"></i>`;

mobileBar.addEventListener('click', () => {
    mobileMenu.classList.toggle('activeMenu');
    menuOpen = !menuOpen; 
    if (menuOpen) {
        mobileBar.innerHTML = `<i class="fa-solid fa-xmark" id="close" id='icon'></i>`;
    } else {
        mobileBar.innerHTML = `<i class="fa-solid fa-bars" id="open" id='icon'></i>`;
    }
});

// loader 
setTimeout(()=>{
    document.getElementById('loader').style.display = 'none';
    document.body.style.overflow = 'visible';
}, 1200);




// our values toogle 

    let values = {
        0 : {
            title : `partnership`,
            content :  `partnership is the best model of cooperation to reach a
            win-win situation to satisfy all parties`,
        },
        1 : {
            title : `Innovation`,
            content : `we continually search for and master new and better
            ways of doing things on an operational level to get the
            best utilization of all resources`,
        },
        2 : {
            title : `Quality`,
            content: `At Nile Icons, our commitment to quality is driven by meticulous attention to detail, value engineering, and the careful selection of stakeholders, from designers to installers and operators.`
        },
        3 : {
            title : `Carful Selection`,
            content : `Careful Choosing of solution stakeholders from the
            Designer, the installer, and even the operator`,
        },
        4: {
            title : `Value Engineering`,
            content : `Doing Value Engineering finding the best way to do
            things`,
        },
        5 : {
            title : `Integration`,
            content : `Creating harmony between vendors’ products to
            produce an integrated customized solution that solves
            problems, facilitates operations, controls systems, and
            increases ROI`,
        }
    } 

    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.addEventListener('mouseover', () => {
            circles.forEach(circle => {
                circle.classList.remove('active');
            });
            circle.classList.add('active');
            document.getElementById('title').textContent = values[index].title;
    
            const contentElement = document.getElementById('content').querySelector('p');
            const content = values[index].content;
    
            if (Array.isArray(content)) {
                // Join array items with line breaks
                contentElement.innerHTML = content.join('<br> <br>');
            } else {
                // Directly set content if it's a string
                contentElement.textContent = content;
            }
        });
    });
    

// swipper js partners 
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        300: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        560: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40
        },
        1000: {
            slidesPerView: 4,
            spaceBetween: 40
        }
    },
    autoplay: {
        delay: 2000, 
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
});

// mobile links activated 

const menulinks = document.querySelectorAll('.mobile-menu  a');
for (let i = 0; i < menulinks.length; i++) {
    menulinks[i].addEventListener('click', () => {

        menulinks.forEach(link => {
            link.classList.remove('activeM');
        });
        menulinks[i].classList.add('activeM');
        mobileMenu.classList.remove('activeMenu');
        mobileBar.innerHTML = `<i class="fa-solid fa-bars" id="open"></i>`;
    });
}




// main h3  welcome to nile icons

$(document).ready(function() {
    setTimeout(function() {
        animateText(".typewriter");
    }, 500); 
    function animateText(element) {
        var text = $(element).text();
        var letters = text.split("");
        $(element).empty();
        $.each(letters, function(index, letter) {
            var span = $("<span style='opacity:0;'></span>").text(letter).appendTo(element);
            TweenMax.to(span, 0.5, { opacity: 1, delay: index * 0.1 });
        });
    }
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        triggerElement: ".typewriter",
        triggerHook: 0.8,
        reverse: false
    })
    .on("enter", function() {
        animateText(".typewriter");
    })
    .addTo(controller);
});

// img in main 

document.addEventListener('DOMContentLoaded', function() {
    const mainImg = document.getElementById('mainImg');
    mainImg.style.transition = 'transform 0.5s ease-in-out ';
    setTimeout(function() {
        mainImg.style.transform = 'translate(0px, 0px)';
    }, 1500); 
});

// active links 
const headerLinks = document.querySelectorAll('header ul li a');

function handleScroll() {
    let scrollPosition = window.scrollY + window.innerHeight / 4;

    const sections = [
        { id: 'main', index: 0 },
        { id: 'about', index: 1 },
        { id: 'partners', index: 2 },
        { id: 'values', index: 3 },
        { id: 'ourSolutions', index: 4 },
        { id: 'services', index: 5 },
        { id: 'news', index: 6 },
        { id: 'contact', index: 7}
    ];

    let activeSection = '';

    // Determine if the scroll position is within the bounds of the "About" or "Values" sections
    const isInAboutOrValues = (scrollPosition) => {
        const aboutSection = document.getElementById('about');
        const valuesSection = document.getElementById('values');
        const aboutTop = aboutSection.offsetTop;
        const aboutBottom = aboutTop + aboutSection.offsetHeight;
        const valuesTop = valuesSection.offsetTop;
        const valuesBottom = valuesTop + valuesSection.offsetHeight;

        return (scrollPosition >= aboutTop - 100 && scrollPosition <= aboutBottom + 100) ||
            (scrollPosition >= valuesTop - 100 && scrollPosition <= valuesBottom + 100);
    };

    // Check for each section
    sections.forEach(section => {
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
            const sectionTop = sectionElement.offsetTop;
            const sectionBottom = sectionTop + sectionElement.offsetHeight;

            if (isInAboutOrValues(scrollPosition)) {
                activeSection = 'about'; // Set "About" as active when scrolling in either "About" or "Values"
            } else if (scrollPosition >= sectionTop - 100 && scrollPosition <= sectionBottom + 100) {
                activeSection = section.id;
            }
        }
    });

    headerLinks.forEach(link => {
        const linkHref = link.getAttribute('href').substring(1);
        if (linkHref === activeSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}





// Use requestAnimationFrame for better performance
function onScroll() {
    requestAnimationFrame(handleScroll);
}
window.addEventListener('scroll', onScroll);
handleScroll(); // Initialize the scroll behavior on page load




// get user ip ad
// document.addEventListener('DOMContentLoaded', () => {
//     // Define the number you want to send
//     const numberToSend = 12345; // Replace this with any number

//     // Send the number as a query parameter
//     fetch(`https://back.nileicons.com/api/public/new-visitor?number=${encodeURIComponent(numberToSend)}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Response from API:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });




// get partners
document.addEventListener('DOMContentLoaded', function() {
    fetch(`${apiSource}api/public/get-partner`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            
            // Extract the files array from the fetched data
            const files = data.files;
            const partnerContainer = document.getElementById('partner');

            // Clear any existing slides
            partnerContainer.innerHTML = '';

            // Loop through the files array and create the HTML structure
            files.forEach(file => {
                const partnerSlide = `
                    <div class="swiper-slide">
                        <img src="${file.image_url}" alt="${file.name}">
                    </div>
                `;
                partnerContainer.insertAdjacentHTML('beforeend', partnerSlide);
            });

            // Initialize Swiper after adding slides
            const swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        })
        .catch(error => {
            console.error('Error occurred while fetching references:', error);
        });
});

