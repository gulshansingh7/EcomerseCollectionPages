// script.js
document.getElementById("fetch-btn").addEventListener("click", fetchProducts);
document.getElementById("sort-select").addEventListener("change", sortProducts);

let products = [];

function fetchProducts() {
  fetch("https://interveiw-mock-api.vercel.app/api/getProducts")
    .then((response) => response.json())
    .then(({ data }) => {
      console.log(data);

      products = data;
      document.getElementById("sort-select").classList.remove("hidden");

      renderProducts(products);
    })
    .catch((err) => console.error("Error fetching products:", err));
}



function renderProducts(productsToRender) {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; 
  
    productsToRender.forEach(({ product }, index) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      
      product.variants.forEach((variant) => {
        productDiv.innerHTML = `
          <img src="${product.image.src}" alt="${product.image.alt}">
          <div class="product-info">
            <div class="product-name">${product.title}</div>
            <div class="product-price">$${variant.price}</div>
            <div class="product-description">${product.image.alt.slice(0, 30)}...</div>
            <button>Add to Cart</button>
          </div>
        `;
      });
  
      container.appendChild(productDiv);
  
      
      setTimeout(() => {
        productDiv.classList.add("animate"); 
      }, index * 100); 
    });
  }
  

function sortProducts(event) {
  console.log(event);

  const sortOrder = event.target.value;
  console.log(sortOrder);

  if (sortOrder === "asc") {
    products.sort(
      (a, b) => a.product.variants[0].price - b.product.variants[0].price
    );
  } else if (sortOrder === "desc") {
    products.sort(
      (a, b) => b.product.variants[0].price - a.product.variants[0].price
    );
  }
  renderProducts(products);
}
