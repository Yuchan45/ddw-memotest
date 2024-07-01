const menu = document.querySelector('#menu');
const menuOverlay = document.querySelector('.menu-overlay');
const menuItems = document.querySelectorAll('.items > li > a');

let menuOpen = false;
menu.addEventListener('click', function () {
  if (!menuOpen) {
    setCrossIcon();
    showMenu();
    menuOpen = true;
  } else {
    setHamburgerIcon();
    hideMenu();
    menuOpen = false;
  }
});

// When onClick on any item of the menu, hide it.
menuItems.forEach((item) => {
  item.addEventListener('click', handleCloseMenu);
});

function setCrossIcon() {
  menu.classList.remove('fa-bars');
  menu.classList.remove('fa');
  menu.classList.add('fa');
  menu.classList.add('fa-close');
  menu.classList.add('close-icon');
}

function setHamburgerIcon() {
  menu.classList.remove('fa');
  menu.classList.remove('fa-close');
  menu.classList.remove('close-icon');
  menu.classList.add('fa-bars');
  menu.classList.add('fa');
}

function showMenu() {
  menuOverlay.classList.remove('hidden-menu');
  menuOverlay.classList.add('active-menu');
}

function hideMenu() {
  menuOverlay.classList.remove('active-menu');
  menuOverlay.classList.add('hidden-menu');
}

function handleCloseMenu() {
  setHamburgerIcon();
  hideMenu();
}
