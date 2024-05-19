const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // Toggle the class to show/hide the menu links
    navLinks.classList.toggle('active');
});



//----------------------------------------------------------------------------------------------------



const pathName = window.location.pathname;
const pageName = pathName.split("/").pop();

// Function to add active class to the corresponding navigation item
function setActivePage() {
    const navLinks = document.querySelectorAll('nav li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === pageName) {
            link.parentElement.classList.add('active');
        }
    });
}

// Call the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', setActivePage);





const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    let errorMessage = "";

    if (nameInput.value === "") {
        errorMessage += "Please enter your name. \n";
    }

    if (emailInput.value === "") {
        errorMessage += "Please enter your email address. \n";
    }

    if (ageInput.value === "") {
        errorMessage += "Please enter your age. \n";
    }


    if (errorMessage) {
        alert(errorMessage); // Display error message if any
        return; // Exit function if there are errors
    }

    // All fields are filled, display success message
    alert(`Dear ${nameInput.value}, thank you for Signing Up with us, the recommended results will be shown in a while.`);
});

