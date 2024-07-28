// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, options);

    images.forEach(img => imageObserver.observe(img));

    // Dynamic product loading
    const productContainer = document.querySelector('#products .scroll-container');
    const products = [
        { name: 'Banarasi Silk Saree', price: '₹15,999', image: 'banarasi-saree.jpg' },
        { name: 'Kashmiri Pashmina Shawl', price: '₹8,499', image: 'kashmiri-shawl.jpg' },
        { name: 'Chanderi Silk Kurta', price: '₹3,999', image: 'chanderi-kurta.jpg' },
        // Add more products as needed
    ];

    function createProductElement(product) {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button onclick="addToCart('${product.name}')">Add to Cart</button>
        `;
        return div;
    }

    products.forEach(product => {
        productContainer.appendChild(createProductElement(product));
    });

    // Shopping cart functionality
    window.cart = [];

    window.addToCart = function(productName) {
        cart.push(productName);
        updateCartCount();
        showNotification(`${productName} added to cart!`);
    };

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Form validation
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Simulate form submission
            showNotification('Thank you for your feedback!');
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    // Interactive state information
    const states = document.querySelectorAll('.state');
    states.forEach(state => {
        state.addEventListener('click', function() {
            const stateName = this.querySelector('h3').textContent;
            showStateInfo(stateName);
        });
    });

    function showStateInfo(stateName) {
        const stateInfo = {
            'Rajasthan': 'Known for vibrant Bandhani textiles and intricate Rajasthani jewelry.',
            'Gujarat': 'Famous for Patola sarees and colorful Kutch embroidery.',
            'Maharashtra': 'Home to exquisite Paithani sarees and Kolhapuri chappals.',
            // Add more state information as needed
        };

        const infoText = stateInfo[stateName] || 'Information not available';
        showNotification(infoText);
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('footer form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing to our newsletter!');
            this.reset();
        } else {
            showNotification('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add a scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '&uarr;';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});