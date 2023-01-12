class ProductManager{
    constructor(){
        this.products = [];
        this.idIndex = 0 ;
    }
    addProduct(product){
        // const existingProduct = this.products.find((p) => p.code === product.code);
        // Valida que no se repita el campo "code"
        const existingProduct = this.products.find((prod)=> prod.code === product.code);
        if (existingProduct){
            console.error('El código del producto ya existe');
            return;
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.log("Falta ingresar un campo");
            return;
        }

        product.id = ++this.idIndex;

    // Agrega el producto al arreglo de productos
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const SearchedProduct = this.products.find((prod)=> prod.id === id);

    // Muestra un error en la consola en caso de no encontrar ningún coincidencia
    if (!SearchedProduct) {
        console.error('Not found');
        return;
      }

    return SearchedProduct;
  }

}

nuevoProducto = {
    title : 'Plumbus',
    description : 'Un producto novedoso',
    price : 100,
    thumbnail : 'Algunaimagen.jpg',
    code : 'ABCD',
    stock : 10,
}
nuevoProducto2 = {
    title : 'Toalla',
    description : 'Una tela para secarse',
    price : 50,
    thumbnail : 'Algunaimagen2.jpg',
    code : 'EFGH',
    stock : 10,
}
productoErroneo = {
    title : 'Virus',
    description : 'Un articulo para romper el programa',
    price : 50,
    thumbnail : 'Algunaimagen2.jpg',
    code : 'EFGH',
    stock : 10,
}
productoIncompleto = {
    description : 'Un articulo para romper el programa',
    price : 50,
    thumbnail : 'Algunaimagen2.jpg',
    code : 'ddd',
    stock : 10,
}

productos = new ProductManager;
let Compra = productos.getProducts();
console.log("Compra", Compra);
console.log(productos.products);
productos.addProduct(nuevoProducto);
Compra = productos.getProducts();
console.log("Compra 2", Compra);

productos.addProduct(nuevoProducto);
productos.addProduct(nuevoProducto2);
Compra = productos.getProducts();
console.log("Compra 3", Compra);
// Control de errores
// Producto Erroneo
productos.addProduct(productoErroneo);

// Producto Incompleto
productos.addProduct(productoIncompleto);

// Producto No encontrado
productos.getProductById(10);

// Busqueda del producto
let seleccionado = productos.getProductById(1);
console.log("seleccionado", seleccionado)




