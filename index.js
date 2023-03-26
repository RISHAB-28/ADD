const apiUrl = "https://dummyjson.com/products ";
let cart = new Array(31);
let price = new Array(31);
let orgPrice = new Array(31);

for (let i = 0; i < cart.length; i++) {
  cart[i] = 0;
}

const bill = () => {
  let total = 0;
  let discount = 0;
  let count = 0;
  for (i = 0; i < cart.length; i++) {
    if (cart[i] > 0) {
      total += orgPrice[i] * cart[i];
      discount += (orgPrice[i] - price[i]) * cart[i];
      count += cart[i];
    }
  }

  document.getElementById(
    "e"
  ).innerHTML = `<li><span>Items(${count})</span>  <span>$ ${total.toPrecision(
    6
  )}</span></li>
              <li><span>Discount</span>  <span>$ ${discount.toPrecision(
                6
              )}</span></li>
              <li><span>Type Discount</span> <span>$0</span></li>
              <li><span><h3>Order Total</span>    <span>$ ${
                total - discount.toPrecision(4)
              }</h3></span></li>`;
};

const showCart = (event) => {
  let s = "";

  for (let i = 0; i < cart.length; i++) {
    if (cart[i] > 0) {
      s =
        s +
        `<li>
              <span>Item ${i}</span>
              <span><button type="button" value="${i}" onclick="cartOp(event)">+</button></span>
              <span> ${cart[i]}</span>
              <span><button type="button" value="${i}" onclick="cartOp2(event)">-</button></span>
              <span>$ ${(price[i] * cart[i]).toPrecision(6)}</span>
    </li>`;
    }
  }
  document.getElementById("d").innerHTML = s;
  bill();
};

const cartOp = (event) => {
  //console.log(event.target.value)
  for (i = 0; i < cart.length; i++) {
    if (i == event.target.value) cart[i]++;
  }
  document.getElementById("message").classList.add("add");
  document.getElementById(
    "message"
  ).innerHTML = `Item ${event.target.value} is added`;
  //cart.push(event.target.value);
  console.log(cart);
  showCart(event);
};

const cartOp2 = (event) => {
  //console.log(event.target.value)
  for (i = 0; i < cart.length; i++) {
    if (i == event.target.value && cart[i] > 0) cart[i]--;
  }
  let count = 0;
  for (i = 0; i < cart.length; i++) {
    if (cart[i] == 0) count++;
  }
  if (count == 31) {
    document.getElementById(
      "e"
    ).innerHTML = `<li><span>Items(0)</span>  <span>$0</span></li>
              <li><span>Discount</span>  <span>$0</span></li>
              <li><span>Type Discount</span> <span>$0</span></li>
              <li><span><h3>Order Total</span>    <span>$0
              </h3></span></li>`;
    document.getElementById("d").innerHTML = `<li><h3>Empty Cart</h3></li>`;
    document.getElementById("message").classList.remove("add");
    document.getElementById("message").innerHTML = "";
    return;
  }
  //cart.push(event.target.value);
  console.log(cart);
  showCart(event);
};

const show = (data) => {
  const obj = data.products;
  obj.forEach((element) => {
    console.log(element.title);
  });
};

const add = (data) => {
  const obj = data.products;
  let s = "";
  let i = 1;
  obj.forEach((element) => {
    s =
      s +
      `<div class="product" >
          <div class="top">
            <span>${element.discountPercentage}%</span>
            <span>
              <img src="${
                element.images[0]
              }" alt="error" width="150px" height = "200px"/>
            </span>
          </div>
          <div class="middle">
          <span>Item ${element.id}</span>
          <h3>${element.title}</h3>
          </div>
          
          <div class="bottom">
            <s><span>$ ${element.price}</span></s>
            <span id="${element.id}">$ ${(
        (element.price * (100 - element.discountPercentage)) /
        100
      ).toPrecision(6)}</span>
            <span class="submit"><button type="button" value="${
              element.id
            }" onclick="cartOp(event)">Add to Cart</button></span>
          </div>
        </div>`;

    orgPrice[i] = element.price;
    price[i++] = (
      (element.price * (100 - element.discountPercentage)) /
      100
    ).toPrecision(6);
  });

  document.getElementById("p").innerHTML = s;
};
const cartGet = async (url) => {
  const response = await fetch(url);

  let data = await response.json();
  //console.log(data)
  show(data);
  add(data);
};

cartGet(apiUrl);
