class Producto {
    _idProducto;
    _nombreProducto;
    _precioUnidad;
    _idCategoria;
    constructor(idProducto, nombreProducto, precioUnidad, idCategoria) {
        this._idProducto = idProducto;
        this._nombreProducto = nombreProducto;
        this._precioUnidad = precioUnidad;
        this._idCategoria = idCategoria;
    }

    get idProducto_1() {
        return this._idProducto;
    }
    set idProducto_1(value) {
        this._idProducto = value;
    }
    get nombreProducto() {
        return this._nombreProducto;
    }
    set nombreProducto(value) {
        this._nombreProducto = value;
    }
    get precioUnidad() {
        return this._precioUnidad;
    }
    set precioUnidad(value) {
        this._precioUnidad = value;
    }
    get idCategoria() {
        return this._idCategoria;
    }
    set idCategoria(value) {
        this._idCategoria = value;
    }
}

class Catalogo {
    _productos;
    constructor() {
        this._productos = [];
    }

    addProducto(idProducto, nombreProducto, precioUnidad, idCategoria) {
        const producto = new Producto(
            idProducto,
            nombreProducto,
            precioUnidad,
            idCategoria
        );
        this._productos.push(producto);
    }

    get productos() {
        return this._productos;
    }
}

class LineaPedido {
    _unidades;
    _idProducto;
    constructor(unidades, idProducto) {
        this._unidades = unidades;
        this._idProducto = idProducto;
    }

    get unidades() {
        return this._unidades;
    }
    set unidades(value) {
        this._unidades = value;
    }
    get idProducto() {
        return this._idProducto;
    }
    set idProducto(value) {
        this._idProducto = value;
    }
}

class Cliente {
    _nombre;
    _cuentaAbierta;
    constructor(nombre) {
        this._nombre = nombre;
        this._cuentaAbierta = false;
    }

    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
    get cuentaAbierta() {
        return this._cuentaAbierta;
    }
    set cuentaAbierta(value) {
        this._cuentaAbierta = value;
    }
}

class Gestor {
    _categorias;
    _comerciales;
    _clientes;
    _comercialActual;
    _clienteActual;
    _pedidos;
    constructor() {
        this._categorias = [];
        this._comerciales = [];
        this._clientes = [];
        this._comercialActual = -1;
        this._clienteActual = -1;
        this._pedidos = [];
    }

    get categorias() {
        return this._categorias;
    }
    set categorias(value) {
        this._categorias = value;
    }
    get comerciales() {
        return this._comerciales;
    }
    set comerciales(value) {
        this._comerciales = value;
    }
    get clientes() {
        return this._clientes;
    }
    set clientes(value) {
        this._clientes = value;
    }
    get comercialActual() {
        return this._comercialActual;
    }
    set comercialActual(value) {
        this._comercialActual = value;
    }
    get clienteActual() {
        return this._clienteActual;
    }
    set clienteActual(value) {
        this._clienteActual = value;
    }
    get pedidos() {
        return this._pedidos;
    }
    set pedidos(value) {
        this._pedidos = value;
    }
}