// Toggle Modal
function popupToggle() {
  const POPUP = document.getElementById("popup");
  POPUP.classList.toggle("active");
}
//Toggle Side Menu
function toggleSideMenu() {
  const SIDE_MENU = document.getElementById("side-menu");
  SIDE_MENU.classList.toggle("side-menu-open");
}

let order = [];

let menu = [
  {
    img: "img/pho.png",
    name: "Pho Plate",
    quantity: "1",
    price: "13",
  },
  {
    img: "img/dim-sum.png",
    name: "Elegant Dim Sum",
    quantity: "1",
    price: "3.3",
  },
  {
    img: "img/sweet-sour-noodles.png",
    name: "Sweet Sour Noodles",
    quantity: "1",
    price: "11",
  },
  {
    img: "img/meatball.png",
    name: "Meatball Plate",
    quantity: "1",
    price: "6.6",
  },
  {
    img: "img/congee.png",
    name: "Congee",
    quantity: "1",
    price: "4.8",
  },
  {
    img: "img/caramel-sushi.png",
    name: "Caramel Sushi",
    quantity: "1",
    price: "9.9",
  },
  {
    img: "img/fried-rice.png",
    name: "Fried Rice",
    quantity: "1",
    price: "7.8",
  },
  {
    img: "img/duck-pho.png",
    name: "Duck Pho",
    quantity: "1",
    price: "12.5",
  },
  {
    img: "img/ration-sushi.png",
    name: "Sushi",
    quantity: "1",
    price: "7.4",
  },
  {
    img: "img/Kimchi.png",
    name: "Kimchi",
    quantity: "1",
    price: "4.5",
  },
  {
    img: "img/fried-fish.png",
    name: "Fried Fish",
    quantity: "1",
    price: "5.9",
  },
  {
    img: "img/stew-dim-sum.png",
    name: "Stew Dim Sum",
    quantity: "1",
    price: "9.7",
  },
  {
    img: "img/raspberry-cake.png",
    name: "Raspberry Cake",
    quantity: "1",
    price: "19",
  },
  {
    img: "img/cream-berrys.png",
    name: "Cream Berrys",
    quantity: "1",
    price: "1.5",
  },
  {
    img: "img/pancake.png",
    name: "Pancake",
    quantity: "1",
    price: "8.9",
  },
];

function addOrder(event) {
  const NAME_SELECTED = document.getElementById("name-input");
  event.preventDefault();

  order = retriveDataFromLocalStorage();

  const NAME = NAME_SELECTED.value;
  const QUANTITY = event.target.quantity.value;

  var orderId;
  let QUANTITY_ERROR = document.getElementById("qnt-error");

  if (QUANTITY == "") {
    QUANTITY_ERROR.style.visibility = "visible";
  } else {
    QUANTITY_ERROR.style.visibility = "hidden";
    for (let i = 0; i < menu.length; i++) {
      if (NAME == menu[i].name) {
        orderId = i;
      }
    }

    order.push({
      img: menu[orderId].img,
      name: NAME,
      quantity: QUANTITY,
      price: menu[orderId].price,
    });
  }
  saveDataInLocalStorage(order);
  showOrderInTable();
}

function showOrderInTable() {
  const ORDER_TABLE = document.getElementById("order-table");
  var allOrders = "";

  order = retriveDataFromLocalStorage();
  if (order.length !== 0) {
    for (let i = 0; i < order.length; i++) {
      allOrders += `
      <tr>
      <td><img class="table-img" src="${order[i].img}" alt="${order[i].name}"></td>
      <td>${order[i].name}</td>
      <td>${order[i].quantity} units</td>
      <td>${order[i].price} €</td>
      <td>
      <button type="button" class="btn btn-warning" onclick="modifToggle(${i});">Edit</button>
      <button type="button" class="btn btn-danger" onclick="deleteOrderInTable(${i});">Delete</button>
      </td>
      </tr>
      `;
    }
  } else {
    allOrders = `<tr>
    <td> . . . </td>
    <td> Select a dish </td>
    <td> . . . </td>
    <td> . . . </td>
    <td> . . . </td>
    </tr>`;
  }
  ORDER_TABLE.innerHTML = allOrders;
}

function showDishesInForm() {
  const DISH_FORM_SELECT = document.getElementById("name-input");
  var dishString = "";

  for (let i = 0; i < menu.length; i++) {
    dishString += `<option>${menu[i].name}</option>`;
  }
  DISH_FORM_SELECT.innerHTML = dishString;
}

