//menu script
const menu = document.getElementById('menu');
const menuButton = document.getElementById('menu-button');
const menuItems = document.querySelectorAll('.menu-items li');
const originalTexts = [];
let isMenuExpanded = false;
// Store the original texts
menuItems.forEach((item, index) => {
  originalTexts.push(item.textContent.trim());
  item.textContent = originalTexts[index][0];
});

// Function to save the menu expansion state in local storage
function saveMenuState() {
    localStorage.setItem('isMenuExpanded', isMenuExpanded);
}

// Function to load the menu expansion state from local storage
function loadMenuState() {
    const state = localStorage.getItem('isMenuExpanded');
    if (state === 'true') {
        toggleMenu(); // Expand the menu
    }
}

// Load the menu state when the page loads
loadMenuState();

// Button to expand and collapse the menu
menuButton.addEventListener('click', toggleMenu);

function toggleMenu() {
    isMenuExpanded = !isMenuExpanded;
    saveMenuState();

    if (!isMenuExpanded) {
        menu.style.width = '4%'; // Collapse the menu to 4%
        menuButton.textContent = '˅'; // Change the button content back to "˅"
        menuItems.forEach((item, index) => {
            let text = originalTexts[index].substring(1); // Use the original text starting from the second character
            item.textContent = originalTexts[index][0]; // Keep the first letter

            let timer = 0;
            for (let i = text.length - 1; i >= 0; i--) { // Change removal order, start from the end
                setTimeout(() => {
                    item.textContent = originalTexts[index][0] + text.substr(0, i);
                }, timer);
                timer += 50; // Adjust the delay for the animation speed
            }
        });
    } else {
        menu.style.width = '12%'; // Expand the menu to 12%
        menuButton.textContent = '>'; // Change the button content to ">"
        menuItems.forEach((item, index) => {
            let text = originalTexts[index].substring(1); // Use the original text starting from the second character
            item.textContent = originalTexts[index][0]; // Keep the first letter

            let timer = 0;
            for (let i = 0; i < text.length; i++) {
                setTimeout(() => {
                    item.textContent += text[i];
                }, timer);
                timer += 50; // Adjust the delay for the animation speed
            }
        });
    }
}


// Add click event listeners to each menu item
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Get the data-href attribute to determine the destination URL
        const destination = item.getAttribute('data-href');
        if (destination) {
            // Navigate to the destination URL
            window.location.href = destination;
        }
    });
});
