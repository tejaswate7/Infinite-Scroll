const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []

// Unsplash API
const count = 30;
const apiKey = 'sVzVkVFmh9tPBCmwAE_iG_UX6Ku1Q7p6NYTEwSMQoR8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true
    }

}

// Create elements for displaying photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length
    photosArray.forEach((photo) => {
        // Create <a> tag to link to Unsplash
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank')
        // Create <img> tag for photo
        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular)
        img.setAttribute('alt', photo.alt_description)
        img.setAttribute('title', photo.alt_description)
        // Check when each image has finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a> and both inside imageContainer
        item.appendChild(img)
        imageContainer.appendChild(item)

    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    }
    catch(error) {

    }
}
//Check to see if scroll near bottom of the page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready =  false
        getPhotos()
    }
})


// On Load
getPhotos();

