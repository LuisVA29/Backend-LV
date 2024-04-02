class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      throw new Error("Producto con código repetido");
    }

    this.lastId++;
    const id = this.lastId.toString();
    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    return product;
  }

  getProductById(productId) {
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

try {
  const newProduct = productManager.addProduct(
    "producto 1",
    "Este es el producto 1",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log("Producto agregado:", newProduct);

  console.log(productManager.getProducts());

  productManager.addProduct(
    "producto 2",
    "Este es el producto 2",
    200,
    "Sin imagen",
    "abc123",
    25
  );
} catch (error) {
  console.error("Error al agregar el producto:", error.message);
}

try {
  const foundProduct = productManager.getProductById(
    productManager.getProducts()[0].id
  );
  console.log("Producto encontrado:", foundProduct);
} catch (error) {
  console.error("Error al buscar el producto por ID:", error.message);
}
