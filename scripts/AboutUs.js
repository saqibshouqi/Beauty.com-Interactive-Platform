


// Navigation bar 

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // Toggle the class to show/hide the menu links
    navLinks.classList.toggle('active');
});








// About us page font increase and decrease function



// Function to change font size of paragraphs and headings based on action ('increase' or 'decrease')
function fontChange(action) {
    // Get all paragraphs, h1, and h2 elements
    let elements = document.querySelectorAll('p, h1, h2');


    // Loop through each element
    elements.forEach(function(element) {
        // Get the current font size of the element
        let currentFontSize = parseInt(window.getComputedStyle(element, null).getPropertyValue('font-size'));

        // Check the tag name of the element and adjust font size accordingly
        if (element.tagName === 'H1') {
            // Adjust font size for h1 elements
            if (action === 'increase') {
                element.style.fontSize = Math.min(currentFontSize * 1.05, 70) + 'px'; // Increase font size up to 70px
            } else if (action === 'decrease') {
                element.style.fontSize = Math.max(currentFontSize * 0.97, 45) + 'px'; // Decrease font size down to 45px
            }


        } else if (element.tagName === 'P') {
            // Adjust font size for p elements
            if (action === 'increase') {
                element.style.fontSize = Math.min(currentFontSize * 1.1, 24) + 'px'; // Increase font size up to 24px
            } else if (action === 'decrease') {
                element.style.fontSize = Math.max(currentFontSize * 0.95, 15) + 'px'; // Decrease font size down to 15px
            }


        } else if (element.tagName === 'H2') {
            // Adjust font size for h2 elements
            if (action === 'increase') {
                element.style.fontSize = Math.min(currentFontSize * 1.05, 60) + 'px'; // Increase font size up to 60px
            } else if (action === 'decrease') {
                element.style.fontSize = Math.max(currentFontSize * 0.97, 40) + 'px'; // Decrease font size down to 40px
            }
        }
    });
}