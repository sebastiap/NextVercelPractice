class ProductManager {
  constructor() {
    this.products = [];
    this.title = '';
    this.description = '';
    this.price = 0;
    this.thumbnail = '';
    this.code = '';
    this.stock = 0;
    this.id = 0;
  }

  addProduct(product) {
    // Valida que no se repita el campo "code"
    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      console.error('El código del producto ya existe');
      return;
    }

    // Valida que todos los campos sean obligatorios
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    // Asigna un id autoincrementable al producto
    product.id = ++this.id;

    // Agrega el producto al arreglo de productos
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    // Busca en el arreglo el producto que coincida con el id
    const product = this.products.find((p) => p.id === id);

    // Muestra un error en la consola en caso de no encontrar ningún coincidencia
    if (!product) {
      console.error('Not found');
      return;
    }

    return product;
  }
}
productos = new ProductManager;
console.log(productos.products)
