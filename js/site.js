const discount = { A: 'Buy 2 for 100', B: 'Buy 2 get 1 free' };
const scenario1 = [
  {
    name: 'Floral Kimono',
    quantity: 2,
    unit_price: 60,
    discount: discount.A,
  },
  {
    name: 'Gray Blazer',
    quantity: 1,
    unit_price: 70,
    discount: discount.B,
  },
  {
    name: 'Pink Trench Coat',
    quantity: 2,
    unit_price: 10,
    discount: false,
  },
  {
    name: 'Yellow Hoodie',
    quantity: 1,
    unit_price: 20,
    discount: false,
  },
];
const scenario2 = [
  {
    name: 'Floral Kimono',
    quantity: 5,
    unit_price: 60,
    discount: discount.A,
  },
  {
    name: 'Gray Blazer',
    quantity: 2,
    unit_price: 70,
    discount: discount.B,
  },
  {
    name: 'Pink Trench Coat',
    quantity: 1,
    unit_price: 10,
    discount: false,
  },
  {
    name: 'Yellow Hoodie',
    quantity: 1,
    unit_price: 20,
    discount: false,
  },
];
const carts = document.querySelector('.switch_scenario');
function init(scenario) {
  let items = document.querySelector('.items');
  let orderTotal_container = document.getElementById('order_total');
  let orderTotal = 0;

  //make sure the item summary is empty as we are going to fill in data later
  items.innerHTML = '';

  //go through each of them for rendering and calculate their unit total price, then calculate out ordertotal
  scenario.forEach(function (item) {
    calculateUnitTotal(item);
    productsRendering(item);
    orderTotal += item.total_price;
  });

  //rendering the order total
  priceRendering();

  function calculateUnitTotal(item) {
    let set;
    let priceAfterDiscount;
    let quantity = item.quantity;
    if (item.discount == discount.A && quantity >= 2) {
      if (quantity % 2 == 0) {
        set = quantity / 2;
        priceAfterDiscount = set * 100;
      } else {
        set = (quantity - 1) / 2;
        priceAfterDiscount = set * 100 + item.unit_price;
      }
    } else if (item.discount == discount.B && quantity >= 3) {
      if (quantity % 3 == 0) {
        set = quantity / 3;
        priceAfterDiscount = set * (item.unit_price * 2);
      } else {
        set = parseInt(quantity / 3);
        remainder = quantity % 3;
        priceAfterDiscount =
          set * (item.unit_price * 2) + remainder * item.unit_price;
      }
    } else {
      item.total_price = quantity * item.unit_price;
    }

    if (priceAfterDiscount) {
      item.total_price = priceAfterDiscount;
    }
  }

  function productsRendering(item) {
    const itemContainer = document.createElement('li');
    itemContainer.classList.add('item');
    const infoContainer = document.createElement('div');
    const imageName = item.name.split(' ').join('-').toLowerCase();
    const imageHtml = `<img src="./images/${imageName}.jpg" alt="${imageName}">`;
    const textHtml = `<div>${item.name}<br>Qty: ${item.quantity}<br>$${item.unit_price}<hr><br>Total Price:$${item.total_price}</div>`;
    if (item.discount) {
      const discountHtml = `<div class="discount">${item.discount}</div>`;
      infoContainer.innerHTML = textHtml + discountHtml;
    } else {
      infoContainer.innerHTML = textHtml;
    }
    itemContainer.innerHTML = imageHtml;
    itemContainer.append(infoContainer);
    items.append(itemContainer);
  }

  function priceRendering() {
    orderTotal_container.innerText = '$' + orderTotal;
  }
}

//user click on cart2 then switch data to scenario2
carts.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('cart2')) {
    init(scenario2);
  } else {
    //just incase user wants to go back to scenario1
    init(scenario1);
  }
});

//fire init by default and show scenario1
init(scenario1);
