
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArrays = []
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
// unflash API
const count = 10;
const apiKey = '8ydB96b4FfSJi23uHo1dxwT0cWqXWnFzZMPruJq9igc'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        // loader.hidden = true
        console.log('ready', ready); s
    }
}

// helper funtion to set attribute
const setattributeHelp = (element, attribute) => {
    for (key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}

// create Element for Links and photos, add to DOM
const displayPhotos = () => {
    imagesLoaded = 0
    totalImages = photoArrays.length;
    console.log(totalImages);
    //loop through data
    photoArrays.forEach(photo => {
        //create <a> to link to Unflash
        const item = document.createElement('a');
        setattributeHelp(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //crate image tag
        const image = document.createElement('img');
        setattributeHelp(image, {
            src: photo.urls.regular,
            alt: photo.alt_description
        })
        // Event listener
        image.addEventListener('load', imageLoaded);

        // put img inside <a> then inside image container
        item.appendChild(image)
        imageContainer.appendChild(item);
    })
}

// get photos from Unflash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photoArrays = await response.json();
        displayPhotos();

    } catch (err) {

    }
}

// scroll near bottom, load more
// window.scrollY = distance form top of pasge user has scroll
// window.innerHeight: total height of browser
// document.body.offsetHeight: height of everthing in body, including what not within view
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos();
    }
})


//on load
