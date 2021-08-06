let productos = [];

function mostrarProductos(productos) {

	listadoProductos.innerHTML = '';
	productos.forEach(producto => {
		const {id, name, price, img} = producto;

		$("#productos").append(
			`
				<div class="product${id}">

					<div class="cardInfo">
						<h4>${name}</h4>
						<p id="precio">$${price}</p>
						<img src="${img}" class="productImg">
						<a href="#" class="addProduct" data-id="${id}">Agregar Al Carrito</a>
					</div>

				</div>
				`
		);
        
	});
}

function cargarProductos() {

$.ajax({
    type: "GET",
    url: "http://127.0.0.1:5500/productos.json",
    dataType: "JSON",
    success: function (response) {
        productos = response;
        mostrarProductos(productos);
    }
})

}
