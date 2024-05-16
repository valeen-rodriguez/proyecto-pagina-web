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

///// CARRITO ///////
const contGrid = document.querySelector(".contGrid");
const tablaCarr = document.querySelector('.tablacarr');
const btnC = document.querySelector('.comprarTodo');

try {
    Promise.all([
        fetch('../data/productosAll.json').then(respuesta => respuesta.json()),
        fetch('../data/pruductosData.json').then(respuesta => respuesta.json()),
        fetch('../data/pruductosManga.json').then(respuesta => respuesta.json()),
        fetch('../data/pruductosRopa.json').then(respuesta => respuesta.json())
    ])
    .then(datos => {
        datos.forEach(productos => {
            productos.forEach(producto => {
                let productoElem = document.createElement('div');
                let imgCont = document.createElement('div');
                let img = document.createElement("img");
                let contenido = document.createElement('div');
                let titulo = document.createElement('h2');
                let precio = document.createElement('p');
                let addCarr = document.createElement('button');

                productoElem.setAttribute('class', 'producto');
                imgCont.setAttribute('class', 'imgCont');
                img.setAttribute('src', producto.img);
                img.setAttribute('alt', 'Imagen de representacion');
                contenido.setAttribute('class', 'contenido');
                titulo.setAttribute('class', 'titulo');
                precio.setAttribute('class', 'precio');
                titulo.innerHTML = producto.nombre;
                precio.innerHTML = producto.precio + "$";

                addCarr.setAttribute('class', 'btnAddCarr');
                addCarr.innerHTML = 'Añadir al carrito';
                addCarr.dataset.index = producto.id;

                productoElem.appendChild(imgCont);
                imgCont.appendChild(img);
                productoElem.appendChild(contenido);
                contenido.appendChild(titulo);
                contenido.appendChild(precio);
                contenido.appendChild(addCarr);
                contGrid.appendChild(productoElem);

                addCarr.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productoIndex = e.target.dataset.index;
                    const tr = document.createElement('tr');
                    const tdUno = document.createElement('td');
                    const tdDos = document.createElement('td');
                    tdUno.setAttribute('class', 'obtjst');
                    tr.setAttribute('class', 'trJs');
                    tdUno.innerHTML = producto.nombre;
                    tdDos.innerHTML = producto.precio;

                    const tdGen = document.querySelectorAll('.obtjst');

                    if (tdGen.length === 0) {
                        tr.appendChild(tdUno);
                        tr.appendChild(tdDos);
                        tablaCarr.appendChild(tr);
                    } else {
                        let productoEncontrado = false;
                        tdGen.forEach((elem) => {
                            if (elem.innerHTML === producto.nombre) {
                                alert("El elemento se ha agregado al carrito");
                                productoEncontrado = true;
                            }
                        });
                        if (!productoEncontrado) {
                            tr.appendChild(tdUno);
                            tr.appendChild(tdDos);
                            tablaCarr.appendChild(tr);
                        }
                    }
                });
            });
        });
    })
    .catch(error => {
        console.error('Error', error);
    });
} catch (e) {
    console.error('Error', e);
}

//// BOTON BORRAR CARRITO ////
btnC.addEventListener('click', async (e) => {
    try {
        const response = await fetch('/products/removeAllFromCart', {
            method: 'POST',
        });
        console.log('Se recibio respuesta', response);
        if (response.ok) {
            console.log('Eliminando productos');
            window.location.href = '/products/carrito';
        } else {
            console.error('Error eliminar del carrito:', response.statusText);
            alert('Hubo un error al eliminar los elementos del carrito');
        }
    } catch (error) {
        console.error('Error con los datos del carrito:', error);
    }
});

// FINALIZAR COMPRA & VALIDACIONES //
const btnConfirmarCompra = document.querySelector('.comprarFinalizada');

btnConfirmarCompra.addEventListener('click', async (e) => {
    const nombreCompleto = document.querySelector('input[name="nombre_completo"]').value;
    const telefono = document.querySelector('input[name="telefono"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const direccion = document.querySelector('input[name="direccion"]').value;

    if (!nombreCompleto || !telefono || !email || !direccion) {
        Swal.fire({
            icon: 'warning',
            title: '¡Campos incompletos!',
            text: 'Por favor, completa todos los campos para finalizar la compra.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    try {
        const response = await fetch('/products/removeAllFromCart', {
            method: 'POST',
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                text: 'Sigue los pasos concisos enviados al email',
                confirmButtonText: 'Aceptar',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Por favor, inténtalo de más tarde.',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        console.error('datos del carrito:', error);
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Por favor, inténtalo de más tarde.',
            confirmButtonText: 'Aceptar'
        });
    }
});