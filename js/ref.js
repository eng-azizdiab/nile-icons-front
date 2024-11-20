// References 
document.addEventListener('DOMContentLoaded', function() {
    // Define your API source
    const apiSource = 'https://back.nileicons.com/'; // Replace with your actual API source URL

    fetch(`${apiSource}api/public/get-reference`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Log the data to the console
            console.log('Fetched data:', data);
            
            const swiperWrapper = document.querySelector('#referencesSwipper');
            
            // Check if response is successful
            if (data.message === "References retrieved successfully.") {
                // Clear existing slides
                swiperWrapper.innerHTML = '';

                // Loop through each file and create a slide
                data.files.forEach(file => {
                    const slideDiv = document.createElement('div');
                    slideDiv.className = 'swiper-slide';
                    
                    const img = document.createElement('img');
                    img.src = file.image_url; 
                    img.alt = file.company_name; 

                    slideDiv.appendChild(img);
                    swiperWrapper.appendChild(slideDiv);
                });
            } else {
                console.error('Failed to retrieve references');
            }
        })
        .catch(error => {
            console.error('Error occurred while fetching references:', error);
        });
});
