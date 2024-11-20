// Function to fetch categories from the API
    async function fetchCategories() {
        try {
            const response = await fetch('https://back.nileicons.com/api/public/all-categories');
            const data = await response.json();

            // Check if the API response is successful
            if (data.message === "Categories retrieved successfully") {
                const categories = data.data;
                const catContainer = document.getElementById('catContainer');

                // Loop through the categories and create divs for each
                categories.forEach(category => {
                    const catDiv = document.createElement('div');
                    catDiv.className = 'cat';
                    catDiv.textContent = category.title; // Set the text to the category title
                    catContainer.appendChild(catDiv); // Append the category div to the container
                });
            } else {
                console.error('Failed to retrieve categories:', data.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
// Call the function to fetch categories when the page loads
fetchCategories();

// Fetch and display data 
const apiUrl = 'https://back.nileicons.com/api/public/all-articles';
let articlesArray = [];
const articlesPerPage = 6;
let currentPage = 1;

// Fetch articles from the API
async function fetchArticles() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`An error has occurred: ${response.status}`);
        
        const data = await response.json();
        if (data.message === "Articles retrieved successfully") {
            articlesArray = data.data;
            renderArticles();  // Display the first page
            setupPagination();  // Set up pagination buttons
        } else {
            console.error('Failed to retrieve articles:', data.message);
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

// Render articles based on the current page
function renderArticles() {
    const container = document.getElementById('articles-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * articlesPerPage;
    const end = currentPage * articlesPerPage;
    const articlesToShow = currentPage * articlesPerPage >= articlesArray.length 
                            ? articlesArray.slice(start) // Show all remaining on last page
                            : articlesArray.slice(start, end);

    articlesToShow.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
        articleDiv.onclick = () => goTo(article.id);

        articleDiv.innerHTML = `
            <div class="img"><img src="${article.image_url}" alt="${article.title}"></div>
            <div class="info"><p>${article.description}</p></div>
            <div class="timeInfo">${getReadingTime(article.description)} min read</div>
            
        `;
        container.appendChild(articleDiv);
    });
}

// Set up pagination buttons
function setupPagination() {
    const pageButtonsContainer = document.getElementById('pageButtons');
    pageButtonsContainer.innerHTML = ''; // Clear any existing buttons

    const totalPages = Math.ceil(articlesArray.length / articlesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) pageButton.classList.add('paginationActive');
        pageButton.onclick = () => {
            currentPage = i;
            renderArticles();
            setupPagination();  // Update pagination button states
        };
        pageButtonsContainer.appendChild(pageButton);
    }

    // Enable/disable 'Back' and 'Next' buttons based on the current page
    document.getElementById('backButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = currentPage === totalPages;

    document.getElementById('backButton').onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderArticles();
            setupPagination();
        }
    };
    document.getElementById('nextButton').onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderArticles();
            setupPagination();
        }
    };
}

// Utility functions
function goTo(articleId) {
    console.log(`Navigating to article with ID: ${articleId}`);
    window.location.href = `article.html?id=${articleId}`;
}


function getReadingTime(description) {
    const wordsPerMinute = 5;
    const wordCount = description.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
}

// Start fetching and displaying articles
fetchArticles();



