
// Navigation bar 

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // Toggle the class to show/hide the menu links
    navLinks.classList.toggle('active');
});




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Event listeners for cart button and close button
document.addEventListener('DOMContentLoaded', () => {
    let cartButton = document.querySelector('.cart_button'); 
    let cart = document.querySelector('.cart');
    let closeCart = document.querySelector('.cart_close');

    cartButton.addEventListener('click', () => {
        cart.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cart.classList.remove('active');   // Hide cart
    });

    // Event listener for showing product preview
    document.getElementById('clickable-image').addEventListener('click', () => {
        document.getElementById('product-preview').style.display = 'block';
    });
});




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






// Function to toggle 1 popups and blur effect
function toggle() {
    let blur = document.getElementById('blur');
    blur.classList.toggle('active'); // Toggle blur effect

    let popups = document.getElementsByClassName('popup');
    for (let i = 0; i < popups.length; i++) {
        popups[i].classList.toggle('active'); // Toggle popup visibility
    }

    // Close cart if it's open
    let cart = document.querySelector('.cart');
    if (cart.classList.contains('active')) {
        cart.classList.remove('active');
    }
}





//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




// Function to toggle 2 popup and blur effect based on filled details
function toggle2() {
    let blur = document.getElementById('blur');
    let popups = document.getElementsByClassName('popup2');

    // Check if details are filled
    let firstName = document.querySelector('.Name:nth-of-type(1)').value.trim();
    let lastName = document.querySelector('.Name:nth-of-type(2)').value.trim();
    let address = document.querySelector('.address').value.trim();
    let email = document.querySelector('.email').value.trim();

    if (firstName === '' || lastName === '' || address === '' || email === '') {
        alert('Please fill in all required fields (First name, Last name, email and Address)');
    } else {
        if (blur.classList.contains('active')) {
            // If blur is already active, only toggle popup2 visibility
            for (let i = 0; i < popups.length; i++) {
                popups[i].classList.toggle('active'); // Toggle popup2 visibility
            }
        } else {
            // If blur is not active, toggle both blur and popup2 visibility
            blur.classList.add('active'); // Activate blur effect
            for (let i = 0; i < popups.length; i++) {
                popups[i].classList.add('active'); // Show popup2
            }
        }

        // Close cart if it's open
        let cart = document.querySelector('.cart');
        if (cart.classList.contains('active')) {
            cart.classList.remove('active');
        }
    }
}






//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





// Function to toggle 3 popup visibility and blur effect
function toggle3(){
    let blur = document.getElementById('blur');
    let popup3 = document.querySelector('.popup3');

    blur.classList.add('active');
    popup3.classList.add('active');
}



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Function to close all popups and remove blur effect
function closeAllPopups() {
    let popups = document.querySelectorAll('.popup, .popup2, .popup3'); // Select all popups
    popups.forEach(function(popup) {
        popup.classList.remove('active'); // Hide popups
    });

    // Remove active class from the blur element
    let blur = document.getElementById('blur');
    blur.classList.remove('active');
}






//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





// Execute code when document is ready
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}


// Function to initialize event listeners when document is ready
function ready() {

    // Event listeners for removing items from cart and changing quantity
    let removeCartButtons = document.getElementsByClassName('remove');
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }


    let quantityInputs = document.getElementsByClassName('cart_quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

     // Event listener for adding items to cart
    let addCart = document.getElementsByClassName('product_button_1');
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






// Function to remove an item from the cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






// Function to handle quantity changes in the cart
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





// Function to add an item to the cart
function addCartClicked(event) {
    let button = event.target;
    let shopProduct = button.parentElement;
    let title = shopProduct.getElementsByClassName('product_titel')[0].innerText; // Corrected typo
    let price = shopProduct.getElementsByClassName('price')[0].innerText; // Corrected typo
    let productImg = shopProduct.getElementsByClassName('product_img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





// Function to add a product to the cart
function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart_box');
    let cartItem = document.getElementsByClassName('cart_content')[0];
    let cartItemNames = cartItem.getElementsByClassName('cart_product_title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].textContent.trim() === title.trim()) {
            alert('You have already added this item to the cart');
            return;
        }
    }



    // HTML content for cart item
    let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart_img_custom">
    <div class="detail_box">
        <div class="cart_product_title">${title}</div>
        <div class="cart_price">${price}</div>
        <input type="number" value="1" class="cart_quantity">
    </div>
    <button type="button" class="remove">Remove</button>`;


    cartShopBox.innerHTML = cartBoxContent;
    cartItem.appendChild(cartShopBox);
    cartShopBox.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart_quantity')[0].addEventListener('change', quantityChanged);
}



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Geting quiz scores to get discounts on products
const userPoints = localStorage.getItem('userPoints');

// Function to update total and ordered details
function updateTotal() {
    let discountPercentage = userPoints; // Example: If discount is 10%, set discountPercentage = 10

    let cartContent = document.getElementsByClassName('cart_content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart_box');
    let totalWithoutDiscount = 0;
    let totalWithDiscount = 0;
    let orderedDetails = ""; // Initialize empty string for ordered details
    let totalDiscount = 0; // Initialize total discount letiable

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let title = cartBox.getElementsByClassName('cart_product_title')[0].innerText;
        let price = cartBox.getElementsByClassName('cart_price')[0].innerText;
        let quantity = cartBox.getElementsByClassName('cart_quantity')[0].value;
        let subtotal = parseFloat(price.replace('Rs.', '')) * quantity;

        // Calculate total without discount
        totalWithoutDiscount += subtotal;

        // Apply discount if available
        let discountAmount = subtotal * (discountPercentage / 100); // Calculate discount amount
        let discountedSubtotal = subtotal - discountAmount; // Subtract discount amount from subtotal
        totalDiscount += discountAmount; // Accumulate discount amount
        totalWithDiscount += discountedSubtotal;

        // Append ordered details for each item
        orderedDetails += "<p>" + title + " - " + price + " x " + quantity;
        if (discountAmount) {
            orderedDetails += " (Discount: " + discountPercentage + "% - Rs." + discountAmount + ".00" + ")";
        }
        orderedDetails += "</p>";
    }
    totalWithoutDiscount = Math.round(totalWithoutDiscount * 100) / 100;
    totalWithDiscount = Math.round(totalWithDiscount * 100) / 100;
    totalDiscount = Math.round(totalDiscount * 100) / 100; // Round total discount

    // Update total without discount
    document.getElementsByClassName('total_price')[0].innerText = 'Rs.' + totalWithoutDiscount + ".00";

    // Update total with discount in popup2 along with the name
    document.querySelector('.popup2 .total_price_with_discount').innerText = 'Total price with discount: Rs.' + totalWithDiscount+'.00';

    // Update ordered details inside popup2
    document.querySelector('.popup2 .ordered_details').innerHTML = orderedDetails;

    // Print total discount in popup2
    document.querySelector('.popup2 .discount_print').innerText = 'Total discount is Rs.' + totalDiscount+'.00';

    // Display discount separately in popup2
    document.querySelector('.popup2 .discount').innerText = discountPercentage + "%";

}

// Call updateTotal function initially
updateTotal();

