document.addEventListener('DOMContentLoaded', () => {
    setupMenuToggle();        // サイドメニュー
    setupTypingEffect();      // タイピングアニメーション
    setupFadeIn();            // フェードアップ
    setupCartButton();        // 製品一覧 → カート
    setupLightbox();          // ライトボックス画像拡大
    setupCartCount(); // カート数を表示
    setupFadeSection(); //フェードセクションのスイッチ
    setupCharacterAnimation(); //ステポリくんのアニメ
    setupMoreModals(); // Moreの表示




  
    // ▼ 今後追加する機能があれば、この下に呼び出し関数を追加していけばOK
    // setupSlider();
    // setupScrollToTop();
    // setupFormValidation();
  });
  
  // ▼ サイドメニュー開閉
  function setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
  
    if (!menuToggle || !sideMenu || !closeMenu) return;
  
    menuToggle.addEventListener('click', () => sideMenu.classList.toggle('open'));
    closeMenu.addEventListener('click', () => sideMenu.classList.remove('open'));
    document.addEventListener('click', (e) => {
      if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        sideMenu.classList.remove('open');
      }
    });
  }
  
  // ▼ タイピングアニメーション
  function setupTypingEffect() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
          const el = entry.target;
          const text = el.dataset.text;
          let index = 0;
          el.textContent = '';
          el.style.opacity = 1;
  
          function typeChar() {
            if (index < text.length) {
              el.textContent += text.charAt(index++);
              setTimeout(typeChar, 130);
            }
          }
          typeChar();
          el.classList.add('typed');
        }
      });
    }, { threshold: 0.5 });
  
    document.querySelectorAll('.typing-title').forEach(el => observer.observe(el));
  }
  
  // ▼ フェードアップ表示
  function setupFadeIn() {
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
  }
  
  // ▼ 製品一覧ページで「カートに進む」ボタン
  function setupCartButton() {
    const goToCartButton = document.getElementById('goToCart');
    const productItems = document.querySelectorAll('.product-item');
  
    if (!goToCartButton || productItems.length === 0) return;
  
    goToCartButton.addEventListener('click', () => {
      const cart = [];
  
      productItems.forEach(item => {
        const title = item.querySelector('.product-title')?.textContent.trim();
        const priceText = item.querySelector('.product-price')?.textContent.replace(/[^\d]/g, '');
        const price = parseInt(priceText, 10);
        const quantity = parseInt(item.querySelector('.quantity-select')?.value || '0', 10);
  
        if (quantity > 0 && title && price) {
          cart.push({ name: title, price, quantity });
        }
      });
  
      if (cart.length === 0) {
        alert('商品を1つ以上選んでください。');
        return;
      }
  
      localStorage.setItem('cartItems', JSON.stringify(cart));
      window.location.href = 'cart.html';
    });
  }
  
  // ▼ ライトボックス拡大表示
  function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
  
    if (!lightbox || !lightboxImage || !lightboxCaption || !closeBtn) return;
  
    document.querySelectorAll('.product-item img').forEach(img => {
      img.addEventListener('click', () => {
        const title = img.closest('.product-item')?.querySelector('.product-title')?.textContent;
        lightboxImage.src = img.src;
        lightboxCaption.textContent = title || '製品詳細';
        lightbox.classList.add('open');
      });
    });
  
    closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }
  // カートにカウントアップ
  function setupCartCount() {
    const countElement = document.getElementById('cartCount');
    if (!countElement) return;
  
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalCount = 0;
  
    cartItems.forEach(item => {
      totalCount += item.quantity;
    });
  
    if (totalCount > 0) {
      countElement.textContent = totalCount;
      countElement.style.display = 'inline-block';
    } else {
      countElement.style.display = 'none';
    }
  }
  // ▼ セクションふわっとフェード表示
  function setupFadeSection() {
    const sections = document.querySelectorAll('.fade-section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // 1回だけ発火
        }
      });
    }, { threshold: 0.2 });
  
    sections.forEach(section => observer.observe(section));
  }
  function setupCharacterAnimation() {
    const character = document.querySelector('.character-wrapper');
    if (!character) return;
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          character.classList.add('active');
          observer.unobserve(entry.target); // 1回で終了
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(character);
  }
  function setupMoreModals() {
    const buttons = document.querySelectorAll('.more-button');
    const modals = document.querySelectorAll('.modal-overlay');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const modal = document.getElementById(targetId);
        if (modal) modal.classList.add('active');
      });
    });
  
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });
  }
  
  