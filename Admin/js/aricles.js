const apiSource = `https://back.nileicons.com/`;

// Get categories and show them in two select elements
function fetchCategories() {
    fetch(`${apiSource}api/public/all-categories`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const selectElements = ['cat', 'newcat'].map(id => document.getElementById(id));
            const tableBody = document.getElementById('catData');
            
            // Clear options for both select elements
            selectElements.forEach(selectElement => {
                selectElement.innerHTML = ''; 
            });

            // Clear the table body
            tableBody.innerHTML = '';

            // Check if the data has categories
            if (data.data && Array.isArray(data.data)) {
                data.data.forEach(category => {
                    // Create and append options to select elements
                    const option = document.createElement('option');
                    option.value = category.id; 
                    option.textContent = category.title; 
                    selectElements.forEach(selectElement => {
                        selectElement.appendChild(option.cloneNode(true));
                    });

                    // Create table row
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${category.id}</td>
                        <td>${category.title}</td>
                        <td>
                            <button class="btn delete" data-id="${category.id}">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                // Add event listeners for delete buttons
                document.querySelectorAll('.delete').forEach(button => {
                    button.addEventListener('click', () => {
                        const categoryId = button.getAttribute('data-id');
                        deleteCategory(categoryId);
                    });
                });
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Delete category
function deleteCategory(categoryId) {
    fetch(`${apiSource}api/admin/categories/delete/${categoryId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            alert('Category deleted successfully.');
            fetchCategories(); 
        })
        .catch(error => {
            console.error('There was a problem with the delete operation:', error);
        });
}

document.addEventListener('DOMContentLoaded', fetchCategories);

// Add new category
function addCategory() {
    const title = document.getElementById('newCat').value;

    if (!title) {
        alert('Please enter a category title.');
        return;
    }
    
    fetch(`${apiSource}api/admin/categories/create?title=${encodeURIComponent(title)}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Category added:', data);
        alert("New Category added");
        location.reload();
        document.getElementById('newCat').value = ''; 
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
document.getElementById('addCat').addEventListener('click', addCategory);





// Get articles
function fetchArticles() {
    fetch(`${apiSource}api/admin/articles/all-articles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.getElementById('articlesData');
        tbody.innerHTML = ''; 
        if (data.data && Array.isArray(data.data)) {
            data.data.forEach(article => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${article.id}</td>
                    <td>${article.title}</td>
                    <td class="options">
 
                        <button id="delete" class="delete" data-id="${article.id}" onclick="deleteArticle(${article.id})">Delete</button>
 
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        console.log(data);
    })
    .catch(error => {
        alert('There was a problem with the fetch operation:', error);
    });
}
document.addEventListener('DOMContentLoaded', fetchArticles);

// Add new article

document.addEventListener("DOMContentLoaded", function () {
    const articleForm = {
        title: document.getElementById("title"),
        description: document.getElementById("description"),
        image: document.getElementById("image"),
        visible: document.getElementById("visible").querySelector("input"),
        category: document.getElementById("cat"),
        subArticles: []
    };

    const subArticlesContainer = document.querySelector(".special.form.container:nth-of-type(2)");
    const subArticlesData = [];
    const newSubButton = document.querySelector(".btn.add");
    const uploadButton = document.getElementById("upload");

    newSubButton.addEventListener("click", function () {
        const subtitle = document.getElementById("subtitle").value;
        const subdescription = document.querySelector("#description[name='subdescription']").value;
        const subimage = document.getElementById("subimage").files[0];
        const imagePos = document.getElementById("imagePos").value;

        if (!subtitle || !subdescription || !subimage) {
            alert("Please fill all sub-article inputs.");
            return;
        }

        const subData = {
            title: subtitle,
            description: subdescription,
            image: subimage,
            image_position: imagePos
        };

        subArticlesData.push(subData);

        // Reset sub-article form fields after adding
        document.getElementById("subtitle").value = '';
        document.querySelector("#description[name='subdescription']").value = '';
        document.getElementById("subimage").value = '';
        document.getElementById("imagePos").value = 'left';

        alert("Sub-article added successfully.");
    });

    uploadButton.addEventListener("click", async function () {
        const title = articleForm.title.value;
        const description = articleForm.description.value;
        const image = articleForm.image.files[0];
        const visible = articleForm.visible.checked ? 1 : 0;
        const category = articleForm.category.value;

        if (!title || !description || !image) {
            alert("Please fill all article inputs.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("visible", visible);
        formData.append("category_id", category);

        subArticlesData.forEach((subArticle, index) => {
            formData.append(`sub_articles[${index}][title]`, subArticle.title);
            formData.append(`sub_articles[${index}][description]`, subArticle.description);
            formData.append(`sub_articles[${index}][image]`, subArticle.image);
            formData.append(`sub_articles[${index}][image_position]`, subArticle.image_position);
        });

        try {
            const response = await fetch("https://back.nileicons.com/api/admin/articles/create", {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
                },
            });


            if (response.ok) {
                alert("Article and sub-articles uploaded successfully!");
                // console.log(response)
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Failed to upload article. Please check the console for details.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while uploading the article.");
        }
    });
});

// Delete article 
function deleteArticle(id) {
    fetch(`${apiSource}api/admin/articles/delete/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Article deleted:', data);

        // Re-fetch articles to update the table
        fetchArticles();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}






// // Update article function
// function updateArticle(id, title, description, visible, category_title, image_url) {
//     // Log test data for debugging
//     console.log(id, title, description, visible, category_title, image_url);
    
//     // Scroll to the top of the page for better user experience
//     window.scrollTo({ top: 0, behavior: 'smooth' });
    
//     // Populate form fields with article data
//     document.getElementById('articleIdNotUpdated').value = id;
//     document.getElementById('title').value = title;
//     document.getElementById('description').value = description;
//     document.getElementById('visible').querySelector('input').checked = visible === '1'; // Convert to boolean

//     // Toggle the visibility of the "Add" and "Update" buttons
//     document.getElementById('addArt').style.display = 'none';
//     document.getElementById('updateArt').style.display = 'block';
// }

// // Save updated article to server
// document.getElementById('updateArt').addEventListener('click', async function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Gather the form data
//     const id = document.getElementById('articleIdNotUpdated').value;
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const image = document.getElementById('image').files[0];
//     const visible = document.getElementById('visible').querySelector('input').checked ? 1 : 0;
//     const categoryId = document.getElementById('cat').value;

//     // Check if all inputs are filled
//     if (!title || !description || !categoryId) {
//         document.querySelector('.alert p').innerText = "Please fill all inputs.";
//         return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('visible', visible);
//     formData.append('category_id', categoryId);

//     // Append image only if it is provided
//     if (image) {
//         formData.append('image', image);
//     }

//     try {
//         const response = await fetch(`${apiSource}api/admin/articles/update/${id}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
//             },
//             body: formData
//         });

//         if (response.ok) {
//             const result = await response.json();
//             alert('Article updated successfully.');
//             fetchArticles(); // Re-fetch articles to update the table
//         } else {
//             const errorText = await response.text();
//             alert(`Error updating article: ${errorText}`);
//         }
//     } catch (error) {
//         console.error('Network error:', error);
//         alert('There was a problem with the update operation.');
//     }
// });

