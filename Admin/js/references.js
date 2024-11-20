const apiSource= `https://back.nileicons.com/`;
// Fetch Data
async function fetchImagesFromServer() {
    try {
        const response = await fetch(`${apiSource}api/admin/get-reference`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        displayImages(data);

    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Display Images
function displayImages(imagesData) {
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';

    imagesData.files.forEach(image => {
        const imgContainer = `
        <div class="img-container">
            <h5>${image.company_name}</h5>
            <div><img src="${image.image_url}" alt="${image.company_name}"></div>
            <button onclick="deleteRef(${image.id})">Delete</button>
        </div>
        `;

        imagesContainer.innerHTML += imgContainer;
    });
}

// Delete Reference
async function deleteRef(imageId) {
    try {
        const response = await fetch(`${apiSource}api/admin/delete-reference/${imageId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete image with ID: ${imageId}`);
        }

        console.log(`Image with ID ${imageId} deleted successfully.`);
        // Refresh the images after deletion
        fetchImagesFromServer();

    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

// Add Reference
async function uploadToServer() {
    const imageName = document.getElementById('imageName').value;
    const imageFile = document.getElementById('imageInput').files[0];
    
    if (!imageName || !imageFile) {
        alert("Please fill in all fields.");
        return;
    }

    const formData = new FormData();
    formData.append('references[0][name]', imageName);
    formData.append('references[0][image]', imageFile);

    try {
        const response = await fetch(`${apiSource}api/admin/upload-reference`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
            },
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            fetchImagesFromServer()
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error('Error uploading reference:', error);
        alert('Error uploading reference.');
    }
}

document.addEventListener('DOMContentLoaded', fetchImagesFromServer);

