// Datos de productos de ejemplo para el taller.
// Esta estructura es intencionalmente simple para que sea fácil de extender en ramas feature/*.
const PRODUCTS = [
  {
    id: 1,
    name: "Laptop Gamer",
    price: 3999000,
    installmentText: "12x 333.250 sin interés",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_858255-MLA92985235479_092025-F.webp",
    category: "laptop",
    freeShipping: true,
    rating: 4.5,
    reviews: 128,
    badges: ["bestseller", "offer"]
  },
  {
    id: 2,
    name: "Smartphone",
    price: 1499900,
    installmentText: "6x 249.983 sin interés",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_993015-MLA85344277658_062025-F.webp",
    category: "smartphone",
    freeShipping: true,
    rating: 4.8,
    reviews: 342,
    badges: ["bestseller"]
  },
  {
    id: 3,
    name: "Audífonos Inalámbricos",
    price: 299900,
    installmentText: "6x 49.983 sin interés",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_933232-MLA95691272096_102025-F.webp",
    category: "audio",
    freeShipping: true,
    rating: 4.3,
    reviews: 89,
    badges: ["offer"]
  },
  {
    id: 4,
    name: "Smartwatch Deportivo",
    price: 559900,
    installmentText: "6x 93.317 sin interés",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_850253-MLA99448228592_112025-F.webp",
    category: "wearable",
    freeShipping: false,
    rating: 4.6,
    reviews: 156,
    badges: []
  },
  {
    id: 5,
    name: "Tablet 10\"",
    price: 899900,
    installmentText: "12x 74.992 sin interés",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_906073-MLA97279751650_112025-F.webp",
    category: "tablet",
    freeShipping: true,
    rating: 4.4,
    reviews: 203,
    badges: ["bestseller"]
  },
];

const elements = {
  productsGrid: document.getElementById("products-grid"),
  productsEmptyMessage: document.getElementById("products-empty-message"),
  mainSearchForm: document.getElementById("main-search-form"),
  mainSearchInput: document.getElementById("main-search-input"),
  secondarySearchForm: document.getElementById("secondary-search-form"),
  secondarySearchInput: document.getElementById("secondary-search-input"),
  currentYear: document.getElementById("current-year"),
  cartButton: document.getElementById("cart-button"),
  cartCount: document.getElementById("cart-count"),
  cartModal: document.getElementById("cart-modal"),
  cartModalClose: document.getElementById("cart-modal-close"),
  cartModalOverlay: document.getElementById("cart-modal-overlay"),
  cartItems: document.getElementById("cart-items"),
  cartFooter: document.getElementById("cart-footer"),
  cartTotalPrice: document.getElementById("cart-total-price"),
  sortSelect: document.getElementById("sort-select"),
  freeShippingFilter: document.getElementById("free-shipping-filter"),
};

let cart = [];
let currentFilters = {
  query: "",
  category: "all",
  sort: "",
  freeShipping: false,
};

function formatPrice(cents) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(cents);
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "card product-card";
  article.dataset.productName = product.name.toLowerCase();

  const badgesHTML = product.badges.length > 0 || product.freeShipping
    ? `<div class="product-card__badges">
        ${product.freeShipping ? '<span class="badge badge--free-shipping">Envío gratis</span>' : ''}
        ${product.badges.includes('offer') ? '<span class="badge badge--offer">Oferta</span>' : ''}
        ${product.badges.includes('bestseller') ? '<span class="badge badge--bestseller">Más vendido</span>' : ''}
      </div>`
    : '';

  const stars = '⭐'.repeat(Math.floor(product.rating));
  
  article.innerHTML = `
    <div class="product-card__image-wrapper">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-card__image"
      />
    </div>
    <div class="product-card__body">
      ${badgesHTML}
      <h3 class="product-card__name">${product.name}</h3>
      <div class="product-card__rating">
        <span class="product-card__stars">${stars}</span>
        <span>(${product.reviews})</span>
      </div>
      <p class="product-card__price">
        ${formatPrice(product.price)}
        <span>${product.installmentText}</span>
      </p>
      <div class="product-card__actions">
        <button 
          class="btn btn--primary js-add-to-cart" 
          type="button"
          data-product-id="${product.id}">
          Agregar
        </button>
        <button 
          class="btn btn--ghost js-buy-button" 
          type="button"
          data-product-id="${product.id}">
          Comprar
        </button>
      </div>
    </div>
  `;

  return article;
}

function renderProducts(products) {
  if (!elements.productsGrid) return;

  elements.productsGrid.innerHTML = "";

  if (!products.length) {
    if (elements.productsEmptyMessage) {
      elements.productsEmptyMessage.hidden = false;
    }
    return;
  }

  if (elements.productsEmptyMessage) {
    elements.productsEmptyMessage.hidden = true;
  }

  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });

  elements.productsGrid.appendChild(fragment);
}

function filterProductsByQuery(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return PRODUCTS;

  return PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery)
  );
}

