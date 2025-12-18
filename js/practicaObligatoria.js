const comerciales = [
  "Carmen Gómez",
  "Lucía Gil",
  "Andrés Martínez",
  "Antonio Salinas",
];

const clientes = [
  [
    "Alimentación Daniel",
    "Cash El Puerto",
    "Ultramarinos Claudia",
    "Supermercado Nazareno",
    "Alimentación Guzmán",
    "Supermercado Superprecio",
    "Kiosko La Espera",
    "M&B Alimentación",
    "Ultramarinos Vistabella",
  ],
  [
    "Ultramarinos La Delicia",
    "Supermercado La Esquinita",
    "Alimentación Gómez",
    "Supermercado El Veloz",
    "Kiosko 24h Desavío",
    "Tienda La Manchega",
    "Ultramarinos Tajo",
    "Alimentación Víctor",
  ],
  [
    "Alimentación Millán",
    "Supermercado La Guinda",
    "Kiosko Callejón",
    "Tienda Cantero",
    "Ultramarinos Mérida",
    "Alimentación Moreno",
    "Cash El Hostelero",
  ],
  [
    "Kiosko La Lumbre",
    "Tienda Abad",
    "Ultramarinos Hernández",
    "Alimentación Cervantes",
    "Cash El Panal",
    "CyR Alimentación",
    "Supermercado Los Mosqueteros",
    "Alimentación Carpanta",
    "Supermercado El Percebe",
  ],
];
const categorias = ["Aceite", "Encurtidos", "Salsas"];

const catalogo = new Catalogo();
const gestor = new Gestor();

function cargaDatosIniciales() {
  catalogo.addProducto(1, "Aceite Oliva Virgen Extra 1l (Caja 20)", 178.15, 0);
  catalogo.addProducto(2, "Aceite Oliva Virgen Extra 700ml (Caja 30)", 208.5, 0);
  catalogo.addProducto(3, "Aceite Oliva Virgen Extra 5l (Caja 6)", 247.5, 0);
  catalogo.addProducto(4, "Aceite Oliva 1l (Caja 20)", 109.25, 0);
  catalogo.addProducto(5, "Aceituna Gordal 340gr (Caja de 50)", 180.75, 1);
  catalogo.addProducto(6, "Aceituna Gordal deshuesada 350gr (Caja de 50)", 205.45, 1);
  catalogo.addProducto(7, "Aceituna Manzanilla 250 gr (Caja de 50)", 124.85, 1);
  catalogo.addProducto(8, "Aceituna Manzanilla deshuesada 250 gr (Caja de 50)", 141.35, 1);
  catalogo.addProducto(9, "Aceituna Negra 350gr (Caja de 50)", 87.5, 1);
  catalogo.addProducto(10, "Aceituna Negra deshuesada 350gr (Caja de 50)", 99.35, 1);
  catalogo.addProducto(11, "Mayonesa 350gr (Caja de 50)", 124.45, 2);
  catalogo.addProducto(12, "Mayonesa 1Kg (Caja de 30)", 178.65, 2);
  catalogo.addProducto(13, "Salsa Cocktail 350gr (Caja de 50)", 99.65, 2);
  catalogo.addProducto(14, "Salsa Gaucha 350gr (Caja de 50)", 124.85, 2);
  catalogo.addProducto(15, "Salsa Alioli 350 gr (Caja de 50)", 113.75, 2);
  catalogo.addProducto(16, "Salsa Barbacoa 500gr (Caja de 30)", 67.5, 2);
}

const estadoClientes = {};
const frmComercial = document.getElementById("frmComercial");
const comercialesSelect = frmComercial.elements["comerciales"];
const frmControles = document.getElementById("frmControles");
const categoriasSelect = frmControles.elements["categorias"];
const productosSelect = frmControles.elements["productos"];
const clientesDiv = document.getElementById("clientes");
const pedido = document.getElementById("pedido")
const pedidosGuardados = {};


function cargarFormularios() {
  for (let i = 0; i < comerciales.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = comerciales[i];
    comercialesSelect.add(option);
  }

  for (let i = 0; i < categorias.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = categorias[i];
    categoriasSelect.add(option);
  }
  cargarProductosPorCategoria(categoriasSelect.value);
  obtenerClientePorComercial(comercialesSelect.value);
}

