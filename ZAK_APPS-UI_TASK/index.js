
        const products = [
            {
                id: 1,
                name: "OKAZU Curry Miso",
                price: 1167.12,
                rating: 5,
                category: "miso",
                tags: ["vegan", "organic"],
                description: "Traditional sweet miso made with organic soybeans. Perfect for marinades and glazes.",
                emoji: "🥣",
                color: "#8B4513",
                image: "images/okazu.jpg"
            },
            {
                id: 2,
                name: "OKAZU Spicy Miso",
                price: 1257.05,
                rating: 5,
                category: "miso",
                tags: ["vegan", "organic"],
                description: "Bold and flavorful spicy miso with a kick. Great for adding depth to any dish.",
                emoji: "🌶️",
                color: "#C41E3A",
                image: "images/spicy.jpg"
            },
            {
                id: 3,
                name: "Miso Variety Pack",
                price: 3233.81,
                rating: 5,
                category: "bundle",
                tags: ["vegan", "organic"],
                description: "A collection of our best-selling miso varieties. Perfect for exploring different flavors.",
                emoji: "📦",
                color: "#4A5D23",
                image: "images/miso_soup1.jpg"
            },
            {
                id: 4,
                name: "ABO MATCHA",
                price: 2245.43,
                rating: 4,
                category: "tea",
                tags: ["organic"],
                description: "Premium ceremonial grade matcha powder. Rich in antioxidants and perfect for lattes.",
                emoji: "🍵",
                color: "#2C5F2D",
                image: "images/abo.jpg"
            },
            {
                id: 5,
                name: "OKAZU Classic Miso Contindment",
                price: 1077.18,
                rating: 5,
                category: "miso",
                tags: ["vegan", "organic"],
                description: "Our original recipe miso paste. Versatile and authentic Japanese flavor.",
                emoji: "🍜",
                color: "#D2691E",
                image: "images/spicy_chilli.jpg"
            },
            {
                id: 6,
                name: "Miso Soup Mix",
                price: 1706.06,
                rating: 4,
                category: "soup",
                tags: ["vegan"],
                description: "Instant miso soup mix with seaweed and tofu. Quick and convenient.",
                emoji: "🥘",
                color: "#6B8E23",
                image: "images/miso_soup.jpg"
            }
        ];

        let cartCount = 0;
        let currentQuantity = 1;
        let currentProduct = null;
        let filteredProducts = [...products];

       
        window.onload = function() {
            renderHomeProducts();
            renderProducts();
        };

        
        function showPage(page) {
            document.getElementById('homePage').classList.add('hidden');
            document.getElementById('productsPage').classList.add('hidden');
            document.getElementById('productDetailPage').classList.add('hidden');
            document.getElementById('orderSuccessPage').classList.add('hidden');

            if (page === 'home') {
                document.getElementById('homePage').classList.remove('hidden');
            } else if (page === 'products') {
                document.getElementById('productsPage').classList.remove('hidden');
                renderProducts();
            } else if (page === 'detail') {
                document.getElementById('productDetailPage').classList.remove('hidden');
            } else if (page === 'success') {
                document.getElementById('orderSuccessPage').classList.remove('hidden');
            }

            window.scrollTo(0, 0);
        }

        
        function renderHomeProducts() {
            const container = document.getElementById('homeProducts');
            container.innerHTML = products.slice(0, 4).map(product => createProductCard(product)).join('');
        }

        function renderProducts() {
            const container = document.getElementById('productsGrid');
            container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        }

        function createProductCard(product) {
            const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
            return `
                <div class="product-card" onclick="showProductDetail(${product.id})">
                    <div class="product-image" style="background-image: url('${product.image}');"></div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating">${stars}</div>
                    <div class="product-price">${product.price.toFixed(2)}</div>
                </div>
            `;
        }

        
        function showProductDetail(productId) {
            currentProduct = products.find(p => p.id === productId);
            currentQuantity = 1;

            document.getElementById('detailName').textContent = currentProduct.name;
            document.getElementById('detailPrice').textContent = `${currentProduct.price.toFixed(2)}`;
            document.getElementById('detailDescription').textContent = currentProduct.description;
            document.getElementById('detailRating').textContent = '★'.repeat(currentProduct.rating) + '☆'.repeat(5 - currentProduct.rating);
            document.getElementById('quantity').textContent = currentQuantity;
            
            // Set product detail image
            document.getElementById('detailImage').style.backgroundImage = `url('${currentProduct.image}')`;

            showPage('detail');
        }


        function changeQuantity(delta) {
            currentQuantity = Math.max(1, currentQuantity + delta);
            document.getElementById('quantity').textContent = currentQuantity;
        }

    
        function addToCart() {
            cartCount += currentQuantity;
            document.getElementById('cartCount').textContent = cartCount;
            alert(`Added ${currentQuantity} item(s) to cart!`);
        }

        function buyNow() {
            cartCount += currentQuantity;
            document.getElementById('cartCount').textContent = cartCount;
            showPage('success');
        }

        
        function applyFilters() {
            const rating5 = document.getElementById('rating5').checked;
            const rating4 = document.getElementById('rating4').checked;
            const vegan = document.getElementById('vegan').checked;
            const organic = document.getElementById('organic').checked;

            filteredProducts = products.filter(product => {
                let pass = true;

                if (rating5 && product.rating !== 5) pass = false;
                if (rating4 && product.rating < 4) pass = false;
                if (vegan && !product.tags.includes('vegan')) pass = false;
                if (organic && !product.tags.includes('organic')) pass = false;

                return pass;
            });

            applySort();
        }

        function applySort() {
            const sortBy = document.getElementById('sortSelect').value;

            switch(sortBy) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }

            renderProducts();
        }