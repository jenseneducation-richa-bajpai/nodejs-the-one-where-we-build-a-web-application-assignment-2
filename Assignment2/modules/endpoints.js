const database = require("./database");

module.exports = app => {
  //Post product to "Products"

  app.post("/api/product", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const image = request.query.image;

    let message = {
      success: true,
      message: "Product added"
    };

    const res = database.insertProduct(name, price, image);
    message.data = res[0];
    response.send(message);
  });

  // Get products from "Products"

  app.get("/api/product", async (request, response) => {
    const data = await database.getProducts();
    response.send(data);
  });

  //Get products from cart

  app.get("/api/getfromcart", async (request, response) => {
    const data = database.getFromCart();
    response.send(data);
  });

  //Post product to cart

  app.post("/api/addproduct", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const image = request.query.image;

    let message = {
      success: true,
      message: "Product added"
    };

    const checkInCart = database.checkCart(name, price, image);
    const checkInProduct = database.checkProduct(name, price, image);

    //Throwing error if product cannot be added

    if (checkInCart) {
      const errorMessage = {
        error: "Error",
        message: "Product cannot be added. It already exists in cart."
      };
      response.send(errorMessage);
    } else if (!checkInProduct) {
      const errorMessage = {
        error: "Error",
        message: "Product cannot be added. It doesn't exists in productlist."
      };
      response.send(errorMessage);
    } else {
      const res = database.addProduct(name, price, image); //add product
      message.data = res[0];
      response.send(message);
    }
  });

  // Delete product from cart

  app.delete("/api/removeproduct", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const image = request.query.image;

    let message = {
      success: true,
      message: "Product deleted"
    };

    const checkInCart = database.checkCart(name, price, image);
    if (!checkInCart) {
      const errorMessage = {
        error: "Error",
        message: "Product cannot be deleted. It doesn't exists in cart."
      };
      response.send(errorMessage);
    } else {
      const res = database.removeProduct(name, price, image);
      message.data = res[0];
      response.send(message);
    }
  });
};
