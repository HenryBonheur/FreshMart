const prices = {
    Bread: 500,
    Milk: 1000,
    Rice: 1500,
    Sugar: 1200,
    Oil: 2000
};

let cart = [];

const itemSelect = document.getElementById("itemName");
const priceInput = document.getElementById("price");
const qtyInput = document.getElementById("qty");
const tbody = document.getElementById("cartBody");

function updatePrice(){
    priceInput.value = prices[itemSelect.value];
}

itemSelect.addEventListener("change", updatePrice);
updatePrice();


function addItem(){
    const name = itemSelect.value;
    const price = prices[name];
    const qty = Number(qtyInput.value);

    if(!qty || qty <= 0) return;

    cart.push({
        name,
        price,
        qty,
        total: price * qty
    });

    qtyInput.value = "";
    renderCart();
}


function renderCart(){

    if(cart.length === 0){
        tbody.innerHTML = `
        <tr>
            <td colspan="5" class="empty">No items added yet</td>
        </tr>`;
        document.getElementById("total").innerText = "RWF 0";
        return;
    }

    let total = 0;
    let rows = "";

    for(let i = 0; i < cart.length; i++){
        const item = cart[i];
        total += item.total;

        rows += `
        <tr>
            <td>${i+1}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.qty}</td>
            <td>${item.total}</td>
        </tr>`;
    }

    tbody.innerHTML = rows;
    document.getElementById("total").innerText = "RWF " + total;
}


function calcChange(){
    const total = cart.reduce((a,b)=>a+b.total,0);
    const paid = Number(document.getElementById("paid").value || 0);

    document.getElementById("change").innerText =
        "RWF " + Math.max(0, paid - total);
}


function clearAll(){
    cart = [];
    renderCart();
    document.getElementById("total").innerText = "RWF 0";
    document.getElementById("change").innerText = "RWF 0";
    document.getElementById("paid").value = "";
}

/* expose functions to buttons */
window.addItem = addItem;
window.calcChange = calcChange;
window.clearAll = clearAll;