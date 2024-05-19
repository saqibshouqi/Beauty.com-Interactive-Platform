const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // Toggle the class to show/hide the menu links
    navLinks.classList.toggle('active');
});



//----------------------------------------------------------------------------------------------------

// Add event listeners to each thumbnail image
const thumbnails = document.querySelectorAll('.gallery img');
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const selectedImage = document.getElementById('selected-image');
        selectedImage.src = thumbnail.src;
        const description = document.getElementById('description');
        description.textContent = thumbnail.dataset.description;


        // Update the description style on click
        description.style.backgroundColor = 'black';
        description.style.color = 'white';
        description.style.fontSize = '1.5em';








    });
});




const pathName = window.location.pathname;
const pageName = pathName.split("/").pop();

// Call the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', setActivePage);