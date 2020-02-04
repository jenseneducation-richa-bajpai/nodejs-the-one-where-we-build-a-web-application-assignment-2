const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("product.json");
const database = lowdb(adapter);

// Initiating database

exports.initiateDatabase = () => {
  const databaseInitiated1 = database.has("products").value();

  if (!databaseInitiated1) {
    database.defaults({ products: [] }).write();
  }

  const databaseInitiated2 = database.has("shoppingcart").value();

  if (!databaseInitiated2) {
    database.defaults({ shoppingcart: [] }).write();
  }
};

//Insert products in "Products" array

exports.insertProduct = async (name, price, image) => {
  const response = await database
    .get("products")
    .push({ name: name, price: price, image: image })
    .write();
  return response;
};

//Get all products in "Products" array

exports.getProducts = async () => {
  return database.get("products").value();
};

//Insert product in shopping cart

exports.addProduct = async (name, price, image) => {
  const response = await database
    .get("shoppingcart")
    .push({ name: name, price: price, image: image })
    .write();
  return response;
};

//Get product in cart

exports.getFromCart = () => {
  return database.get("shoppingcart").value();
};

//Delete product in cart

exports.removeProduct = async (name, price, image) => {
  const response = await database
    .get("shoppingcart")
    .remove({ name: name, price: price, image: image })
    .write();
  return response;
};

// check if product exist in cart

exports.checkCart = (name, price, image) => {
  const response = database
    .get("shoppingcart")
    .find({ name: name, price: price, image: image })
    .value();
  return response;
};

// Check if product exist in "Products" array

exports.checkProduct = (name, price, image) => {
  const response = database
    .get("products")
    .find({ name: name, price: price, image: image })
    .value();
  return response;
};
