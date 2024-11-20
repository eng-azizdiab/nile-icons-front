const apiSource= `https://back.nileicons.com/`;

// Partner 1 

// Fetch Data
async function fetchImagesFromServer() {
    try {
        const response = await fetch(`${apiSource}api/admin/get-partner`, {
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

// Display Partners
function displayImages(imagesData) {
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';

    imagesData.files.forEach(image => {
        const imgContainer = `
        <div class="img-container">
            <h5>${image.name}</h5>
            <div><img src="${image.image_url}" alt="${image.name}"></div>
            <button onclick="deleteRef(${image.id})">Delete</button>
        </div>
        `;

        imagesContainer.innerHTML += imgContainer;
    });
}

// Delete Partners
async function deleteRef(imageId) {
    try {
        const response = await fetch(`${apiSource}api/admin/delete-partner/${imageId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete image with ID: ${imageId}`);
        }

        console.log(`Image with ID ${imageId} deleted successfully.`);
        fetchImagesFromServer();

    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

// Add Partners
async function uploadToServer() {
    const imageName = document.getElementById('imageName').value;
    const imageFile = document.getElementById('imageInput').files[0];
    
    if (!imageName || !imageFile) {
        alert("Please fill in all fields.");
        return;
    }

    const formData = new FormData();
    formData.append('partners[0][name]', imageName);
    formData.append('partners[0][image]', imageFile);

    try {
        const response = await fetch(`${apiSource}api/admin/upload-partner`, {
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
        alert('Error uploading reference. Details: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', fetchImagesFromServer);

// Partner 2

// Fetch Data
async function fetchImagesFromServer2() {
    try {
        const response = await fetch(`${apiSource}api/admin/get-partner2`, {
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
        displayImages2(data);

    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Display Partners
function displayImages2(imagesData) {
    const imagesContainer = document.getElementById('imagesContainer2');
    imagesContainer.innerHTML = '';

    imagesData.files.forEach(image => {
        const imgContainer = `
        <div class="img-container">
            <h5>${image.name}</h5>
            <div><img src="${image.image_url}" alt="${image.name}"></div>
            <button onclick="deleteRef2(${image.id})">Delete</button>
        </div>
        `;

        imagesContainer.innerHTML += imgContainer;
    });
}

// Delete Partners
async function deleteRef2(imageId) {
    try {
        const response = await fetch(`${apiSource}api/admin/delete-partner2/${imageId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete image with ID: ${imageId}`);
        }

        console.log(`Image with ID ${imageId} deleted successfully.`);
        fetchImagesFromServer2();

    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

// Add Partners
async function uploadToServer2() {
    const imageName = document.getElementById('imageName2').value;
    const imageFile = document.getElementById('imageInput2').files[0];
    
    if (!imageName || !imageFile) {
        alert("Please fill in all fields.");
        return;
    }

    const formData = new FormData();
    formData.append('partners[0][name]', imageName);
    formData.append('partners[0][image]', imageFile);

    try {
        const response = await fetch(`${apiSource}api/admin/upload-partner2`, {
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
        alert('Error uploading reference. Details: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', fetchImagesFromServer2);
