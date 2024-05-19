const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // Toggle the class to show/hide the menu links
    navLinks.classList.toggle('active');
});

// Show popup menu function
function showPopup() {
    if (validateForm()) {
        // Retrieve values from the form
        let firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var subject = document.getElementById("subject").value;
        var queryDetails = document.getElementById("queryDetails").value;

        // Construct HTML content for the popup
        var popupContent = `
        <div class="popup-content">
            <span class="popup-close" onclick="closePopup()">X</span>
            <h2>Summary:</h2>
            <p>Name: ${firstName} ${lastName}</p>
            <p>Email: ${email}</p>
            <p>Subject: ${subject}</p>
            <p>Details: ${queryDetails}</p>
        </div>
    `;

        var popupContainer = document.getElementById("popupContainer");
        popupContainer.classList.add("active");

        // Set the popup content
        popupContainer.innerHTML = popupContent;

        // Display the popup
        popupContainer.style.display = "block";

        // Code to show popup or submit the form goes here
        alert("Form submitted successfully!"); // For demonstration purpose
    }
}



// Validate compulsory fields
function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var queryDetails = document.getElementById("queryDetails").value;

    if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || subject.trim() === "" || queryDetails.trim() === "") {
        alert("Please fill all fields.");
        return false;
    }

    return true;
}



// Function to close the popup
function closePopup() {
    var popupContainer = document.getElementById("popupContainer");
    popupContainer.classList.remove("active");
    popupContainer.innerHTML = ''; // Clear the popup content
    popupContainer.style.display = "none";
}
