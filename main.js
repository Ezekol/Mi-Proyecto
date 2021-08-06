const listadoProductos = document.querySelector('#productos');
const cart = document.querySelector("#listedProducts tbody");
const emptyCart = document.querySelector('#emptyCart');
const searchBar = document.querySelector('#busqueda');
const cartButton = document.querySelector('#carro');
const cartSection = document.querySelector('.cartSection');
const cartContainer = document.querySelector('.cartContainer');
const sendCart = document.querySelector('#sendCart');
const notification = document.querySelector('.notification-container')
const notificationText = document.querySelector('.notification-container h3')

let pedido = [];

listadoProductos.addEventListener('click', agregarProducto);
cart.addEventListener('click', borrarProducto);
emptyCart.addEventListener('click', vaciarCarro);
searchBar.addEventListener('submit', buscarProductos);
cartButton.addEventListener('click', abrirCarrito);
sendCart.addEventListener('click', enviarCarrito)

document.addEventListener('DOMContentLoaded', () => {

    const pedidoStorage = JSON.parse(localStorage.getItem('pedido'));
    
    if (pedidoStorage) {
        pedido = [...pedidoStorage];
        mostrarCarrito();
    }
  
    mostrarProductos(productos);
  
});
  
cargarProductos();

function buscarProductos(e) {
    
    e.preventDefault();

    const inputBuscador = document.querySelector('#searchbar').value;
    const inputFiltrado = inputBuscador.trim().toLowerCase();
    const resultado = productos.filter(producto => producto.name.toLowerCase().includes(inputFiltrado));
	
	$("#productos").slideUp("slow");

    setTimeout(function(){
		mostrarProductos(resultado)}, 500);

	$("#productos").slideDown("slow");
    searchbar.reset();
}

function vaciarCarro() {
	pedido = [];
	cartContainer.classList.toggle('cartContainerOpened');
}

function borrarProducto(e) {
	
    e.preventDefault();

	if (e.target.classList.contains("delete")) {

		const productId = e.target.getAttribute('data-id');
		pedido = pedido.filter(producto => producto.id !== productId);

		pedido.length > 0 ? mostrarCarrito() : cartContainer.classList.toggle('cartContainerOpened');

	}
}

function showNotif(message){

	notificationText.innerHTML= message;

	notification.classList.toggle('notification-container-opened');

	setTimeout(function(){
		notification.classList.toggle('notification-container-opened');}, 900);
}

function agregarProducto(e) {
	
    e.preventDefault();

	if (e.target.classList.contains("addProduct")) {
		
        const card = e.target.parentElement.parentElement;
		productDetails(card);

		showNotif("Producto Agregado!");

	}

}

function productDetails(card) {

	const productoAgregado = {
		nombre: card.querySelector('h4').textContent,
		precio: card.querySelector('#precio').textContent,
		cantidad: 1,
		id: card.querySelector('a').getAttribute('data-id')
	};

	const isThere = pedido.some(function (producto) {
		return producto.id === productoAgregado.id;
	});

	if (isThere) {
		const newCart = pedido.map(producto => {
			if (producto.id === productoAgregado.id) {
                
                producto.cantidad++;
				producto.precio = `$${Number(productoAgregado.precio.slice(1)) * producto.cantidad}`

			} 

			return producto;

		});
		pedido = [...newCart];

	} else {
		pedido = [...pedido, productoAgregado];
	}

	mostrarCarrito();
}

function updateStorage() {
	localStorage.setItem('pedido', JSON.stringify(pedido));
}

function mostrarCarrito() {

	deleteCart();

	pedido.forEach(producto => {

		const row = document.createElement('tr');
		row.innerHTML = `
		<td class="cartProduct">${producto.nombre}</td>
		<td class="cartPrice">${producto.precio}</td>
		<td class="cartQuantity">${producto.cantidad}</td>
		<td class="cartDelete">
			<a href="#" class="delete" data-id="${producto.id}">X</a>
		</td>
		`
		cart.appendChild(row);
	});

	updateStorage();
}

function deleteCart() {

	while (cart.firstChild) {
		cart.removeChild(cart.firstChild);
	}

}

function abrirCarrito() {

	if(pedido.length == 0)	return;

	cartContainer.classList.toggle('cartContainerOpened');

}

function enviarCarrito () {

	pedido = [];
	cartContainer.classList.toggle('cartContainerOpened');

	showNotif("Pedido Realizado! Redireccionando...")

}