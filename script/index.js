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

document.addEventListener("DOMContentLoaded", function () {
                const menu = document.getElementById("mobile-menu");
                const openBtn = document.getElementById("hamburger-menu");
                const donateBtn = document.getElementById("mobile-donate-btn");

                openBtn.addEventListener("click", function () {
                    menu.classList.toggle("active");

                    if (menu.classList.contains("active")) {
                        donateBtn.style.display = "block";
                        setTimeout(() => donateBtn.classList.add("active"), 10);
                    } else {
                        donateBtn.classList.remove("active");
                        setTimeout(() => donateBtn.style.display = "none", 300);
                    }
                });
            });

