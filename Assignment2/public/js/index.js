const addButton = document.querySelector(".submitbutton");
const getProductsButton = document.querySelector(".primary-button");
const displayProducts = document.querySelector(".products");

const baseURL = "http://localhost:8000/api";

//const get = () => {
fetch(baseURL + "/product", { method: "GET" })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    displayProduct(data);
  });
//};

const displayProduct = products => {
  for (let i = 0; i < products.length; i++) {
    let productElem = document.createElement("p");
    let priceElem = document.createElement("p");
    let imageElem = document.createElement("IMG");
    let btnElem = document.createElement("BUTTON");

    productElem.setAttribute("class", "product");
    priceElem.setAttribute("class", "price");
    imageElem.setAttribute("class", "image");
    btnElem.setAttribute("class", "submitbutton");
    btnElem.setAttribute("type", "submit");
    btnElem.setAttribute("id", `${products[i].name}`);
    btnElem.innerHTML = "ADD TO CART";

    imageElem.setAttribute("width", "300");
    imageElem.setAttribute("height", "300");

    productElem.innerHTML = products[i].name;
    priceElem.innerHTML = products[i].price;
    imageElem.src = products[i].image;

    displayProducts.append(imageElem);
    displayProducts.append(productElem);
    displayProducts.append(priceElem);
    displayProducts.append(btnElem);

    btnElem.addEventListener("click", e => {
      console.log(e);
      console.log(e.target.parentNode.children);
      console.log(
        "name: ",
        products[i].name,
        "price: ",
        products[i].price,
        "image:",
        products[i].image
      );
      insert(products[i].name, products[i].price, products[i].image);
    });
    //add products to cart
    const insert = () => {
      let name = document.querySelectorAll(".product")[i].innerHTML;
      let price = document.querySelectorAll(".price")[i].innerHTML;
      let image = document.querySelectorAll(".image")[i].src;
      console.log(name);
      console.log(price);
      console.log(image);

      const url =
        baseURL +
        "/addproduct" +
        "?name=" +
        name +
        "&price=" +
        price +
        "&image=" +
        image;

      fetch(url, { method: "POST" })
        .then(response => {
          console.log(url);
          return response.json();
        })
        .then(data => {
          console.log(data);
          console.log(data.message);
          document
            .getElementById(`${products[i].name}`)
            .classList.remove("submitbutton");
          document
            .getElementById(`${products[i].name}`)
            .classList.add("disable");
          document.getElementById(`${products[i].name}`).disabled = true;
          document.getElementById(`${products[i].name}`).innerHTML =
            "Product Already Added";
        });
    };
  }
};
