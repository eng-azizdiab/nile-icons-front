//partner 1
document.addEventListener('DOMContentLoaded', function() {
    const apiSource = 'https://back.nileicons.com/';
    fetch(`${apiSource}api/public/get-partner`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            
            // Access the files array from the fetched data
            const partners = data.files; 
            const swiperWrapper = document.getElementById('partner1');

            // Loop through each partner and create slides
            partners.forEach(partner => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');

                const img = document.createElement('img');
                img.src = partner.image_url; // Set the image source
                img.alt = partner.name; // Set alt text

                // Append the image to the slide
                slide.appendChild(img);
                // Append the slide to the swiper wrapper
                swiperWrapper.appendChild(slide);
            });

            // Swiper initialization has been removed as requested
        })
        .catch(error => {
            console.error('Error fetching partner data:', error);
        });
});


//partner 2
document.addEventListener('DOMContentLoaded', function() {
    const apiSource = 'https://back.nileicons.com/';
    fetch(`${apiSource}api/public/get-partner2`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            
            // Access the files array from the fetched data
            const partners = data.files; 
            const swiperWrapper = document.getElementById('partner2');

            // Loop through each partner and create slides
            partners.forEach(partner => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');

                const img = document.createElement('img');
                img.src = partner.image_url; // Set the image source
                img.alt = partner.name; // Set alt text

                // Append the image to the slide
                slide.appendChild(img);
                // Append the slide to the swiper wrapper
                swiperWrapper.appendChild(slide);
            });

            // Swiper initialization has been removed as requested
        })
        .catch(error => {
            console.error('Error fetching partner data:', error);
        });
});
