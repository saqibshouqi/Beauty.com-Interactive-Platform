// Function to fetch product data and print sorted product names
function fetchAndPrintProducts() {
    fetch('product.xml')
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
            printSortedProductNames(xmlDoc);
            populateDropdown(xmlDoc);
        })
        .catch(error => console.error('Error fetching XML:', error));
}


// Function to print sorted product names and images
function printSortedProductNames(xmlDoc) {
    const products = xmlDoc.getElementsByTagName('product');
    const productsArray = Array.from(products);

    productsArray.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('rating').textContent);
        const ratingB = parseFloat(b.querySelector('rating').textContent);
        return ratingB - ratingA; // Sort in descending order
    });

    const recommendedProductsList = document.getElementById('recommendedProducts');

    // Clear any existing content in the recommendedProductsList
    recommendedProductsList.innerHTML = '';

    productsArray.forEach((product, index) => {
        const name = product.querySelector('name').textContent;
        const imageSrc = `./Products (2)/Products/productImage${index + 1}.jpg`; // Assuming image names are like "image1.jpg", "image2.jpg", etc.
        
        const card = document.createElement('div'); // Create a div for each product
        card.classList.add('product-card'); // Add class for styling
        
        const image = document.createElement('img'); // Create an image element
        image.classList.add('product-image'); // Add class for styling
        image.src = imageSrc;
        image.alt = name; // Set alt attribute for accessibility
        
        const text = document.createElement('p'); // Create a paragraph for product name
        text.textContent = name;

        card.appendChild(image); // Append image to the card
        card.appendChild(text); // Append text to the card
        recommendedProductsList.appendChild(card);
    });
}


// Function to populate dropdown menu with product names
function populateDropdown(xmlDoc) {
    const products = xmlDoc.getElementsByTagName('product');
    const productDropdown = document.getElementById('productDropdown');

    Array.from(products).forEach(product => {
        const name = product.querySelector('name').textContent;
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        productDropdown.appendChild(option);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for the Add Review button
    const addReviewButton = document.querySelector('input[value="Submit Review"]');
    if (addReviewButton) {
        addReviewButton.addEventListener('click', function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();
            
            // Check if all required fields are filled
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const comment = document.getElementById('comment').value;

            if (name.trim() === '' || email.trim() === '' || comment.trim() === '') {
                // Display an alert if any required field is empty
                alert('Please fill in all required fields.');
            } else {
                // If all required fields are filled, navigate to addReview.html
                window.location.href = 'addReview.html'; // Replace with the desired page URL
            }
        });
    }

    // Add event listener for the Subscribe button
    const subscribeButton = document.querySelector('input[value="Subscribe"]');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            // Get the selected product from the dropdown
            const selectedProduct = document.getElementById('productDropdown').value;
            if (!selectedProduct) return;

            // Display a message thanking the user for subscribing with the product name
            const subscribeMessage = `Thank you for subscribing to ${selectedProduct}!`;
            alert(subscribeMessage);

            // Change the button color and text to "Subscribed"
            subscribeButton.style.backgroundColor = '#ccc'; // Change to the desired color
            subscribeButton.value = 'Subscribed';
            subscribeButton.disabled = true; // Disable the button to prevent further clicks
        });
    }
});

// Toggle menu links
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fetch and print products
fetchAndPrintProducts();




// Slider functionality
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.list');
let thumbnail = document.querySelector('.thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');
let currentIndex = 0; // Initialize the current index

// Function for next button 
if (nextBtn) {
    nextBtn.onclick = function() {
        moveSlider('next');
    }
}

// Function for prev button 
if (prevBtn) {
    prevBtn.onclick = function() {
        moveSlider('prev');
    }
}

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');

    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        slider.classList.add('next');
        currentIndex = (currentIndex + 1) % sliderItems.length; // Update current index
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        slider.classList.add('prev');
        currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length; // Update current index
    }

    slider.addEventListener('animationend', function() {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, { once: true }); // Remove the event listener after it's triggered once
}

// Add click event listener to thumbnail items
thumbnailItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (index !== currentIndex) {
            moveSliderToIndex(index);
        }
    });
});

function moveSliderToIndex(index) {
    if (index !== currentIndex) {
        const diff = index - currentIndex;
        const direction = diff > 0 ? 'next' : 'prev';
        const absDiff = Math.abs(diff);
        
        for (let i = 0; i < absDiff; i++) {
            moveSlider(direction);
        }
    }
}

// Function to fetch product data and populate slider and thumbnails
function fetchAndPopulateProducts() {
    fetch('product.xml')
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
            populateSliderAndThumbnails(xmlDoc);
        })
        .catch(error => console.error('Error fetching XML:', error));
}

function populateSliderAndThumbnails(xmlDoc) {
    const products = xmlDoc.getElementsByTagName('product');
    const sliderList = document.querySelector('.slider .list');
    const thumbnailList = document.querySelector('.thumbnail');

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const name = product.querySelector('name').textContent;
        const description = product.querySelector('description').textContent;
        const comment = product.querySelector('review comment').textContent; // Assuming comment is nested under review

        // Create a new item for the slider
        const item = document.createElement('div');
        item.classList.add('item');

        // Create image element
        const img = document.createElement('img');
        img.src = `./Products (2)/Products/productImage${i + 1}.jpg`; // Replace with actual image source
        img.alt = name;

        // Create content div
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        // Populate content div
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = name;

        const typeDiv = document.createElement('div');
        typeDiv.classList.add('type');
        typeDiv.textContent = 'Review'; // You can add type data from XML if available

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('comment');
        descriptionDiv.textContent = comment;

        // Append elements to content div
        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(typeDiv);
        contentDiv.appendChild(descriptionDiv);

        // Append image and content to item
        item.appendChild(img);
        item.appendChild(contentDiv);

        // Append item to slider list
        sliderList.appendChild(item);

        // Create a thumbnail item
        const thumbnailItem = document.createElement('div');
        thumbnailItem.classList.add('item');

        // Create thumbnail image element
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = `./Products (2)/Products/productImage${i + 1}.jpg`; // Replace with actual thumbnail image source
        thumbnailImg.alt = name;

        // Append thumbnail image to thumbnail item
        thumbnailItem.appendChild(thumbnailImg);

        // Create thumbnail text element
        const thumbnailText = document.createElement('div');
        thumbnailText.classList.add('name');
        thumbnailText.textContent = name;

        // Append thumbnail text to thumbnail item
        thumbnailItem.appendChild(thumbnailText);

        // Append thumbnail item to thumbnail list
        thumbnailList.appendChild(thumbnailItem);
    }
}


// Call the function to fetch and populate products when the page loads
document.addEventListener("DOMContentLoaded", function () {
    fetchAndPopulateProducts();
});

let currentFontSize = 16; // Initial font size

function increaseFontSize() {
    currentFontSize += 2; // Increase font size by 2px
    document.body.style.fontSize = currentFontSize + "px";
}

function decreaseFontSize() {
    currentFontSize -= 2; // Decrease font size by 2px
    document.body.style.fontSize = currentFontSize + "px";
}

 function toggleBackground() {
        var body = document.body;
        if (body.classList.contains('dark-background')) {
            body.classList.remove('dark-background');
        } else {
            body.classList.add('dark-background');
        }
    }