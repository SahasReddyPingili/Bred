// ==========================================================================
// [PROJECT: UNTITLED] — APPLICATION CORE LOGIC & STATE ENGINE
// ==========================================================================

function getSanitizedBrandName() {
    const raw = localStorage.getItem('brand_name') || '[UNTITLED]';
    return raw.replace(/™/g, '').trim() || '[UNTITLED]';
}

const APP_STATE = {
    brandName: getSanitizedBrandName(),
    brandSub: 'ARCHIVE 001 // 4 DIVISIONS',
    cart: JSON.parse(localStorage.getItem('campus_cart') || '[]'),
    appliedDiscount: JSON.parse(localStorage.getItem('campus_discount') || 'null'),
    currentCategory: 'all',
    currentSort: 'featured',
    selectedSizes: {}, // map of prodId -> selected size
    wishlist: JSON.parse(localStorage.getItem('campus_wishlist') || '[]'),
    freeShippingThreshold: 65.00,
    shippingFee: 6.50
};

// Available College Universities for Student Pass
const UNIVERSITIES = [
    "New York University (NYU)",
    "University of California, Los Angeles (UCLA)",
    "University of Texas at Austin",
    "University of Michigan, Ann Arbor",
    "UC Berkeley",
    "Columbia University (NYC)",
    "Ohio State University",
    "University of Southern California (USC)",
    "University of Florida",
    "Penn State University",
    "University of Washington",
    "University of Toronto"
];

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Automatically adopt page division if specified on <body>
    const bodyCat = document.body.dataset.category;
    if (bodyCat) {
        APP_STATE.currentCategory = bodyCat;
    }
    initMobileDetection();
    initBrandSync();
    initSplitPreloader();
    renderProducts();
    renderCampusLookbook();
    updateCartUI();
    initFitAdvisor();
    initUniversityDropdown();
    updateCustomPreview();
    setupEventListeners();
});

// ==========================================================================
// 4-WAY LOGO SPLIT ANIMATION SYSTEM
// Splits the emblem into 4 distinct quadrants: F1, Sports, Customs, Streetwear
// ==========================================================================
let preloaderTimer = null;

function initSplitPreloader() {
    const preloader = document.getElementById('splitPreloader');
    const bar = document.getElementById('preloaderBar');
    const pct = document.getElementById('preloaderPercent');
    const statusText = document.getElementById('preloaderStatusText');

    if (!preloader || !bar || !pct) return;

    // Reset classes
    preloader.classList.remove('splitting', 'done');
    preloader.style.display = 'flex';
    bar.style.width = '0%';
    pct.textContent = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 3) + 2; // Slower, steady progressive build-up
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            bar.style.width = '100%';
            pct.textContent = '100%';
            if (statusText) statusText.textContent = '✦ THE 4 ARCHIVE DIVISIONS UNLOCKED ✦';

            if (window.soundEngine) window.soundEngine.playPowerUp();

            setTimeout(() => {
                // Trigger the 4-way quadrant explosion
                preloader.classList.add('splitting');
                if (window.soundEngine) window.soundEngine.playSplitWhoosh();

                setTimeout(() => {
                    preloader.classList.add('done');
                    showToast('Archive 001 Split: F1, Sports, Customs & Streetwear loaded');
                }, 1200);
            }, 500);
        } else {
            bar.style.width = `${progress}%`;
            pct.textContent = `${progress}%`;
            if (progress < 25 && statusText) {
                statusText.textContent = '[01/04] APEX F1 TELEMETRY CALIBRATED...';
            } else if (progress >= 25 && progress < 50 && statusText) {
                statusText.textContent = '[02/04] VARSITY 94 ATHLETICS MESH WOVEN...';
            } else if (progress >= 50 && progress < 75 && statusText) {
                statusText.textContent = '[03/04] BESPOKE LAB 3D PUFF INK ARMED...';
            } else if (progress >= 75 && statusText) {
                statusText.textContent = '[04/04] 200+ GSM HEAVYWEIGHT STREETWEAR READY...';
            }
        }
    }, 55);
}

function skipSplitIntro() {
    const preloader = document.getElementById('splitPreloader');
    if (preloader) {
        preloader.classList.add('splitting', 'done');
    }
}

