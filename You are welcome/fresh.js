const productPrices = {
    Bread: 500,
    Milk: 1000,
    Rice: 1500,
    Sugar: 1200,
    Oil: 2000
};

let cartData = [];

const productSelect = document.getElementById("productSelect");
const unitPrice = document.getElementById("unitPrice");
const quantityInput = document.getElementById("quantityInput");

function updateUnitPrice(){
    unitPrice.value = productPrices[productSelect.value];
}

productSelect.addEventListener("change", updateUnitPrice);
updateUnitPrice();

function addToCart(){

    const name = productSelect.value;
    const price = productPrices[name];
    const qty = Number(quantityInput.value);

    if(!qty || qty <= 0) return;

    cartData.push({
        name,
        price,
        qty,
        total: price * qty
    });

    quantityInput.value = "";
    renderCartTable();
}

function renderCartTable(){

    const tableBody = document.getElementById("cartTable");

    if(cartData.length === 0){
        tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="empty-state">🛒 No items in cart</td>
        </tr>`;
        document.getElementById("totalAmount").innerText = "RWF 0";
        return;
    }

    let total = 0;
    let rows = "";

    for(let i=0;i<cartData.length;i++){
        const item = cartData[i];
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

    tableBody.innerHTML = rows;
    document.getElementById("totalAmount").innerText = "RWF " + total;
}

function calculateChange(){
    const total = cartData.reduce((a,b)=>a+b.total,0);
    const paid = Number(document.getElementById("paidAmount").value || 0);

    document.getElementById("changeAmount").innerText =
        "RWF " + Math.max(0, paid - total);
}

function resetCart(){
    cartData = [];
    renderCartTable();
    document.getElementById("totalAmount").innerText = "RWF 0";
    document.getElementById("changeAmount").innerText = "RWF 0";
    document.getElementById("paidAmount").value = "";
}

window.addToCart = addToCart;
window.calculateChange = calculateChange;
window.resetCart = resetCart;