// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.getElementById('total-price');
    const cartSummary = document.getElementById('cart-summary');
  
    let storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    if (storedItems.length === 0) {
      cartContainer.innerHTML = '<p>カートに商品はありません。</p>';
      cartSummary.style.display = 'none';
      return;
    }
  
    cartSummary.style.display = 'block';
  
    let total = 0;
  
    storedItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <div class="cart-item-content">
          <h3 class="cart-item-title">${item.name}</h3>
          <div class="cart-item-details">
            <span class="item-price">価格: ¥${item.price.toLocaleString()}</span>
            <span class="item-quantity">数量: ${item.quantity}個</span>
            <span class="item-subtotal">小計: ¥${itemTotal.toLocaleString()}</span>
          </div>
          <button class="remove-btn" data-index="${index}">削除</button>
        </div>
      `;
      cartContainer.appendChild(itemDiv);
    });
  
    cartTotal.textContent = `¥${total.toLocaleString()}`;
  
    // 削除ボタンの処理
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index)) {
          storedItems.splice(index, 1);
          localStorage.setItem('cartItems', JSON.stringify(storedItems));
          location.reload();
        }
      });
    });
  
    document.getElementById('checkout-button').addEventListener('click', () => {
      alert('クレジットカード決済処理へ進みます（開発中）');
    });
  });
  