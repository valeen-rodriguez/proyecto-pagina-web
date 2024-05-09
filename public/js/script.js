//SCRIPT para desplegable
document.addEventListener('DOMContentLoaded', function() {
    const productosMenu = document.querySelector('.productos-nav');
    const submenu = productosMenu.querySelector('.submenu');
  
    productosMenu.addEventListener('mouseenter', function() {
      submenu.style.display = 'block';
    });
  
    productosMenu.addEventListener('mouseleave', function() {
      submenu.style.display = 'none';
    });
  });


/////// REDIRECCION ///////
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  window.location.href = "/";
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  window.location.href = "/";
});

///// SWEETALERT ///////