function deleteOrderInTable(deleteOrderId) {
  order = retriveDataFromLocalStorage();
  order.splice(deleteOrderId, 1);
  saveDataInLocalStorage(order);
  showOrderInTable();
}

// Modify Toggle
var orderIdModif = 0;

function modifToggle(idEditOrder) {
  const POPUP = document.getElementById("popup");
  POPUP.classList.toggle("active");

  //Show Select Options
  const DISH_EDIT_SELECT = document.getElementById("name-edit-input");
  var dishEditString = "";
  for (let i = 0; i < menu.length; i++) {
    dishEditString += `<option>${menu[i].name}</option>`;
  }
  DISH_EDIT_SELECT.innerHTML = dishEditString;

  //Show Quantity Selected
  order = retriveDataFromLocalStorage();
  const ORDER_EDIT_QUANTITY = document.getElementById("quantity-edit-input");
  ORDER_EDIT_QUANTITY.value = order[idEditOrder].quantity;

  orderIdModif = idEditOrder;
}

function updateOrder() {
  order = retriveDataFromLocalStorage();
  let dishEditSelect = document.getElementById("name-edit-input");
  let orderEditQuantity = document.getElementById("quantity-edit-input");
  console.log(dishEditSelect.value);

  order[orderIdModif].name = dishEditSelect.value;
  order[orderIdModif].quantity = orderEditQuantity.value;

  let menuId = 0;

  for (let i = 0; i < menu.length; i++) {
    if (dishEditSelect.value == menu[i].name) {
      menuId = i;
    }
  }
  order[orderIdModif].img = menu[menuId].img;
  order[orderIdModif].price = menu[menuId].price;
  saveDataInLocalStorage(order);
  showOrderInTable();
}

function modifyOrderInTable() {}

function initialize() {
  const ORDER_FORM = document.getElementById("order-form");
  if (ORDER_FORM != null) {
    ORDER_FORM.addEventListener("submit", addOrder);

    showOrderInTable();
    showDishesInForm();
  }
}

initialize();

//Add order from main page
function addOrderFromCard(addOrderId) {
  order = retriveDataFromLocalStorage();
  order.push({
    img: menu[addOrderId].img,
    name: menu[addOrderId].name,
    quantity: menu[addOrderId].quantity,
    price: menu[addOrderId].price,
  });
  saveDataInLocalStorage(order);
}

//Save and retrive data from localStorag
function saveDataInLocalStorage(data) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem("orderData", dataJSON);
}

function retriveDataFromLocalStorage() {
  var dataRecoveredJSON = localStorage.getItem("orderData");
  return JSON.parse(dataRecoveredJSON) || [];
}

//REVEAL

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      if (reveals[i].classList.contains("dessert-card -l")) {
        reveals[i].classList.add("-l");
      } else if (reveals[i].classList.contains("dessert-card -r")) {
        reveals[i].classList.add("-r");
      } else {
        reveals[i].classList.add("active");
      }
    } else {
      if (reveals[i].classList.contains("dessert-card -l")) {
        reveals[i].classList.remove("-l");
      } else if (reveals[i].classList.contains("dessert-card -r")) {
        reveals[i].classList.remove("-r");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
}

function adjustDessertClass() {
  var dessetCard4 = document.getElementById("dc-4");
  var dessetCard3 = document.getElementById("dc-3");
  var dessetCard5 = document.getElementById("dc-5");

  var anchoVentana = window.innerWidth;
if(dessetCard3 != null){
  if (anchoVentana > 992 && anchoVentana < 1200) {
    dessetCard4.classList.remove("-r");
    dessetCard4.classList.add("-l");
    dessetCard3.classList.remove("-r");
    dessetCard3.classList.add("-l");
  } else {
    dessetCard4.classList.remove("-l");
    dessetCard4.classList.add("-r");
    dessetCard3.classList.remove("-l");
    dessetCard3.classList.add("-r");
  }

  if (anchoVentana > 1700) {
    dessetCard5.classList.remove("-l");
    dessetCard5.classList.add("-r");
  } else {
    dessetCard5.classList.remove("-r");
    dessetCard5.classList.add("-l");
  }
}
}
window.addEventListener("load", adjustDessertClass);
window.addEventListener("resize", adjustDessertClass);
window.addEventListener("scroll", reveal);