function triggerSplitIntro() {
    if (!document.getElementById('splitPreloader')) {
        window.location.href = 'index.html';
        return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initSplitPreloader();
}

function navigateToDivision(divisionKey) {
    if (window.soundEngine) window.soundEngine.playClick();
    if (divisionKey === 'f1') {
        window.location.href = 'f1.html';
    } else if (divisionKey === 'sports') {
        window.location.href = 'sports.html';
    } else if (divisionKey === 'custom') {
        window.location.href = 'custom.html';
    } else if (divisionKey === 'streetwear') {
        window.location.href = 'streetwear.html';
    } else {
        window.location.href = 'index.html#catalog';
    }
}

// ==========================================================================
// LIVE BRAND REBRAND SYSTEM
// Allows founders, testers & clients to change the placeholder brand name in real time!
// ==========================================================================
function initBrandSync() {
    const rebrandInput = document.getElementById('liveRebrandInput');
    if (rebrandInput) {
        rebrandInput.value = APP_STATE.brandName;
        rebrandInput.addEventListener('input', (e) => {
            const val = e.target.value.replace(/™/g, '').trim() || '[UNTITLED]';
            updateBrandName(val);
        });
    }
    applyBrandNameToDOM();
}

function updateBrandName(name) {
    const clean = (name || '').replace(/™/g, '').trim() || '[UNTITLED]';
    APP_STATE.brandName = clean;
    localStorage.setItem('brand_name', clean);
    applyBrandNameToDOM();
}

function applyBrandNameToDOM() {
    document.querySelectorAll('.brand-dynamic-text').forEach(el => {
        el.textContent = APP_STATE.brandName;
    });
    const docTitle = document.querySelector('title');
    if (docTitle) {
        const bodyCat = document.body.dataset.category;
        const pageNames = {
            f1: 'APEX F1™ Paddock Division',
            sports: 'VARSITY 94™ Athletics Division',
            custom: 'BESPOKE LAB™ Custom Studio',
            streetwear: 'GRAIL 200+ GSM™ Streetwear Division'
        };
        if (bodyCat && pageNames[bodyCat]) {
            docTitle.textContent = `${pageNames[bodyCat]} — ${APP_STATE.brandName} Archive`;
        } else if (document.body.classList.contains('student-theme')) {
            docTitle.textContent = `Instant Student Pass (-20%) — ${APP_STATE.brandName} Archive`;
        } else if (document.body.classList.contains('advisor-theme')) {
            docTitle.textContent = `Interactive Size & Drape Advisor — ${APP_STATE.brandName} Archive`;
        } else {
            docTitle.textContent = `${APP_STATE.brandName} — Heavyweight Campus Streetwear Archive`;
        }
    }
}

// ==========================================================================
// PRODUCT CATALOG RENDERING & FILTERING
// ==========================================================================
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let items = [...PRODUCTS];

    // Filter by Division or Category
    if (APP_STATE.currentCategory !== 'all') {
        items = items.filter(p => p.division === APP_STATE.currentCategory || p.category === APP_STATE.currentCategory);
    }

    // Sort items
    if (APP_STATE.currentSort === 'price-low') {
        items.sort((a, b) => a.price - b.price);
    } else if (APP_STATE.currentSort === 'price-high') {
        items.sort((a, b) => b.price - a.price);
    } else if (APP_STATE.currentSort === 'gsm') {
        items.sort((a, b) => (b.gsmValue || 0) - (a.gsmValue || 0));
    }

    // Update Catalog Heading
    const catalogHeading = document.getElementById('catalogHeading');
    if (catalogHeading) {
        const divisionTitles = {
            all: 'ALL CAMPUS ESSENTIALS',
            f1: 'F1 & MOTORSPORT MERCH',
            sports: 'SPORTS & VARSITY ARCHIVE',
            custom: 'BESPOKE LAB CUSTOMISATIONS',
            streetwear: 'HEAVYWEIGHT STREETWEAR'
        };
        catalogHeading.textContent = divisionTitles[APP_STATE.currentCategory] || 'CAMPUS ESSENTIALS';
    }

    grid.innerHTML = items.map(product => {
        const defaultSize = APP_STATE.selectedSizes[product.id] || product.sizes[0];
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-thumb-wrap">
                    <img src="${product.images[0]}" alt="${product.title}" class="product-img" loading="lazy">
                    <span class="product-badge ${product.badgeColor}">${product.badge}</span>
                    <button class="quick-view-overlay-btn" onclick="openQuickView('${product.id}')">
                        QUICK VIEW
                    </button>
                </div>
                <div class="product-details">
                    <div class="product-meta-specs">
                        <span>${product.gsm}</span>
                        <span style="color: var(--accent-volt); font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700;">${product.fit}</span>
                    </div>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-tagline">${product.tagline}</p>

                    <div class="product-pricing-box">
                        <span class="price-regular">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>

                    <div class="student-tag-calc">
                        Student Pass: <strong>$${product.studentPrice.toFixed(2)}</strong> (-20%)
                    </div>

                    <div class="card-size-selector">
                        ${product.sizes.map(sz => `
                            <button class="card-size-btn ${sz === defaultSize ? 'selected' : ''}" 
                                onclick="selectProductSize('${product.id}', '${sz}')">
                                ${sz}
                            </button>
                        `).join('')}
                    </div>

                    <button class="add-to-bag-btn" onclick="addToCart('${product.id}')">
                        <span>+ ADD TO BAG</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function selectProductSize(productId, size) {
    if (window.soundEngine) window.soundEngine.playClick();
    APP_STATE.selectedSizes[productId] = size;
    
    // Update active size button UI in that card
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (card) {
        card.querySelectorAll('.card-size-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.textContent.trim() === size);
        });
    }
}

function setCategoryFilter(category, btnElement = null) {
    if (window.soundEngine) window.soundEngine.playClick();
    APP_STATE.currentCategory = category;
    
    document.querySelectorAll('.filter-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === category || btn === btnElement);
    });
    
    renderProducts();
}

function setSorting(sortValue) {
    APP_STATE.currentSort = sortValue;
    renderProducts();
}

// ==========================================================================
// DIVISION 03: CUSTOMISATION STUDIO CONTROLLER
// ==========================================================================
const CUSTOM_STUDIO_STATE = {
    blank: 'hoodie',
    text: "DORM 4B // '26",
    finish: 'puff',
    color: '#d3982d',
    colorName: 'Amber Gold',
    size: 'L',
    hoodiePrice: 84.00,
    teePrice: 48.00
};

function openCustomStudioModal() {
    if (window.soundEngine) window.soundEngine.playClick();
    const modal = document.getElementById('customStudioModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateCustomPreview();
}

function closeCustomStudioModal() {
    const modal = document.getElementById('customStudioModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectCustomBlank(type) {
    if (window.soundEngine) window.soundEngine.playClick();
    CUSTOM_STUDIO_STATE.blank = type;
    
    const btnH = document.getElementById('btnBlankHoodie');
    const btnT = document.getElementById('btnBlankTee');
    const img = document.getElementById('customGarmentImg');

    if (btnH && btnT) {
        btnH.classList.toggle('active', type === 'hoodie');
        btnT.classList.toggle('active', type === 'tee');
    }

    if (img) {
        img.src = type === 'hoodie' 
            ? "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80"
            : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80";
    }
}

function selectCustomFinish(finish) {
    if (window.soundEngine) window.soundEngine.playClick();
    CUSTOM_STUDIO_STATE.finish = finish;

    const btnPuff = document.getElementById('btnPuffFinish');
    const btnStitch = document.getElementById('btnStitchFinish');
    const overlay = document.getElementById('customTextOverlay');

    if (btnPuff && btnStitch) {
        btnPuff.classList.toggle('active', finish === 'puff');
        btnStitch.classList.toggle('active', finish === 'embroidery');
    }

    if (overlay) {
        overlay.classList.toggle('puff', finish === 'puff');
        overlay.style.letterSpacing = finish === 'puff' ? '0.08em' : '0.18em';
    }
}

function setCustomColor(hex, name) {
    if (window.soundEngine) window.soundEngine.playClick();
    CUSTOM_STUDIO_STATE.color = hex;
    CUSTOM_STUDIO_STATE.colorName = name;
    updateCustomPreview();
}

function selectCustomSize(size, btnEl) {
    if (window.soundEngine) window.soundEngine.playClick();
    CUSTOM_STUDIO_STATE.size = size;
    const container = document.getElementById('customSizePicker');
    if (container) {
        container.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');
    }
}

function updateCustomPreview() {
    const input = document.getElementById('customTextInput');
    const overlay = document.getElementById('customTextOverlay');

    if (input && overlay) {
        const val = input.value.trim().toUpperCase() || 'CUSTOM ARCHIVE';
        CUSTOM_STUDIO_STATE.text = val;
        overlay.textContent = val;
        overlay.style.color = CUSTOM_STUDIO_STATE.color;
        overlay.style.textShadow = `0 0 18px ${CUSTOM_STUDIO_STATE.color}88`;
    }
}

// User Transparent PNG Upload Handler
function handleCustomPngUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.includes('png') && !file.type.includes('webp') && !file.type.includes('svg')) {
        showToast('Please upload a transparent background PNG or WEBP file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        CUSTOM_STUDIO_STATE.uploadedGraphicSrc = dataUrl;

        const imgEl = document.getElementById('customUploadedGraphic');
        const controls = document.getElementById('uploadedGraphicControls');

        if (imgEl) {
            imgEl.src = dataUrl;
            imgEl.style.display = 'block';
            imgEl.style.maxWidth = `${CUSTOM_STUDIO_STATE.graphicScale || 110}px`;
            imgEl.style.maxHeight = `${CUSTOM_STUDIO_STATE.graphicScale || 110}px`;
        }
        if (controls) {
            controls.classList.add('active');
        }

        if (window.soundEngine) window.soundEngine.playAddToCart();
        showToast('Transparent PNG graphic rendered on garment');
    };
    reader.readAsDataURL(file);
}

function adjustGraphicScale(val) {
    CUSTOM_STUDIO_STATE.graphicScale = val;
    const imgEl = document.getElementById('customUploadedGraphic');
    if (imgEl) {
        imgEl.style.maxWidth = `${val}px`;
        imgEl.style.maxHeight = `${val}px`;
    }
}

function setGraphicPosition(pos) {
    if (window.soundEngine) window.soundEngine.playClick();
    CUSTOM_STUDIO_STATE.graphicPosition = pos;

    const imgEl = document.getElementById('customUploadedGraphic');
    const btnCenter = document.getElementById('btnPosCenter');
    const btnPocket = document.getElementById('btnPosPocket');
    const btnBack = document.getElementById('btnPosBack');

    if (btnCenter) btnCenter.classList.toggle('active', pos === 'center');
    if (btnPocket) btnPocket.classList.toggle('active', pos === 'pocket');
    if (btnBack) btnBack.classList.toggle('active', pos === 'back');

    if (imgEl) {
        imgEl.classList.remove('pocket-left', 'full-back');
        if (pos === 'pocket') imgEl.classList.add('pocket-left');
        else if (pos === 'back') imgEl.classList.add('full-back');
    }
}

function removeUploadedGraphic() {
    if (window.soundEngine) window.soundEngine.playClick();
    CUSTOM_STUDIO_STATE.uploadedGraphicSrc = null;

    const imgEl = document.getElementById('customUploadedGraphic');
    const controls = document.getElementById('uploadedGraphicControls');
    const fileInput = document.getElementById('customPngUploadInput');

    if (imgEl) {
        imgEl.style.display = 'none';
        imgEl.src = '';
    }
    if (controls) controls.classList.remove('active');
    if (fileInput) fileInput.value = '';

    showToast('Graphic removed');
}

function addCustomItemToBag() {
    const isHoodie = CUSTOM_STUDIO_STATE.blank === 'hoodie';
    const price = isHoodie ? CUSTOM_STUDIO_STATE.hoodiePrice : CUSTOM_STUDIO_STATE.teePrice;
    const graphicTag = CUSTOM_STUDIO_STATE.uploadedGraphicSrc ? ' + PNG GRAPHIC' : '';
    const title = `BESPOKE ${isHoodie ? '200+ GSM HOODIE' : '200+ GSM TEE'} [${CUSTOM_STUDIO_STATE.text}${graphicTag}]`;
    const image = CUSTOM_STUDIO_STATE.uploadedGraphicSrc || (isHoodie 
        ? "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80"
        : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80");

    APP_STATE.cart.push({
        id: 'custom-' + Date.now(),
        title: title,
        price: price,
        studentPrice: price * 0.8,
        image: image,
        size: `${CUSTOM_STUDIO_STATE.size} (${CUSTOM_STUDIO_STATE.finish.toUpperCase()} / ${CUSTOM_STUDIO_STATE.colorName})`,
        qty: 1
    });

    saveCart();
    updateCartUI();
    closeCustomStudioModal();

    if (window.soundEngine) window.soundEngine.playAddToCart();
    showToast(`Added Bespoke "${CUSTOM_STUDIO_STATE.text}" to your Bag`);
    openCartDrawer();
}

// ==========================================================================
// CART & DRAWER STATE MANAGEMENT
// ==========================================================================
function addToCart(productId, customSize = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const size = customSize || APP_STATE.selectedSizes[productId] || product.sizes[0];
    const existingIndex = APP_STATE.cart.findIndex(item => item.id === productId && item.size === size);

    if (existingIndex > -1) {
        APP_STATE.cart[existingIndex].qty += 1;
    } else {
        APP_STATE.cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            studentPrice: product.studentPrice,
            image: product.images[0],
            size: size,
            gsm: product.gsm || '200+ GSM HEAVYWEIGHT',
            division: (product.badge || product.division || product.category || 'ARCHIVE 001').toUpperCase(),
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    
    if (window.soundEngine) window.soundEngine.playAddToCart();
    showToast(`Added ${product.title} (${size}) to Bag!`);
    openCartDrawer();
}

function updateCartQty(index, delta) {
    if (window.soundEngine) window.soundEngine.playClick();
    if (!APP_STATE.cart[index]) return;

    APP_STATE.cart[index].qty += delta;
    if (APP_STATE.cart[index].qty <= 0) {
        APP_STATE.cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
}

function removeCartItem(index) {
    if (window.soundEngine) window.soundEngine.playClick();
    APP_STATE.cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('campus_cart', JSON.stringify(APP_STATE.cart));
}

function updateCartUI() {
    // Total count badge
    const totalCount = APP_STATE.cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-counter').forEach(el => {
        el.textContent = totalCount;
    });

    const itemsList = document.getElementById('cartItemsList');
    if (!itemsList) return;

    if (APP_STATE.cart.length === 0) {
        itemsList.innerHTML = `
            <div class="empty-cart-view">
                <span class="empty-cart-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                </span>
                <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #fff; margin: 4px 0;">YOUR BAG IS CURRENTLY EMPTY</h4>
                <p style="font-size: 0.82rem; color: var(--text-secondary); max-width: 280px; margin: 0 auto;">No drops added yet. Explore our 200+ GSM heavyweight collegiate and racing staples.</p>
                <button class="checkout-btn" onclick="closeCartDrawer()" style="margin-top: 14px; max-width: 240px; height: 42px; font-size: 0.85rem;">
                    EXPLORE DROP 004
                </button>
            </div>
        `;
        renderCartSummary(0);
        return;
    }

    let subtotal = 0;
    itemsList.innerHTML = APP_STATE.cart.map((item, idx) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        const gsmBadge = item.gsm || '200+ GSM HEAVYWEIGHT';
        const divisionBadge = item.division || 'ARCHIVE 001';

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-header">
                        <span class="cart-item-division-tag">${divisionBadge}</span>
                        <h4 class="cart-item-title" title="${item.title}">${item.title}</h4>
                        <div class="cart-item-tags-row">
                            <span class="cart-badge-size">SIZE: ${item.size}</span>
                            <span class="cart-badge-spec">${gsmBadge}</span>
                        </div>
                    </div>
                    <div class="cart-item-bottom">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="updateCartQty(${idx}, -1)" title="Decrease quantity">−</button>
                            <span class="qty-display">${item.qty}</span>
                            <button class="qty-btn" onclick="updateCartQty(${idx}, 1)" title="Increase quantity">+</button>
                        </div>
                        <div class="cart-item-price-wrap">
                            <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                            <button class="remove-item-btn" onclick="removeCartItem(${idx})" title="Remove item from bag">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    renderCartSummary(subtotal);
}

function renderCartSummary(subtotal) {
    const shippingProgressText = document.getElementById('shippingProgressText');
    const shippingProgressBar = document.getElementById('shippingProgressBar');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const cartDiscountRow = document.getElementById('cartDiscountRow');
    const cartDiscountAmount = document.getElementById('cartDiscountAmount');
    const cartShippingEl = document.getElementById('cartShipping');
    const cartTotalEl = document.getElementById('cartTotal');
    const appliedCouponContainer = document.getElementById('appliedCouponContainer');
    const studentPassCartBanner = document.getElementById('studentPassCartBanner');

    // Free shipping threshold calculation ($65)
    const remaining = APP_STATE.freeShippingThreshold - subtotal;
    if (subtotal === 0) {
        if (shippingProgressText) shippingProgressText.innerHTML = `<span>Free Campus Delivery at $${APP_STATE.freeShippingThreshold.toFixed(2)}</span><span>$0.00</span>`;
        if (shippingProgressBar) shippingProgressBar.style.width = '0%';
    } else if (remaining <= 0) {
        if (shippingProgressText) shippingProgressText.innerHTML = `<span><strong>✓ FREE EXPRESS CAMPUS SHIPPING UNLOCKED</strong></span><span style="color: var(--color-amber-gold); font-weight: 700;">100%</span>`;
        if (shippingProgressBar) shippingProgressBar.style.width = '100%';
    } else {
        const pct = Math.min(100, Math.round((subtotal / APP_STATE.freeShippingThreshold) * 100));
        if (shippingProgressText) shippingProgressText.innerHTML = `<span>Add <strong>$${remaining.toFixed(2)}</strong> for Free Express Delivery</span><span>${pct}%</span>`;
        if (shippingProgressBar) shippingProgressBar.style.width = `${pct}%`;
    }

    // Calculations
    let discountDeduction = 0;
    if (APP_STATE.appliedDiscount) {
        if (APP_STATE.appliedDiscount.type === 'percent') {
            discountDeduction = subtotal * (APP_STATE.appliedDiscount.value / 100);
        }
    }

    const isFreeShipping = remaining <= 0 || (APP_STATE.appliedDiscount && APP_STATE.appliedDiscount.code === 'FREESHIP');
    const finalShipping = subtotal === 0 ? 0 : (isFreeShipping ? 0 : APP_STATE.shippingFee);
    const finalTotal = Math.max(0, subtotal - discountDeduction + finalShipping);

    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    
    if (discountDeduction > 0) {
        if (cartDiscountRow) cartDiscountRow.style.display = 'flex';
        if (cartDiscountAmount) cartDiscountAmount.textContent = `-$${discountDeduction.toFixed(2)} (${APP_STATE.appliedDiscount.code})`;
    } else {
        if (cartDiscountRow) cartDiscountRow.style.display = 'none';
    }

    if (cartShippingEl) {
        cartShippingEl.textContent = finalShipping === 0 ? 'FREE' : `$${finalShipping.toFixed(2)}`;
        if (finalShipping === 0) cartShippingEl.style.color = 'var(--color-amber-gold)';
        else cartShippingEl.style.color = 'var(--text-secondary)';
    }

    if (cartTotalEl) cartTotalEl.textContent = `$${finalTotal.toFixed(2)}`;

    // Quick 1-Click Student Pass Banner State
    if (studentPassCartBanner) {
        if (APP_STATE.appliedDiscount && (APP_STATE.appliedDiscount.code === 'CAMPUS20' || APP_STATE.appliedDiscount.code === 'STUDENT20')) {
            studentPassCartBanner.style.background = 'rgba(211, 152, 45, 0.16)';
            studentPassCartBanner.style.borderColor = 'var(--color-amber-gold)';
            studentPassCartBanner.innerHTML = `
                <div class="pass-banner-left">
                    <span class="pass-banner-tag" style="color: var(--color-amber-gold);">✓ 20% STUDENT PASS ACTIVE</span>
                    <span class="pass-banner-text">Code <strong>${APP_STATE.appliedDiscount.code}</strong> applied</span>
                </div>
                <span class="pass-banner-action" onclick="event.stopPropagation(); removeCoupon();" style="background: rgba(255,255,255,0.1); color: #fff;">REMOVE</span>
            `;
        } else {
            studentPassCartBanner.style.background = '';
            studentPassCartBanner.style.borderColor = '';
            studentPassCartBanner.onclick = () => applyCoupon('CAMPUS20');
            studentPassCartBanner.innerHTML = `
                <div class="pass-banner-left">
                    <span class="pass-banner-tag">STUDENT PASS</span>
                    <span class="pass-banner-text">Tap to apply <strong>20% OFF</strong> code <strong>CAMPUS20</strong></span>
                </div>
                <span class="pass-banner-action">APPLY -20%</span>
            `;
        }
    }

    // Coupon tag badge
    if (appliedCouponContainer) {
        if (APP_STATE.appliedDiscount && APP_STATE.appliedDiscount.code !== 'CAMPUS20' && APP_STATE.appliedDiscount.code !== 'STUDENT20') {
            appliedCouponContainer.innerHTML = `
                <div class="applied-coupon-tag">
                    <span>${APP_STATE.appliedDiscount.code}: ${APP_STATE.appliedDiscount.desc}</span>
                    <button onclick="removeCoupon()" title="Remove coupon">✕</button>
                </div>
            `;
        } else {
            appliedCouponContainer.innerHTML = '';
        }
    }
}

// Discount Code Engine
function applyCoupon(codeOverride = null) {
    if (window.soundEngine) window.soundEngine.playClick();
    const input = document.getElementById('couponInput');
    const code = (codeOverride || (input ? input.value : '')).trim().toUpperCase();

    if (!code) return;

    if (code === 'CAMPUS20' || code === 'STUDENT20') {
        APP_STATE.appliedDiscount = {
            code: code,
            type: 'percent',
            value: 20,
            desc: '20% Student Pass Discount'
        };
        showToast('20% Student Pass discount applied');
    } else if (code === 'MIDNIGHT') {
        APP_STATE.appliedDiscount = {
            code: code,
            type: 'percent',
            value: 15,
            desc: '15% Midnight Flash Discount'
        };
        showToast('15% Midnight Flash discount applied');
    } else if (code === 'FREESHIP') {
        APP_STATE.appliedDiscount = {
            code: code,
            type: 'free_shipping',
            value: 0,
            desc: 'Free Express Shipping'
        };
        showToast('Free Express Campus Delivery unlocked');
    } else {
        showToast('Invalid code. Try "CAMPUS20" for 20% off.');
        return;
    }

    localStorage.setItem('campus_discount', JSON.stringify(APP_STATE.appliedDiscount));
    if (input) input.value = '';
    updateCartUI();
}

function removeCoupon() {
    if (window.soundEngine) window.soundEngine.playClick();
    APP_STATE.appliedDiscount = null;
    localStorage.removeItem('campus_discount');
    showToast('Discount removed');
    updateCartUI();
}

// Drawer visibility
function openCartDrawer() {
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
function openQuickView(productId) {
    if (window.soundEngine) window.soundEngine.playClick();
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const container = document.getElementById('quickViewContent');
    if (!modal || !container) return;

    const currentSelectedSize = APP_STATE.selectedSizes[productId] || product.sizes[0];

    container.innerHTML = `
        <div class="quick-view-box">
            <div>
                <div class="qv-gallery-main">
                    <img id="qvMainImage" src="${product.images[0]}" alt="${product.title}" class="qv-main-img">
                </div>
                <div class="qv-thumbs-row">
                    ${product.images.map((img, i) => `
                        <img src="${img}" class="qv-thumb ${i === 0 ? 'active' : ''}" 
                            onclick="changeQvImage('${img}', this)" alt="Thumbnail ${i}">
                    `).join('')}
                </div>
            </div>
            <div style="display: flex; flex-direction: column;">
                <span class="product-badge ${product.badgeColor}" style="width: max-content; margin-bottom: 12px;">${product.badge}</span>
                <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 8px;">${product.title}</h2>
                <div style="display: flex; gap: 12px; align-items: baseline; margin-bottom: 14px;">
                    <span style="font-family: var(--font-mono); font-size: 1.3rem; font-weight: 700; color: var(--accent-volt);">$${product.price.toFixed(2)}</span>
                    <span style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--text-muted); text-decoration: line-through;">$${product.originalPrice.toFixed(2)}</span>
                    <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); background: rgba(0, 240, 255, 0.1); padding: 2px 8px; border-radius: 4px;">Student: $${product.studentPrice.toFixed(2)}</span>
                </div>

                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 18px;">
                    ${product.description}
                </p>

                <div style="background: var(--bg-surface); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 20px;">
                    <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-volt); margin-bottom: 6px;">
                        CAMPUS FIT ADVICE:
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">
                        ${product.campusFitTip}
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <div style="font-family: var(--font-subheading); font-size: 0.84rem; font-weight: 700; margin-bottom: 8px;">
                        SELECT SIZE:
                    </div>
                    <div class="card-size-selector" id="qvSizeSelector">
                        ${product.sizes.map(sz => `
                            <button class="card-size-btn ${sz === currentSelectedSize ? 'selected' : ''}" 
                                onclick="setQvSize('${product.id}', '${sz}')">
                                ${sz}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <div style="font-family: var(--font-subheading); font-size: 0.84rem; font-weight: 700; margin-bottom: 8px;">
                        KEY SPECIFICATIONS:
                    </div>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.78rem; color: var(--text-secondary);">
                        ${product.features.map(f => `<li>✓ ${f}</li>`).join('')}
                    </ul>
                </div>

                <button class="btn-primary" style="width: 100%;" onclick="addToCart('${product.id}', APP_STATE.selectedSizes['${product.id}']); closeQuickView();">
                    ADD TO BAG — $${product.price.toFixed(2)}
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function changeQvImage(src, thumbEl) {
    const mainImg = document.getElementById('qvMainImage');
    if (mainImg) mainImg.src = src;
    document.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
}

function setQvSize(productId, size) {
    if (window.soundEngine) window.soundEngine.playClick();
    APP_STATE.selectedSizes[productId] = size;
    const container = document.getElementById('qvSizeSelector');
    if (container) {
        container.querySelectorAll('.card-size-btn').forEach(b => {
            b.classList.toggle('selected', b.textContent.trim() === size);
        });
    }
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================================================
// STUDENT PASS / COLLEGE ID MODAL
// ==========================================================================
function initUniversityDropdown() {
    const select = document.getElementById('studentUniSelect');
    if (!select) return;

    select.innerHTML = UNIVERSITIES.map(u => `<option value="${u}">${u}</option>`).join('') +
        `<option value="Other University">Other (Global / Regional Campus)</option>`;
}

function openStudentPassModal() {
    if (window.soundEngine) window.soundEngine.playClick();
    const modal = document.getElementById('studentPassModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeStudentPassModal() {
    const modal = document.getElementById('studentPassModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function verifyStudentStatus(e) {
    if (e) e.preventDefault();
    const nameInput = document.getElementById('studentNameInput');
    const emailInput = document.getElementById('studentEmailInput');
    const uniSelect = document.getElementById('studentUniSelect');

    const name = nameInput ? nameInput.value.trim() : 'Alex Mercer';
    const email = emailInput ? emailInput.value.trim() : 'alex@nyu.edu';
    const uni = uniSelect ? uniSelect.value : 'New York University';

    // Update Digital ID card graphic on the page
    const cardName = document.getElementById('idCardName');
    const cardUni = document.getElementById('idCardUni');
    if (cardName) cardName.textContent = name || 'Student Member';
    if (cardUni) cardUni.textContent = uni;

    // Apply 20% discount coupon automatically
    applyCoupon('CAMPUS20');

    if (window.soundEngine) window.soundEngine.playSuccess();
    triggerConfetti();

    closeStudentPassModal();
    showToast(`Student Pass Activated for ${name}: 20% OFF Applied`);
}

// ==========================================================================
// INTERACTIVE FIT ADVISOR
// ==========================================================================
function initFitAdvisor() {
    const heightSlider = document.getElementById('advisorHeight');
    const weightSlider = document.getElementById('advisorWeight');
    const heightDisplay = document.getElementById('heightDisplay');
    const weightDisplay = document.getElementById('weightDisplay');

    function updateRecommendation() {
        const h = parseInt(heightSlider.value, 10); // in cm
        const w = parseInt(weightSlider.value, 10); // in kg
        const pref = document.querySelector('.fit-chip.active')?.dataset.fit || 'boxy';

        // Feet & inches formatting
        const totalInches = Math.round(h / 2.54);
        const feet = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        if (heightDisplay) heightDisplay.textContent = `${h} cm (${feet}'${inches}")`;
        if (weightDisplay) weightDisplay.textContent = `${w} kg (${Math.round(w * 2.204)} lbs)`;

        // Recommendation logic
        let size = 'M';
        if (h < 168 && w < 62) size = 'S';
        else if (h >= 168 && h < 178 && w < 74) size = 'M';
        else if (h >= 178 && h < 188 && w < 88) size = 'L';
        else if (h >= 188 || w >= 88) size = 'XL';

        // Fit preference shifts
        if (pref === 'slim' && size !== 'S') {
            if (size === 'XL') size = 'L';
            else if (size === 'L') size = 'M';
            else if (size === 'M') size = 'S';
        } else if (pref === 'extreme_baggy') {
            if (size === 'S') size = 'M';
            else if (size === 'M') size = 'L';
            else if (size === 'L') size = 'XL';
            else if (size === 'XL') size = 'XXL';
        }

        const sizeDisplay = document.getElementById('recommendedSizeDisplay');
        const descDisplay = document.getElementById('recommendedSizeDesc');
        if (sizeDisplay) sizeDisplay.textContent = size;
        if (descDisplay) {
            descDisplay.textContent = `For ${feet}'${inches}" / ${w}kg with our ${pref === 'boxy' ? 'signature boxy drop-shoulder' : pref} drape, Size ${size} delivers the perfect silhouette without bunching.`;
        }
    }

    if (heightSlider && weightSlider) {
        heightSlider.addEventListener('input', updateRecommendation);
        weightSlider.addEventListener('input', updateRecommendation);
    }

    document.querySelectorAll('.fit-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            if (window.soundEngine) window.soundEngine.playClick();
            document.querySelectorAll('.fit-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            updateRecommendation();
        });
    });

    updateRecommendation();
}

// ==========================================================================
// CAMPUS UGC LOOKBOOK ("SPOTTED ON CAMPUS")
// ==========================================================================
function renderCampusLookbook() {
    const container = document.getElementById('ugcGrid');
    if (!container) return;

    container.innerHTML = CAMPUS_LOOKBOOK.map(item => `
        <div class="ugc-card">
            <div class="ugc-media">
                <img src="${item.image}" alt="${item.student}" class="ugc-img" loading="lazy">
                <button class="ugc-shop-tag" onclick="openQuickView('${item.taggedItem}')">
                    <span>SHOP FIT</span>
                </button>
            </div>
            <div class="ugc-body">
                <div class="ugc-author-row">
                    <img src="${item.avatar}" alt="${item.student}" class="ugc-avatar">
                    <div>
                        <div class="ugc-student-name">${item.student}</div>
                        <div class="ugc-college">${item.college}</div>
                    </div>
                </div>
                <p class="ugc-caption">"${item.caption}"</p>
                <div class="ugc-footer">
                    <button class="like-btn" onclick="toggleUgcLike(this, ${item.likes})" aria-label="Like campus fit">
                        <svg class="heart-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span class="like-count">${item.likes}</span>
                    </button>
                    <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-volt);">VERIFIED CAMPUS FIT</span>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleUgcLike(btn, initialCount) {
    if (window.soundEngine) window.soundEngine.playClick();
    const isLiked = btn.classList.contains('liked');
    const countSpan = btn.querySelector('.like-count');

    if (isLiked) {
        btn.classList.remove('liked');
        if (countSpan) countSpan.textContent = initialCount;
    } else {
        btn.classList.add('liked');
        if (countSpan) countSpan.textContent = initialCount + 1;
    }
}

// ==========================================================================
// SEAMLESS 2-STEP CART DRAWER CHECKOUT & RECEIPT ENGINE
// ==========================================================================
function openCartCheckoutStep() {
    if (APP_STATE.cart.length === 0) {
        showToast('Your bag is empty! Add items first.');
        return;
    }
    if (window.soundEngine) window.soundEngine.playClick();
    
    const itemsView = document.getElementById('cartItemsView');
    const checkoutView = document.getElementById('cartCheckoutView');
    const receiptView = document.getElementById('cartReceiptView');
    
    if (itemsView) itemsView.style.display = 'none';
    if (receiptView) receiptView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'flex';

    // Populate mini recap
    const recapEl = document.getElementById('checkoutMiniRecap');
    const cartTotalEl = document.getElementById('cartTotal');
    const drawerTotalEl = document.getElementById('checkoutDrawerTotalDisplay');
    
    if (recapEl) {
        recapEl.innerHTML = `
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-amber-gold); font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">
                ORDER SUMMARY (${APP_STATE.cart.reduce((sum, item) => sum + item.qty, 0)} ITEMS)
            </div>
            ${APP_STATE.cart.map(item => `
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; padding: 4px 0; border-bottom: 1px dashed rgba(255,255,255,0.06);">
                    <span style="color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 250px;">${item.qty}× ${item.title} <span style="color: var(--color-rust-accent); font-size: 0.7rem;">(${item.size})</span></span>
                    <span style="font-family: var(--font-mono); color: var(--color-amber-gold); font-weight: 700;">$${(item.price * item.qty).toFixed(2)}</span>
                </div>
            `).join('')}
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; margin-top: 4px;">
                <span style="font-size: 0.76rem; color: var(--text-secondary);">Guaranteed Delivery:</span>
                <span style="font-family: var(--font-mono); font-size: 0.74rem; color: #fff;">2–3 Days Direct to Campus</span>
            </div>
        `;
    }

    if (drawerTotalEl && cartTotalEl) {
        drawerTotalEl.textContent = cartTotalEl.textContent;
    }

    // Scroll checkout view to top
    const scrollBody = document.querySelector('.checkout-scroll-body');
    if (scrollBody) scrollBody.scrollTop = 0;
}

function backToCartItems() {
    if (window.soundEngine) window.soundEngine.playClick();
    const itemsView = document.getElementById('cartItemsView');
    const checkoutView = document.getElementById('cartCheckoutView');
    const receiptView = document.getElementById('cartReceiptView');
    
    if (checkoutView) checkoutView.style.display = 'none';
    if (receiptView) receiptView.style.display = 'none';
    if (itemsView) itemsView.style.display = 'flex';
}

function completeDrawerOrder(e) {
    if (e) e.preventDefault();
    if (APP_STATE.cart.length === 0) return;

    if (window.soundEngine) window.soundEngine.playSuccess();
    triggerConfetti();

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const dormHall = document.getElementById('checkoutDorm')?.value || 'Campus Quad Hall, Suite 412';
    const recipient = document.getElementById('checkoutName')?.value || 'Student Resident';
    const phone = document.getElementById('checkoutPhone')?.value || '(555) 349-2810';
    const finalTotal = document.getElementById('checkoutDrawerTotalDisplay')?.textContent || document.getElementById('cartTotal')?.textContent || '$0.00';
    
    const itemsView = document.getElementById('cartItemsView');
    const checkoutView = document.getElementById('cartCheckoutView');
    const receiptView = document.getElementById('cartReceiptView');
    const receiptBody = document.getElementById('cartReceiptBody');

    const purchasedItems = [...APP_STATE.cart];

    if (receiptBody) {
        receiptBody.innerHTML = `
            <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(211, 152, 45, 0.16); border: 1px solid var(--color-amber-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-amber-gold); letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700;">ORDER DISPATCHED</span>
            <h3 style="font-family: var(--font-heading); font-size: 1.45rem; color: #fff; margin: 4px 0 10px;">THANK YOU, ${recipient.toUpperCase()}</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.4;">
                Your collegiate streetwear archive order has been confirmed. A dorm delivery PIN was dispatched via SMS to <strong>${phone}</strong>.
            </p>

            <div class="receipt-ticket-card">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px;">
                    <div>
                        <span style="font-family: var(--font-mono); font-size: 0.6rem; color: var(--text-muted); display: block;">OFFICIAL RECEIPT ID</span>
                        <strong style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--color-amber-gold);">${orderId}</strong>
                    </div>
                    <span style="background: rgba(211, 152, 45, 0.15); color: var(--color-amber-gold); border: 1px solid rgba(211,152,45,0.4); font-family: var(--font-mono); font-size: 0.65rem; padding: 3px 8px; border-radius: 4px; font-weight: 700;">PAID & VERIFIED</span>
                </div>

                <div style="font-size: 0.78rem; margin-bottom: 5px; color: var(--text-secondary);"><span style="color: #fff; font-weight: 600;">Delivery To:</span> ${dormHall} (Campus Mailroom)</div>
                <div style="font-size: 0.78rem; margin-bottom: 5px; color: var(--text-secondary);"><span style="color: #fff; font-weight: 600;">Carrier:</span> Campus Dorm Courier Express</div>
                <div style="font-size: 0.78rem; margin-bottom: 5px; color: var(--text-secondary);"><span style="color: #fff; font-weight: 600;">Estimated Arrival:</span> 48 Hours Guaranteed</div>
                <div style="font-size: 0.78rem; margin-bottom: 10px; color: var(--text-secondary);"><span style="color: #fff; font-weight: 600;">Fabric Quality:</span> 200+ GSM Pre-Shrunk 100% Cotton</div>

                <div style="background: #090a0d; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 10px 12px; margin-bottom: 12px;">
                    <div style="font-family: var(--font-mono); font-size: 0.62rem; color: var(--text-muted); margin-bottom: 6px; letter-spacing: 0.06em;">ARCHIVED ITEMS (${purchasedItems.reduce((sum, item) => sum + item.qty, 0)}):</div>
                    ${purchasedItems.map(i => `
                        <div style="display: flex; justify-content: space-between; font-size: 0.76rem; margin-bottom: 4px; color: #fff;">
                            <span>${i.qty}× ${i.title} (${i.size})</span>
                            <span style="font-family: var(--font-mono); color: var(--color-amber-gold);">$${(i.price * i.qty).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: baseline; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <span style="font-family: var(--font-subheading); font-size: 0.92rem; font-weight: 700; color: #fff;">TOTAL CHARGED</span>
                    <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: var(--color-amber-gold);">${finalTotal}</span>
                </div>
            </div>

            <div style="display: flex; gap: 10px; width: 100%; margin-top: 8px;">
                <button class="coupon-apply-btn" onclick="window.print()" style="flex: 1; height: 42px; font-size: 0.78rem; border-radius: 6px;">
                    PRINT RECEIPT
                </button>
                <button class="checkout-btn" onclick="resetCartAfterOrder()" style="flex: 1.2; height: 42px; font-size: 0.82rem; border-radius: 6px;">
                    CONTINUE BROWSING
                </button>
            </div>
        `;
    }

    if (itemsView) itemsView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';
    if (receiptView) receiptView.style.display = 'flex';

    // Clear cart state
    APP_STATE.cart = [];
    saveCart();
    updateCartUI();
    showToast(`Order ${orderId} placed! Tracking details active.`);
}

function resetCartAfterOrder() {
    closeCartDrawer();
    setTimeout(() => {
        const itemsView = document.getElementById('cartItemsView');
        const checkoutView = document.getElementById('cartCheckoutView');
        const receiptView = document.getElementById('cartReceiptView');
        if (checkoutView) checkoutView.style.display = 'none';
        if (receiptView) receiptView.style.display = 'none';
        if (itemsView) itemsView.style.display = 'flex';
    }, 350);
}

// Payment method radio selection handler
document.addEventListener('change', (e) => {
    if (e.target && e.target.name === 'drawerPaymentMethod') {
        document.querySelectorAll('.payment-option-card').forEach(c => c.classList.remove('active'));
        e.target.closest('.payment-option-card')?.classList.add('active');
    }
});

// Backward-compatible trigger for legacy modal calls
function openCheckoutModal() {
    openCartDrawer();
    openCartCheckoutStep();
}

function closeCheckoutModal() {
    backToCartItems();
    closeCartDrawer();
}

function completeSimulatedOrder(e) {
    completeDrawerOrder(e);
}

function closeOrderConfirmedModal() {
    const modal = document.getElementById('orderConfirmedModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Confetti Particle Canvas Burst
function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block';

    const particles = [];
    const colors = ['#d4ff00', '#00f0ff', '#ffffff', '#9d4edd', '#ff5964'];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 0.7) * 20,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.4; // gravity
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.012;

            if (p.opacity > 0) {
                alive = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        });

        frame++;
        if (alive && frame < 150) {
            requestAnimationFrame(animate);
        } else {
            canvas.style.display = 'none';
        }
    }

    animate();
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 350);
    }, 3200);
}

// ==========================================================================
// LO-FI AMBIENT AUDIO TOGGLE
// ==========================================================================
function toggleLofiAudio() {
    if (!window.soundEngine) return;
    const isPlaying = window.soundEngine.toggleLofi();
    const dock = document.getElementById('floatingAudioDock');
    const label = document.getElementById('audioStatusLabel');

    if (dock) {
        dock.classList.toggle('playing', isPlaying);
    }
    if (label) {
        label.textContent = isPlaying ? 'LO-FI RADIO [ON]' : 'CAMPUS RADIO [OFF]';
    }

    showToast(isPlaying ? 'Campus Lo-Fi radio active' : 'Campus Lo-Fi radio paused');
}

// ==========================================================================
// EVENT LISTENERS SETUP
// ==========================================================================
function setupEventListeners() {
    // Backdrop clicks to close drawers and modals
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    const cartBackdrop = document.getElementById('cartDrawerBackdrop');
    if (cartBackdrop) {
        cartBackdrop.addEventListener('click', (e) => {
            if (e.target === cartBackdrop) closeCartDrawer();
        });
    }

    // Hero 3D Card mousemove tilt effect
    const heroCard = document.getElementById('heroShowcaseCard');
    if (heroCard) {
        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / (rect.height / 2)) * -8;
            const tiltY = (x / (rect.width / 2)) * 8;
            heroCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }
}

// ==========================================================================
// MOBILE DETECTION & TOUCH OPTIMIZATION ENGINE
// ==========================================================================
function initMobileDetection() {
    const evaluateDevice = () => {
        const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isNarrow = window.innerWidth <= 768;
        const isLandscape = window.matchMedia("(orientation: landscape)").matches && (window.innerWidth <= 960);
        const isMobile = isMobileUA || (isTouch && isNarrow) || isNarrow;

        if (isMobile) {
            document.documentElement.classList.add('mobile-device');
            document.body.classList.add('mobile-device');
        } else {
            document.documentElement.classList.remove('mobile-device');
            document.body.classList.remove('mobile-device');
        }

        if (isLandscape && isMobile) {
            document.documentElement.classList.add('mobile-landscape');
            document.body.classList.add('mobile-landscape');
        } else {
            document.documentElement.classList.remove('mobile-landscape');
            document.body.classList.remove('mobile-landscape');
        }
    };

    evaluateDevice();
    window.addEventListener('resize', evaluateDevice);
    window.addEventListener('orientationchange', evaluateDevice);
}

// Mobile Slide-Out Navigation Drawer Controls
function toggleMobileNav() {
    const drawer = document.getElementById('mobileNavDrawer');
    if (!drawer) return;
    if (drawer.classList.contains('active')) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
}

function openMobileNav() {
    if (window.soundEngine) window.soundEngine.playClick();
    const drawer = document.getElementById('mobileNavDrawer');
    if (drawer) {
        drawer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileNav() {
    const drawer = document.getElementById('mobileNavDrawer');
    if (drawer) {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleMobileBackdropClick(e) {
    if (e.target.id === 'mobileNavDrawer') {
        closeMobileNav();
    }
}

function setActiveMobileTab(el) {
    if (window.soundEngine) window.soundEngine.playClick();
    document.querySelectorAll('.mobile-bottom-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
}
