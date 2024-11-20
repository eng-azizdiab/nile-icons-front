//Share on social media
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href); 
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookShareUrl, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this page!");
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(twitterShareUrl, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(linkedInShareUrl, '_blank');
}
// to up
let toUp = document.getElementById('upBtn')
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
let navBar = document.getElementById('nav')

// Set initial display properties based on window width
if (window.innerWidth > 1150) {
    mobileBar.style.display = 'none'
    links.style.display = 'flex'
    navBar.classList.remove('fixedNav')
} else {
    mobileBar.style.display = 'block'
    links.style.display = 'none'
    navBar.classList.add('fixedNav')

}
//resize image
window.addEventListener('resize', (e) => {
    if (e.target.innerWidth > 1150) {
        mobileBar.style.display = 'none'
        links.style.display = 'flex'
        navBar.classList.remove('fixedNav')
    } else {
        mobileBar.style.display = 'block'
        links.style.display = 'none'
        navBar.classList.add('fixedNav')
    }
})

// time stay on page 
let startTime;

window.addEventListener('load', function() {
    startTime = new Date().getTime();
    setInterval(updateTimeSpent, 1000);
});

function updateTimeSpent() {
    let currentTime = new Date().getTime();
    let timeSpentInSeconds = (currentTime - startTime) / 1000; 
    let timeSpentInMinutes = (timeSpentInSeconds / 60).toFixed(2); 
    document.getElementById('time').innerHTML = ` NEWS ${timeSpentInMinutes} minutes read`;
}


// Extract the `id`
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const apiUrl = `https://back.nileicons.com/api/public/all-articles/${id}`;

// Step 3: Send a request to the API
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Article data:', data);

        // Display main article data
        document.getElementById('topTitle').innerHTML = `${data.data.title}`;
        document.getElementById('firstDescription').innerHTML = `${data.data.description}`;
        document.getElementById('articleImage').src = `${data.data.image_url}`;

        // Format and display creation date
        const createdAt = new Date(data.data.created_at);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = createdAt.toLocaleDateString('en-US', options);
        document.getElementById('timeView').innerHTML = formattedDate;

        // Display sub articles
        const subArticleContainer = document.getElementById('subArticle-container');
        subArticleContainer.innerHTML = ''; // Clear any existing content

        data.data.sub_articles.forEach(subArticle => {
            // Create a new section element for each sub-article
            const subArticleSection = document.createElement('section');
            subArticleSection.classList.add('subArt');

            // Check image position and add class accordingly
            const imageClass = subArticle.image_position === 'right' ? 'rightImage' : '';

            subArticleSection.innerHTML = `
                <div class="container">
                    <div class="info">
                        <h3>${subArticle.title}</h3>
                        <p>${subArticle.description}</p>
                    </div>
                    <div class="img ${imageClass}">
                        <img src="${subArticle.image_url}" alt="${subArticle.title}">
                    </div>
                </div>
            `;

            // Add the new sub-article section to the container
            subArticleContainer.appendChild(subArticleSection);
        });
    })
    .catch(error => {
        console.error('Error fetching article:', error);
    });

    // Utility functions
function goTo(articleId) {
    console.log(`Navigating to article with ID: ${articleId}`);
    window.location.href = `article.html?id=${articleId}`;
}

    document.addEventListener('DOMContentLoaded', function() {
        fetch(`https://back.nileicons.com/api/public/all-articles`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Articles data:', data);
    
                const articles = data.data.sort(() => 0.5 - Math.random());
                const randomArticles = articles.slice(0, 3);
    
                const articlesContainer = document.getElementById('articles-container');
                articlesContainer.innerHTML = '';
    
                randomArticles.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');
                    articleDiv.onclick = () => goTo(article.id);
                    articleDiv.innerHTML = `
                        <div class="img">
                            <img src="${article.image_url}" alt="${article.title}">
                        </div>
                        <div class="info">
                            <p>${article.title}</p>
                            <p>${article.description}</p>
                        </div>
                    `;
                    articlesContainer.appendChild(articleDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    });
    