function obtenerClientePorComercial(idComercial) {
  const clientesDelComercial = clientes[idComercial];
  const clientesAnteriores = clientesDiv.querySelectorAll(".cliente");

  clientesAnteriores.forEach(clienteDiv => {
    clienteDiv.remove();
  });

  for (let i = 0; i < clientesDelComercial.length; i++) {
    const div = document.createElement("div");
    const nombreCliente = clientesDelComercial[i];
    
    div.textContent = nombreCliente;
    div.classList.add("cliente");

    if (estadoClientes[nombreCliente] === "pendiente") {
      div.classList.add("pendiente");
    } else {
      div.classList.add("pagado");
    }
    
    div.addEventListener("click", function () {
      marcarClienteSeleccionado(div);
      limpiarPedido();
      cargarPedidoCliente(div.textContent);
    });

    clientesDiv.appendChild(div);
  }
}

function cambiarEstadoCliente(divCliente) {
  const nombreCliente = divCliente.textContent;

  if (divCliente.classList.contains("pagado")) {
    divCliente.classList.remove("pagado");
    divCliente.classList.add("pendiente");
    estadoClientes[nombreCliente] = "pendiente";
  } else {
    divCliente.classList.remove("pendiente");
    divCliente.classList.add("pagado");
    estadoClientes[nombreCliente] = "pagado";
  }
}

function marcarClienteSeleccionado(divPulsado) {
  const todosLosClientes = clientesDiv.querySelectorAll(".cliente");

  todosLosClientes.forEach(div => {
    div.classList.remove("seleccionado");
  });
  divPulsado.classList.add("seleccionado");
}

function cargarProductosPorCategoria(valorCategoria) {
  const idCategoriaSeleccionada = parseInt(valorCategoria);

  productosSelect.innerHTML = "";

  for (let i = 0; i < catalogo.productos.length; i++) {
    const producto = catalogo.productos[i];

    if (producto.idCategoria === idCategoriaSeleccionada) {

      const option = document.createElement("option");
      option.value = producto.idProducto;
      option.text = producto.nombreProducto;
      productosSelect.add(option);
    }
  }
}

function unidadesSeleccionadas() {
  const teclado = document.getElementById("teclado")
  const teclas = teclado.querySelectorAll(".tecla")

  teclas.forEach(div => {
    div.addEventListener("click", function () {
      nuevaLineaPedido(div.value);
    })
  });
}

function nuevaLineaPedido(cantidad) {
  const clienteSeleccionado = clientesDiv.querySelector(".seleccionado");
  let tabla = pedido.querySelector("table");

  if (!tabla) {
    if (clienteSeleccionado && clienteSeleccionado.classList.contains("pagado")) {
      cambiarEstadoCliente(clienteSeleccionado);
    }

    const nombreCliente = clienteSeleccionado.textContent;

    pedido.innerHTML = `
        <h1>Pedido</h1>
        <h2>${nombreCliente}</h2>
        <h2 class="totalPedido"></h2>
        <button id='btnLimpiarPedido' class="boton"><h3>Marcar como Cobrado</h3></button>
        <table>
            <tr><th>Modificar</th><th>Uds.</th><th>Id.</th><th>Producto</th><th>Precio</th></tr>
        </table>
    `;

    document.getElementById("btnLimpiarPedido").addEventListener("click", function() {
        limpiarPedido();
        guardarPedidoActual();
    });

    tabla = pedido.querySelector("table");
  }

  const idProducto = parseInt(productosSelect.value);
  const nombreProducto = productosSelect.options[productosSelect.selectedIndex].text;
  const producto = catalogo.productos.find((p) => p.idProducto === idProducto);
  const precioProducto = producto.precioUnidad;

  const filas = tabla.rows;
  for (let i = 1; i < filas.length; i++) {
    const idEnFila = parseInt(filas[i].cells[2].innerText);
    if (idEnFila === idProducto) {
      const celdaCantidad = filas[i].cells[1];
      const celdaPrecio = filas[i].cells[4];

      const cantidadAnterior = parseInt(celdaCantidad.innerText);
      const nuevaCantidad = cantidadAnterior + parseInt(cantidad);

      celdaCantidad.innerText = nuevaCantidad;
      celdaPrecio.innerText = (nuevaCantidad * precioProducto).toFixed(2);
      
      actualizarTotalPedido();
      guardarPedidoActual();
      return;
    }
  }

  const tr = document.createElement("tr");
  tr.innerHTML = "<td><button class='boton mas'>+</button><button class='boton menos'>-</button></td><td>"
    + cantidad + "</td><td>" + idProducto + "</td><td>" + nombreProducto + "</td><td>" + (precioProducto * cantidad).toFixed(2) + "</td>";

  tabla.appendChild(tr);
  
  actualizarTotalPedido();
  guardarPedidoActual();
}

