// Datos de productos de ejemplo para el taller.
// Esta estructura es intencionalmente simple para que sea fácil de extender en ramas feature/*.
const PRODUCTS = [
  {
    id: 1,
    name: "Laptop Gamer",
    price: 3999000,
    installmentText: "12x 333.250 sin interés",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_858255-MLA92985235479_092025-F.webp",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 1499900,
    installmentText: "6x 249.983 sin interés",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_993015-MLA85344277658_062025-F.webp",
  },
  {
    id: 3,
    name: "Audífonos Inalámbricos",
    price: 299900,
    installmentText: "6x 49.983 sin interés",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_933232-MLA95691272096_102025-F.webp",
  },
  {
    id: 4,
    name: "Smartwatch Deportivo",
    price: 559900,
    installmentText: "6x 93.317 sin interés",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_850253-MLA99448228592_112025-F.webp",
  },
  {
    id: 5,
    name: "Tablet 10\"",
    price: 899900,
    installmentText: "12x 74.992 sin interés",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_906073-MLA97279751650_112025-F.webp",
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

  article.innerHTML = `
    <div class="product-card__image-wrapper">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-card__image"
      />
    </div>
    <div class="product-card__body">
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__price">
        ${formatPrice(product.price)}
        <span>${product.installmentText}</span>
      </p>
      <div class="product-card__actions">
        <button 
          class="btn btn--primary js-buy-button" 
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

function handleSearchSubmit(event, inputElement) {
  event.preventDefault();
  if (!inputElement) return;
  const query = inputElement.value;
  const filtered = filterProductsByQuery(query);
  renderProducts(filtered);
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
    elements.productsGrid.addEventListener("click", handleBuyButtonClick);
  }

  const keywordSpans = document.querySelectorAll(".hero__hint-keyword");
  keywordSpans.forEach((span) => {
    span.addEventListener("click", () => {
      const keyword = span.textContent || "";
      if (elements.secondarySearchInput) {
        elements.secondarySearchInput.value = keyword;
        const filtered = filterProductsByQuery(keyword);
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