function applyFilters() {
  let filtered = [...PRODUCTS];

  // Filtro por búsqueda
  if (currentFilters.query) {
    const normalizedQuery = currentFilters.query.trim().toLowerCase();
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
  }

  // Filtro por categoría
  if (currentFilters.category !== "all") {
    filtered = filtered.filter((product) => product.category === currentFilters.category);
  }

  // Filtro por envío gratis
  if (currentFilters.freeShipping) {
    filtered = filtered.filter((product) => product.freeShipping);
  }

  // Ordenamiento
  if (currentFilters.sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}

function handleSearchSubmit(event, inputElement) {
  event.preventDefault();
  if (!inputElement) return;
  currentFilters.query = inputElement.value;
  const filtered = applyFilters();
  renderProducts(filtered);
}

function handleCategoryClick(event) {
  const button = event.target.closest(".category-btn");
  if (!button) return;

  document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");

  currentFilters.category = button.dataset.category;
  const filtered = applyFilters();
  renderProducts(filtered);
}

function handleSortChange() {
  currentFilters.sort = elements.sortSelect.value;
  const filtered = applyFilters();
  renderProducts(filtered);
}

function handleFreeShippingChange() {
  currentFilters.freeShipping = elements.freeShippingFilter.checked;
  const filtered = applyFilters();
  renderProducts(filtered);
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  showCartNotification();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
  renderCartItems();
}

function updateCartQuantity(productId, delta) {
  const item = cart.find((item) => item.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
    renderCartItems();
  }
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (elements.cartCount) {
    elements.cartCount.textContent = totalItems;
  }
}

function showCartNotification() {
  const originalText = elements.cartButton.textContent;
  elements.cartButton.textContent = "✓ Agregado";
  setTimeout(() => {
    elements.cartButton.innerHTML = `🛒 <span class="navbar__cart-badge" id="cart-count">${cart.reduce((sum, item) => sum + item.quantity, 0)}</span>`;
  }, 1000);
}

function openCartModal() {
  if (elements.cartModal) {
    elements.cartModal.hidden = false;
    renderCartItems();
  }
}

function closeCartModal() {
  if (elements.cartModal) {
    elements.cartModal.hidden = true;
  }
}

function renderCartItems() {
  if (!elements.cartItems) return;

  if (cart.length === 0) {
    elements.cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    if (elements.cartFooter) elements.cartFooter.hidden = true;
    return;
  }

  if (elements.cartFooter) elements.cartFooter.hidden = false;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (elements.cartTotalPrice) {
    elements.cartTotalPrice.textContent = formatPrice(total);
  }

  elements.cartItems.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item__image" />
      <div class="cart-item__info">
        <h4 class="cart-item__name">${item.name}</h4>
        <p class="cart-item__price">${formatPrice(item.price)}</p>
        <div class="cart-item__quantity">
          <button type="button" data-product-id="${item.id}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-product-id="${item.id}" data-action="increase">+</button>
        </div>
      </div>
      <button class="cart-item__remove" type="button" data-product-id="${item.id}" data-action="remove">🗑️</button>
    </div>
  `
    )
    .join("");
}

function handleCartItemAction(event) {
  const button = event.target.closest("button[data-product-id]");
  if (!button) return;

  const productId = Number(button.dataset.productId);
  const action = button.dataset.action;

  if (action === "increase") {
    updateCartQuantity(productId, 1);
  } else if (action === "decrease") {
    updateCartQuantity(productId, -1);
  } else if (action === "remove") {
    removeFromCart(productId);
  }
}

function handleAddToCart(event) {
  const button = event.target.closest(".js-add-to-cart");
  if (!button) return;

  const productId = Number(button.dataset.productId);
  addToCart(productId);
}

function handleBuyButtonClick(event) {
  const button = event.target.closest(".js-buy-button");
  if (!button) return;

  const productId = Number(button.dataset.productId);
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  alert(`Simulación de compra:\n\nProducto: ${product.name}\nPrecio: ${formatPrice(product.price)}`);
}

function initEventListeners() {
  if (elements.mainSearchForm && elements.mainSearchInput) {
    elements.mainSearchForm.addEventListener("submit", (event) =>
      handleSearchSubmit(event, elements.mainSearchInput)
    );
  }

  if (elements.secondarySearchForm && elements.secondarySearchInput) {
    elements.secondarySearchForm.addEventListener("submit", (event) =>
      handleSearchSubmit(event, elements.secondarySearchInput)
    );
  }

  if (elements.productsGrid) {
    elements.productsGrid.addEventListener("click", (event) => {
      handleBuyButtonClick(event);
      handleAddToCart(event);
    });
  }

  // Categorías
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", handleCategoryClick);
  });

  // Filtros
  if (elements.sortSelect) {
    elements.sortSelect.addEventListener("change", handleSortChange);
  }

  if (elements.freeShippingFilter) {
    elements.freeShippingFilter.addEventListener("change", handleFreeShippingChange);
  }

  // Carrito
  if (elements.cartButton) {
    elements.cartButton.addEventListener("click", openCartModal);
  }

  if (elements.cartModalClose) {
    elements.cartModalClose.addEventListener("click", closeCartModal);
  }

  if (elements.cartModalOverlay) {
    elements.cartModalOverlay.addEventListener("click", closeCartModal);
  }

  if (elements.cartItems) {
    elements.cartItems.addEventListener("click", handleCartItemAction);
  }

  const keywordSpans = document.querySelectorAll(".hero__hint-keyword");
  keywordSpans.forEach((span) => {
    span.addEventListener("click", () => {
      const keyword = span.textContent || "";
      if (elements.secondarySearchInput) {
        elements.secondarySearchInput.value = keyword;
        currentFilters.query = keyword;
        const filtered = applyFilters();
        renderProducts(filtered);
      }
    });
  });
}

function setCurrentYear() {
  if (!elements.currentYear) return;
  const year = new Date().getFullYear();
  elements.currentYear.textContent = year.toString();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(PRODUCTS);
  initEventListeners();
  setCurrentYear();
});