function actualizarTotalPedido() {
  const totalPedido = pedido.querySelector(".totalPedido");
  const tabla = pedido.querySelector("table");
  let total = 0;
  const filas = tabla.rows;
  for (let i = 1; i < filas.length; i++) {
    const precioEnFila = parseFloat(filas[i].cells[4].innerText);
    total += precioEnFila;
  }
  totalPedido.textContent = `Total Pedido: ${total.toFixed(2)} €`;
}

function limpiarPedido() {
  pedido.innerHTML = "";
  cambiarEstadoCliente(clientesDiv.querySelector(".seleccionado"));
}

function guardarPedidoActual() {
  const clienteSeleccionado = clientesDiv.querySelector(".seleccionado");
  if (!clienteSeleccionado) return;

  const nombreCliente = clienteSeleccionado.textContent;
  const tabla = pedido.querySelector("table");

  if (!tabla || tabla.rows.length <= 1) {
    delete pedidosGuardados[nombreCliente];
    return;
  }

  const listaLineas = [];
  const filas = tabla.rows;

  for (let i = 1; i < filas.length; i++) {
    const celdaCantidad = filas[i].cells[1];
    const celdaId = filas[i].cells[2];

    const unidades = parseInt(celdaCantidad.innerText);
    const idProducto = parseInt(celdaId.innerText);

    const linea = new LineaPedido(unidades, idProducto);
    listaLineas.push(linea);
  }

  pedidosGuardados[nombreCliente] = listaLineas;
}

function cargarPedidoCliente(nombreCliente) {
  if (!pedidosGuardados[nombreCliente]) return;

  const lineas = pedidosGuardados[nombreCliente];

  pedido.innerHTML = `
      <h1>Pedido</h1>
      <h2>${nombreCliente}</h2>
      <h2 class="totalPedido"></h2>
      <button id='btnLimpiarPedido' class="boton"><h3>Limpiar Pedido</h3></button>
      <table>
          <tr><th>Modificar</th><th>Uds.</th><th>Id.</th><th>Producto</th><th>Precio</th></tr>
      </table>
  `;

  document.getElementById("btnLimpiarPedido").addEventListener("click", function() {
      limpiarPedido();
      guardarPedidoActual();
  });

  const tabla = pedido.querySelector("table");

  lineas.forEach(linea => {
      const producto = catalogo.productos.find(p => p.idProducto === linea.idProducto);
      
      if (producto) {
          const tr = document.createElement("tr");
          tr.innerHTML = "<td><button class='boton mas'>+</button><button class='boton menos'>-</button></td><td>" 
          + linea.unidades + "</td><td>" + producto.idProducto + "</td><td>" + producto.nombreProducto + "</td><td>" + (producto.precioUnidad * linea.unidades).toFixed(2) + "</td>";
          
          tabla.appendChild(tr);
      }
  });

  actualizarTotalPedido();
}

cargaDatosIniciales();
cargarFormularios();
unidadesSeleccionadas();

comercialesSelect.addEventListener("change", function () {
  obtenerClientePorComercial(this.value);
});

categoriasSelect.addEventListener("change", function () {
  cargarProductosPorCategoria(this.value);
});

pedido.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const fila = e.target.closest("tr");
    const celdaCantidad = fila.cells[1];
    const celdaId = fila.cells[2];
    const celdaPrecio = fila.cells[4];

    const idProducto = parseInt(celdaId.innerText);
    const producto = catalogo.productos.find(p => p.idProducto === idProducto);

    let cantidad = parseInt(celdaCantidad.innerText);

    if (e.target.innerText === "+") {
      cantidad++;
    } else if (e.target.innerText === "-") {
      cantidad--;
      if (cantidad < 1) {
        fila.remove();
        actualizarTotalPedido();
        guardarPedidoActual();
        return;
      }
    }

    celdaCantidad.innerText = cantidad;
    celdaPrecio.innerText = (cantidad * producto.precioUnidad).toFixed(2);
  }
  actualizarTotalPedido();
  guardarPedidoActual();
});

