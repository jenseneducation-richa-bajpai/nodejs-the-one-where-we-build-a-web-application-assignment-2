const getProductsButtonCart = document.querySelector(".primary-button-cart");
const displayProductsCart = document.querySelector(".productscart");

const baseURL1 = "http://localhost:8000/api";

//const getCart = () => {
fetch(baseURL1 + "/getfromcart", { method: "GET" })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    displayProductCart(data);
  });
//};

const displayProductCart = shoppingcart => {
  for (let i = 0; i < shoppingcart.length; i++) {
    let div = document.createElement("div");
    let productElem1 = document.createElement("p");
    let priceElem1 = document.createElement("p");
    let imageElem1 = document.createElement("IMG");
    let btnElem = document.createElement("BUTTON");

    btnElem.innerHTML = "DELETE PRODUCT";

    div.setAttribute("id", `div${shoppingcart[i].name}`);
    div.setAttribute("class", "itemDiv");
    productElem1.setAttribute("id", shoppingcart[i].name);
    priceElem1.setAttribute("id", shoppingcart[i].price);
    imageElem1.setAttribute("id", shoppingcart[i].image);
    btnElem.setAttribute("class", "addproduct");

    imageElem1.setAttribute("width", "200");
    imageElem1.setAttribute("height", "200");
    btnElem.style.height = "30px";

    productElem1.innerHTML = shoppingcart[i].name;
    priceElem1.innerHTML = shoppingcart[i].price;
    imageElem1.src = shoppingcart[i].image;

    displayProductsCart.append(div);
    div.appendChild(imageElem1);
    div.appendChild(productElem1);
    div.appendChild(priceElem1);
    div.appendChild(btnElem);
    /*displayProductsCart.append(productElem1);
    displayProductsCart.append(priceElem1);
    displayProductsCart.append(imageElem1);
    displayProductsCart.append(btnElem);*/

    btnElem.addEventListener("click", e => {
      console.log(e);
      console.log(e.target.parentNode.children);
      console.log(
        "name: ",
        shoppingcart[i].name,
        "price: ",
        shoppingcart[i].price,
        "image:",
        shoppingcart[i].image
      );
      remove(
        shoppingcart[i].name,
        shoppingcart[i].price,
        shoppingcart[i].image
      );
    });
    //delete products to cart
    const remove = (name, price, image) => {
      let removeName = document.getElementById(`${name}`).innerHTML;
      let removePrice = document.getElementById(`${price}`).innerHTML;
      let removeImage = document.getElementById(`${image}`).src;
      let removeDiv = document.getElementById(`div${name}`);

      console.log(name);
      console.log(price);
      console.log(image);

      const url =
        baseURL1 +
        "/removeproduct" +
        "?name=" +
        removeName +
        "&price=" +
        removePrice +
        "&image=" +
        removeImage;

      fetch(url, { method: "DELETE" })
        .then(response => {
          console.log(url);
          return response.json();
        })
        .then(data => {
          console.log(data);
          console.log(data.message);
          window.alert(data.message);
        });
      removeDiv.remove();
    };
  }
};
//getProductsButtonCart.addEventListener("click", getCart);
