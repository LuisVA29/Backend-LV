import fs from "fs";

const STORAGE =
  "D:\\luisf\\Documents\\CODERHOUSE\\BACKEND\\Entregas-Backend\\Tercera-Entrega\\src\\productos.json"; // Ruta del archivo productos.json

class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
    this.loadProductsFromFile(); // Cargar productos desde el archivo al iniciar
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync(STORAGE, "utf8");
      const parsedData = JSON.parse(data);
      this.products = parsedData.products || [];
      this.lastId = parsedData.lastId || 0;
    } catch (error) {
      console.error("Error al cargar productos desde el archivo:", error);
    }
  }

  saveProductsToFile() {
    const data = JSON.stringify({
      products: this.products,
      lastId: this.lastId,
    });
    fs.writeFileSync(STORAGE, data);
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
    this.saveProductsToFile(); // Guardar productos en el archivo
    return product;
  }

  getProductById(productId) {
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  updateProduct(productId, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields,
    };
    this.saveProductsToFile(); // Guardar productos en el archivo
    return this.products[productIndex];
  }

  deleteProduct(productId) {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== productId);
    if (this.products.length === initialLength) {
      throw new Error("Producto no encontrado");
    }
    this.saveProductsToFile(); // Guardar productos en el archivo
  }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

try {
  const newProduct = productManager.addProduct(
    "producto 2",
    "Este es el producto 1",
    200,
    "Sin imagen",
    "abc1234",
    25
  );
  console.log("Producto agregado:", newProduct);

  console.log(productManager.getProducts());

  const productId = newProduct.id;
  const updatedProduct = productManager.updateProduct(productId, {
    price: 250,
  });
  console.log("Producto actualizado:", updatedProduct);

  productManager.deleteProduct(productId);
  console.log("Producto eliminado");
} catch (error) {
  console.error("Error:", error.message);
}

export default ProductManager;
