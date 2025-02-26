/////////////////////////// desktop navigation menu ///////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const mainMenuItems = document.querySelectorAll('.nav-links li');
    const subOptionsContainer = document.getElementById('sub-options-container');

    let activeDropdown = null;

    mainMenuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const targetId = item.getAttribute('data-target');
            const columns = document.getElementById(targetId);

            // Reset the content container and insert new columns
            subOptionsContainer.innerHTML = ''; 

            if (columns) {
                const columnsClone = columns.cloneNode(true);
                columnsClone.style.display = 'flex'; // Ensure visibility

                // Show all child columns
                columnsClone.querySelectorAll('.column').forEach(column => {
                    column.style.display = 'block';
                });

                subOptionsContainer.appendChild(columnsClone);
                subOptionsContainer.style.display = 'block';
                activeDropdown = columnsClone;
            }
        });
    });

    // Handle hiding on mouse leave
    [subOptionsContainer, document.querySelector('.menu-section')].forEach(element => {
        element.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!subOptionsContainer.matches(':hover') && !document.querySelector('.menu-section').matches(':hover')) {
                    subOptionsContainer.innerHTML = '';
                    subOptionsContainer.style.display = 'none';
                    activeDropdown = null;
                }
            }, 150);
        });
    });
});
////////////////////////// mobile navigation ///////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    // Toggle mobile menu visibility
    hamburgerMenu.addEventListener("click", () => {
        mobileMenu.style.display = mobileMenu.style.display === "none" || mobileMenu.style.display === "" ? "flex" : "none";
    });

    // Handle click Wydarzenia for all parent menu links (to toggle sub-options)
    document.querySelectorAll(".mobile-menu > ul > li > a").forEach((link) => {
        link.addEventListener("click", function (e) {
            const parentLi = this.parentElement;
            const submenu = parentLi.querySelector(".mobile-sub-options");

            if (submenu) {
                if (!e.target.classList.contains("arrow")) {
                    return; // Allow navigation if clicking directly on the link text
                }

                e.preventDefault(); // Prevent navigation only when clicking the arrow
                const isOpen = parentLi.classList.contains("open");

                if (!isOpen) {
                    closeOtherMenus(parentLi);
                }

                parentLi.classList.toggle("open", !isOpen);

                const arrow = this.querySelector(".arrow");
                if (arrow) {
                    arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";
                }
            }
        });
    });

    // Handle click Wydarzenia for submenu links to toggle their child options
    document.querySelectorAll(".mobile-menu .mobile-sub-options > li > a").forEach((link) => {
        link.addEventListener("click", function (e) {
            const parentLi = this.parentElement;
            const childMenu = parentLi.querySelector(".mobile-child-options");

            // If there is a child menu (deeper level)
            if (childMenu) {
                e.preventDefault(); // Prevent default link action
                const isOpen = parentLi.classList.contains("open");

                // Toggle the current child menu
                parentLi.classList.toggle("open", !isOpen);

                // Rotate arrow for child menus
                const arrow = this.querySelector(".arrow");
                if (arrow) {
                    arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";
                }
            }
        });
    });

    // Close all other menus except the current branch (parent and child)
    function closeOtherMenus(currentParent) {
        const allOpenMenus = document.querySelectorAll(".mobile-menu li.open");
        allOpenMenus.forEach((li) => {
            if (!currentParent.contains(li)) {
                li.classList.remove("open");
                const arrow = li.querySelector(".arrow");
                if (arrow) {
                    arrow.style.transform = "rotate(0deg)";
                }
            }
        });
    }
});
// Function to toggle the mobile language visibility
function toggleMenu() {
    const menuOptions = document.getElementById('menuOptions');
    const menuIcon = document.querySelector('.menu-icon');

    // Toggle the visibility of the menu options
    menuOptions.classList.toggle('show');

    // Toggle the animation of the menu icon
    menuIcon.classList.toggle('open');
};
//////////////////Animation for Donate mobile button//////////////////////

const donateButton = document.getElementById('mobile-donate-btn');
const letter = document.getElementById('mobile-donate-letter');

// Define initial and final positions for the button and letter
const initialButtonPosition = 'translateX(-70px)';  // Initial position for the button
const finalButtonPosition = 'translateX(15px)'; // Final position for the button (after click)
const letterHidePosition = 'translateX(-70px)'; // Position for the letter (moves to the left and hides)
const hrefValue = "https://www.example.com/donate";

// Function to move the button and hide the letter
function moveToStartPosition() {
    donateButton.style.transform = finalButtonPosition; // Move to final position (0px)
    letter.style.transform = letterHidePosition; // Move the letter to the left and hide it
    letter.style.opacity = 0; // Hide the letter

    setTimeout(() => {
        assignHref(); // Assign href after 0.5 seconds
    }, 500);

    setTimeout(() => {
        moveToInitialPosition(); // Reset positions after 3 seconds
    }, 3000);
}

// Function to reset to the initial position for both button and letter
function moveToInitialPosition() {
    donateButton.style.transform = initialButtonPosition;
    letter.style.transform = 'translateX(0)'; // Reset letter position
    letter.style.opacity = 1; // Make letter visible again
    removeHref(); // Remove href after returning to initial position
}

// Function to assign the href
function assignHref() {
    donateButton.setAttribute('href', hrefValue);
}

// Function to remove the href
function removeHref() {
    donateButton.removeAttribute('href');
}

// Add event listener for the letter click event
letter.addEventListener('click', () => {
    moveToStartPosition(); // Trigger movement when the letter is clicked
});

// Add event listener for the button click event
donateButton.addEventListener('click', (event) => {
    // Check if the button has an href
    if (!donateButton.hasAttribute('href')) {
        event.preventDefault(); // Prevent navigation if href isn't set
        moveToStartPosition(); // Trigger movement on click
    }
});

// Set the initial position when the page loads
donateButton.style.transform = initialButtonPosition;

