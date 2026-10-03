/**
 * ==========================================================================
 * ATELIER COUTURE — BESPOKE DESIGN STUDIO & E-COMMERCE ENGINE
 * ==========================================================================
 */

class AtelierStudio {
    constructor() {
        // Core Studio State
        this.state = {
            silhouette: 'a-line',
            neckline: 'sweetheart',
            sleeves: 'sleeveless',
            fabric: 'silk',
            fabricPrice: 75,
            primaryColor: '#1b4d3e',
            primaryColorName: 'Emerald Royale',
            accentColor: '#d4af37',
            accentColorName: 'Metallic Gold',
            pattern: 'solid',
            hasSlit: false,
            hasBelt: true,
            height: 168,
            weight: 62,
            bust: 88,
            waist: 70,
            fitPreference: 'sculpted',
            view: 'front',
            lighting: 'day',
            zoomLevel: 1.0,
            currency: 'USD',
            currencyRate: 1.0,
            currencySymbol: '$',
            discountPercent: 0
        };

        // Saved Cart & Wishlist
        this.cart = JSON.parse(localStorage.getItem('atelier_cart') || '[]');
        this.wishlist = JSON.parse(localStorage.getItem('atelier_wishlist') || '[]');

        // Presets Library
        this.presets = {
            gala: {
                silhouette: 'a-line',
                neckline: 'sweetheart',
                sleeves: 'sleeveless',
                fabric: 'silk',
                fabricPrice: 75,
                primaryColor: '#1b4d3e',
                primaryColorName: 'Emerald Royale',
                accentColor: '#d4af37',
                accentColorName: 'Metallic Gold',
                pattern: 'solid',
                hasSlit: false,
                hasBelt: true,
                name: 'The Emerald Gala Gown'
            },
            riviera: {
                silhouette: 'maxi',
                neckline: 'v-neck',
                sleeves: 'sleeveless',
                fabric: 'chiffon',
                fabricPrice: 45,
                primaryColor: '#d67d8c',
                primaryColorName: 'Rose Quartz',
                accentColor: '#f5efe6',
                accentColorName: 'Pearl Cream',
                pattern: 'solid',
                hasSlit: true,
                hasBelt: false,
                name: 'The Riviera Silk Slip'
            },
            cocktail: {
                silhouette: 'bodycon',
                neckline: 'off-shoulder',
                sleeves: 'cap',
                fabric: 'velvet',
                fabricPrice: 60,
                primaryColor: '#671926',
                primaryColorName: 'Bordeaux Wine',
                accentColor: '#111116',
                accentColorName: 'Onyx Black',
                pattern: 'solid',
                hasSlit: false,
                hasBelt: false,
                name: 'The Bordeaux Belle'
            },
            bridal: {
                silhouette: 'ballgown',
                neckline: 'sweetheart',
                sleeves: 'puff',
                fabric: 'silk',
                fabricPrice: 75,
                primaryColor: '#f5efe6',
                primaryColorName: 'Pearl Alabaster',
                accentColor: '#d4af37',
                accentColorName: 'Metallic Gold',
                pattern: 'floral',
                hasSlit: false,
                hasBelt: true,
                name: 'The Pearl Ballgown'
            }
        };

        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateModelVisuals();
        this.calculateMetrics();
        this.calculatePrice();
        this.renderCartUI();
        this.updateBadges();
    }

    cacheDOM() {
        // SVG Elements
        this.dressSvg = document.getElementById('dressSvg');
        this.dressSkirt = document.getElementById('dressSkirt');
        this.dressBodice = document.getElementById('dressBodice');
        this.dressNeckline = document.getElementById('dressNeckline');
        this.dressSleeves = document.getElementById('dressSleeves');
        this.dressBelt = document.getElementById('dressBelt');
        this.dressShimmer = document.getElementById('dressShimmer');
        this.dressSlit = document.getElementById('dressSlit');
        this.dressSkirtPattern = document.getElementById('dressSkirtPattern');
        this.dressBodicePattern = document.getElementById('dressBodicePattern');

        // Studio Viewport
        this.studioViewport = document.getElementById('studioViewport');
        this.viewFrontBtn = document.getElementById('viewFrontBtn');
        this.viewBackBtn = document.getElementById('viewBackBtn');
        this.lightingBtn = document.getElementById('lightingBtn');
        this.lightingLabel = document.getElementById('lightingLabel');
        this.zoomInBtn = document.getElementById('zoomInBtn');
        this.zoomOutBtn = document.getElementById('zoomOutBtn');
        this.saveMoodboardBtn = document.getElementById('saveMoodboardBtn');
        this.downloadSpecBtn = document.getElementById('downloadSpecBtn');

        // Dynamic Metric Labels
        this.metricSize = document.getElementById('metricSize');
        this.metricShape = document.getElementById('metricShape');
        this.metricHours = document.getElementById('metricHours');
        this.studioPrice = document.getElementById('studioPrice');
        this.studioCurrencySymbol = document.getElementById('studioCurrencySymbol');

        // Studio Tabs
        this.tabButtons = document.querySelectorAll('.studio-tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');

        // Tab 1 Controls
        this.silhouetteButtons = document.querySelectorAll('[data-silhouette]');
        this.necklineButtons = document.querySelectorAll('[data-neckline]');
        this.sleeveButtons = document.querySelectorAll('[data-sleeves]');
        this.toggleSlitBtn = document.getElementById('toggleSlitBtn');
        this.toggleBeltBtn = document.getElementById('toggleBeltBtn');
        this.valSilhouette = document.getElementById('valSilhouette');
        this.valNeckline = document.getElementById('valNeckline');
        this.valSleeves = document.getElementById('valSleeves');

        // Tab 2 Controls
        this.fabricButtons = document.querySelectorAll('[data-fabric]');
        this.colorSwatches = document.querySelectorAll('[data-color]');
        this.accentSwatches = document.querySelectorAll('[data-accent]');
        this.patternButtons = document.querySelectorAll('[data-pattern]');
        this.valFabric = document.getElementById('valFabric');
        this.valColorName = document.getElementById('valColorName');
        this.valAccentName = document.getElementById('valAccentName');

        // Tab 3 Controls
        this.sliderHeight = document.getElementById('sliderHeight');
        this.sliderWeight = document.getElementById('sliderWeight');
        this.sliderBust = document.getElementById('sliderBust');
        this.sliderWaist = document.getElementById('sliderWaist');
        this.valHeight = document.getElementById('valHeight');
        this.valWeight = document.getElementById('valWeight');
        this.valBust = document.getElementById('valBust');
        this.valWaist = document.getElementById('valWaist');
        this.fitButtons = document.querySelectorAll('[data-fit]');

        // Add to Bag & Order
        this.addToBagBtn = document.getElementById('addToBagBtn');

        // Cart Drawer
        this.cartBtn = document.getElementById('cartBtn');
        this.cartDrawer = document.getElementById('cartDrawer');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.closeCartBtn = document.getElementById('closeCartBtn');
        this.cartItemsList = document.getElementById('cartItemsList');
        this.cartCount = document.getElementById('cartCount');
        this.cartDrawerCount = document.getElementById('cartDrawerCount');
        this.cartSubtotal = document.getElementById('cartSubtotal');
        this.cartDiscount = document.getElementById('cartDiscount');
        this.discountRow = document.getElementById('discountRow');
        this.cartTotal = document.getElementById('cartTotal');
        this.couponCodeInput = document.getElementById('couponCodeInput');
        this.applyCouponBtn = document.getElementById('applyCouponBtn');
        this.proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');

        // Checkout Modal
        this.checkoutModalOverlay = document.getElementById('checkoutModalOverlay');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        this.checkoutForm = document.getElementById('checkoutForm');
        this.modalBody = document.getElementById('modalBody');
        this.modalStepTitle = document.getElementById('modalStepTitle');

        // Currency
        this.currencySelect = document.getElementById('currencySelect');
        this.wishlistCount = document.getElementById('wishlistCount');

        // Navbar & Mobile
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.querySelector('.nav-links');

        // Preset Triggers
        this.presetButtons = document.querySelectorAll('[data-preset]');
    }

    bindEvents() {
        // Tab Switching
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.tabButtons.forEach(b => b.classList.remove('active'));
                this.tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-tab');
                document.getElementById(targetId)?.classList.add('active');
            });
        });

        // Silhouette Selection
        this.silhouetteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.silhouetteButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.silhouette = btn.getAttribute('data-silhouette');
                this.valSilhouette.textContent = btn.querySelector('span').textContent;
                this.updateModelVisuals();
                this.calculatePrice();
                this.calculateMetrics();
            });
        });

        // Neckline Selection
        this.necklineButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.necklineButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.neckline = btn.getAttribute('data-neckline');
                this.valNeckline.textContent = btn.querySelector('span').textContent;
                this.updateModelVisuals();
            });
        });

        // Sleeves Selection
        this.sleeveButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sleeveButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.sleeves = btn.getAttribute('data-sleeves');
                this.valSleeves.textContent = btn.querySelector('span').textContent;
                this.updateModelVisuals();
                this.calculatePrice();
            });
        });

        // Slit Toggle
        this.toggleSlitBtn.addEventListener('click', () => {
            this.state.hasSlit = !this.state.hasSlit;
            this.toggleSlitBtn.classList.toggle('active', this.state.hasSlit);
            this.updateModelVisuals();
            this.calculatePrice();
        });

        // Belt Toggle
        this.toggleBeltBtn.addEventListener('click', () => {
            this.state.hasBelt = !this.state.hasBelt;
            this.toggleBeltBtn.classList.toggle('active', this.state.hasBelt);
            this.updateModelVisuals();
            this.calculatePrice();
        });

        // Fabric Selection
        this.fabricButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.fabricButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.fabric = btn.getAttribute('data-fabric');
                this.state.fabricPrice = parseInt(btn.getAttribute('data-price'), 10) || 50;
                this.valFabric.textContent = btn.querySelector('h5').textContent;
                this.updateModelVisuals();
                this.calculatePrice();
            });
        });

        // Primary Color Swatches
        this.colorSwatches.forEach(btn => {
            btn.addEventListener('click', () => {
                this.colorSwatches.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.primaryColor = btn.getAttribute('data-color');
                this.state.primaryColorName = btn.getAttribute('data-name');
                this.valColorName.textContent = this.state.primaryColorName;
                this.updateModelVisuals();
            });
        });

        // Accent Color Swatches
        this.accentSwatches.forEach(btn => {
            btn.addEventListener('click', () => {
                this.accentSwatches.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.accentColor = btn.getAttribute('data-accent');
                this.state.accentColorName = btn.getAttribute('data-accent-name');
                this.valAccentName.textContent = this.state.accentColorName;
                this.updateModelVisuals();
            });
        });

        // Pattern Selection
        this.patternButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.patternButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.pattern = btn.getAttribute('data-pattern');
                this.updateModelVisuals();
                this.calculatePrice();
            });
        });

        // Sliders
        this.sliderHeight.addEventListener('input', (e) => {
            this.state.height = parseInt(e.target.value, 10);
            const feet = Math.floor(this.state.height / 30.48);
            const inches = Math.round((this.state.height % 30.48) / 2.54);
            this.valHeight.textContent = `${this.state.height} cm (${feet}'${inches}")`;
            this.calculateMetrics();
            this.updateModelVisuals();
        });

        this.sliderWeight.addEventListener('input', (e) => {
            this.state.weight = parseInt(e.target.value, 10);
            const lbs = Math.round(this.state.weight * 2.20462);
            this.valWeight.textContent = `${this.state.weight} kg (${lbs} lbs)`;
            this.calculateMetrics();
            this.updateModelVisuals();
        });

        this.sliderBust.addEventListener('input', (e) => {
            this.state.bust = parseInt(e.target.value, 10);
            this.valBust.textContent = `${this.state.bust} cm`;
            this.calculateMetrics();
        });

        this.sliderWaist.addEventListener('input', (e) => {
            this.state.waist = parseInt(e.target.value, 10);
            this.valWaist.textContent = `${this.state.waist} cm`;
            this.calculateMetrics();
        });

        // Fit Preference Buttons
        this.fitButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.fitButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.fitPreference = btn.getAttribute('data-fit');
                this.calculateMetrics();
            });
        });

        // View Front/Back Toggle
        this.viewFrontBtn.addEventListener('click', () => {
            this.state.view = 'front';
            this.viewFrontBtn.classList.add('active');
            this.viewBackBtn.classList.remove('active');
            this.updateModelVisuals();
        });

        this.viewBackBtn.addEventListener('click', () => {
            this.state.view = 'back';
            this.viewBackBtn.classList.add('active');
            this.viewFrontBtn.classList.remove('active');
            this.updateModelVisuals();
        });

        // Lighting Toggle (Day/Evening)
        this.lightingBtn.addEventListener('click', () => {
            this.state.lighting = this.state.lighting === 'day' ? 'evening' : 'day';
            this.lightingLabel.textContent = this.state.lighting === 'day' ? 'Studio Sun' : 'Evening Gala';
            const icon = this.lightingBtn.querySelector('i');
            if (this.state.lighting === 'evening') {
                icon.className = 'fas fa-moon';
                this.studioViewport.style.background = 'radial-gradient(circle at 50% 30%, #151522 0%, #08080c 100%)';
                this.dressShimmer.setAttribute('opacity', '0.65');
            } else {
                icon.className = 'fas fa-sun';
                this.studioViewport.style.background = 'radial-gradient(circle at 50% 40%, #1e1e28 0%, #111116 100%)';
                this.dressShimmer.setAttribute('opacity', '0.45');
            }
        });

        // Zoom Controls
        this.zoomInBtn.addEventListener('click', () => {
            if (this.state.zoomLevel < 1.35) {
                this.state.zoomLevel += 0.15;
                this.dressSvg.style.transform = `scale(${this.state.zoomLevel})`;
            }
        });

        this.zoomOutBtn.addEventListener('click', () => {
            this.state.zoomLevel = 1.0;
            this.dressSvg.style.transform = `scale(1)`;
        });

        // Save to Moodboard / Wishlist
        this.saveMoodboardBtn.addEventListener('click', () => {
            this.addToWishlist();
        });

        // Download Lookbook Spec Card
        this.downloadSpecBtn.addEventListener('click', () => {
            this.downloadDesignSummary();
        });

        // Presets Clicking
        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const presetKey = btn.getAttribute('data-preset');
                this.loadPreset(presetKey);
            });
        });

        // Currency Change
        this.currencySelect.addEventListener('change', (e) => {
            this.setCurrency(e.target.value);
        });

        // Add to Bag
        this.addToBagBtn.addEventListener('click', () => {
            this.addToCart();
        });

        // Cart Drawer Toggles
        this.cartBtn.addEventListener('click', () => this.openCart());
        this.closeCartBtn.addEventListener('click', () => this.closeCart());
        this.cartOverlay.addEventListener('click', () => this.closeCart());

        // Coupon Apply
        this.applyCouponBtn.addEventListener('click', () => {
            const code = this.couponCodeInput.value.trim().toUpperCase();
            if (code === 'ATELIER15') {
                this.state.discountPercent = 15;
                this.renderCartUI();
                alert('✨ 15% Atelier VIP Club discount applied to your order!');
            } else {
                alert('Invalid code. Please try code: ATELIER15');
            }
        });

        // Proceed to Checkout
        this.proceedCheckoutBtn.addEventListener('click', () => {
            if (this.cart.length === 0) {
                alert('Your atelier bag is currently empty. Design a bespoke dress to continue.');
                return;
            }
            this.closeCart();
            this.openCheckoutModal();
        });

        // Close Checkout Modal
        this.closeModalBtn.addEventListener('click', () => this.closeCheckoutModal());
        this.checkoutModalOverlay.addEventListener('click', (e) => {
            if (e.target === this.checkoutModalOverlay) this.closeCheckoutModal();
        });

        // Submit Checkout Form
        this.checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleOrderComplete();
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.closest('.faq-item');
                const isOpen = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!isOpen) item.classList.add('active');
            });
        });

        // Navbar Scroll Styling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        this.mobileMenuBtn.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            this.mobileMenuBtn.classList.toggle('active');
            if (this.navLinks.classList.contains('active')) {
                this.navLinks.style.display = 'flex';
                this.navLinks.style.flexDirection = 'column';
                this.navLinks.style.position = 'absolute';
                this.navLinks.style.top = '80px';
                this.navLinks.style.left = '0';
                this.navLinks.style.width = '100%';
                this.navLinks.style.background = '#111116';
                this.navLinks.style.padding = '2rem';
                this.navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                this.navLinks.style.display = '';
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.navLinks.style.display = 'none';
                    this.navLinks.classList.remove('active');
                }
            });
        });
    }

    /**
     * Renders SVG Paths dynamically based on current configuration state
     */
    updateModelVisuals() {
        const { silhouette, neckline, sleeves, primaryColor, accentColor, pattern, hasSlit, hasBelt, view } = this.state;

        // Apply primary color
        this.dressSkirt.setAttribute('fill', primaryColor);
        this.dressBodice.setAttribute('fill', primaryColor);
        this.dressBelt.setAttribute('fill', accentColor);

        // Skirt Cut Geometries
        let skirtPath = '';
        if (silhouette === 'a-line') {
            skirtPath = 'M160 260 Q130 400 115 535 L285 535 Q270 400 240 260 Z';
        } else if (silhouette === 'bodycon') {
            skirtPath = 'M160 260 Q145 340 148 420 Q135 480 140 535 L260 535 Q265 480 252 420 Q255 340 240 260 Z';
        } else if (silhouette === 'maxi') {
            skirtPath = 'M160 260 Q120 400 100 560 L300 560 Q280 400 240 260 Z';
        } else if (silhouette === 'mini') {
            skirtPath = 'M160 260 Q140 330 135 390 L265 390 Q260 330 240 260 Z';
        } else if (silhouette === 'ballgown') {
            skirtPath = 'M160 260 Q80 420 70 545 L330 545 Q320 420 240 260 Z';
        }
        this.dressSkirt.setAttribute('d', skirtPath);
        this.dressSkirtPattern.setAttribute('d', skirtPath);

        // Neckline Geometries
        let neckCutPath = '';
        if (view === 'front') {
            if (neckline === 'sweetheart') {
                neckCutPath = 'M145 155 Q175 190 200 170 Q225 190 255 155 Z';
            } else if (neckline === 'v-neck') {
                neckCutPath = 'M145 155 L200 215 L255 155 Z';
            } else if (neckline === 'square') {
                neckCutPath = 'M155 155 L155 195 L245 195 L245 155 Z';
            } else if (neckline === 'off-shoulder') {
                neckCutPath = 'M130 170 Q200 185 270 170 Z';
            } else if (neckline === 'halter') {
                neckCutPath = 'M170 135 L145 200 L255 200 L230 135 Z';
            }
        } else {
            // Back View (Lower back cut)
            neckCutPath = 'M145 155 Q200 230 255 155 Z';
        }
        this.dressNeckline.setAttribute('d', neckCutPath);

        // Sleeves Geometry
        this.dressSleeves.innerHTML = '';
        if (sleeves === 'cap') {
            this.dressSleeves.innerHTML = `
                <path d="M145 155 C120 155 115 180 132 195 Z" fill="${primaryColor}" />
                <path d="M255 155 C280 155 285 180 268 195 Z" fill="${primaryColor}" />
            `;
        } else if (sleeves === 'puff') {
            this.dressSleeves.innerHTML = `
                <path d="M145 155 C100 160 105 210 138 215 Z" fill="${primaryColor}" opacity="0.85" />
                <path d="M255 155 C300 160 295 210 262 215 Z" fill="${primaryColor}" opacity="0.85" />
            `;
        } else if (sleeves === 'long') {
            this.dressSleeves.innerHTML = `
                <path d="M145 155 C125 160 110 250 115 360 L128 360 C130 270 145 200 150 190 Z" fill="${primaryColor}" />
                <path d="M255 155 C275 160 290 250 285 360 L272 360 C270 270 255 200 250 190 Z" fill="${primaryColor}" />
            `;
        }

        // Belt / Sash Visibility
        this.dressBelt.style.display = hasBelt ? 'block' : 'none';

        // High Thigh Slit
        if (hasSlit && silhouette !== 'mini') {
            this.dressSlit.setAttribute('d', 'M170 330 L160 530 L185 530 Z');
            this.dressSlit.setAttribute('opacity', '1');
        } else {
            this.dressSlit.setAttribute('opacity', '0');
        }

        // Pattern Overlays
        if (pattern === 'floral') {
            this.dressSkirtPattern.setAttribute('fill', 'url(#patternFloral)');
            this.dressBodicePattern.setAttribute('fill', 'url(#patternFloral)');
        } else if (pattern === 'polka') {
            this.dressSkirtPattern.setAttribute('fill', 'url(#patternPolka)');
            this.dressBodicePattern.setAttribute('fill', 'url(#patternPolka)');
        } else if (pattern === 'stripes') {
            this.dressSkirtPattern.setAttribute('fill', 'url(#patternStripes)');
            this.dressBodicePattern.setAttribute('fill', 'url(#patternStripes)');
        } else {
            this.dressSkirtPattern.setAttribute('fill', 'none');
            this.dressBodicePattern.setAttribute('fill', 'none');
        }
    }

    /**
     * Calculates BMI, body shape classification, and artisan work hours
     */
    calculateMetrics() {
        const { height, weight, bust, waist, fitPreference } = this.state;
        const heightMeters = height / 100;
        const bmi = weight / (heightMeters * heightMeters);

        // Size derivation
        let size = 'M (US 6-8)';
        if (bmi < 18.5) size = 'XS (US 0-2)';
        else if (bmi < 22) size = 'S (US 4-6)';
        else if (bmi < 26) size = 'M (US 6-8)';
        else if (bmi < 30) size = 'L (US 10-12)';
        else size = 'XL (US 14-16)';

        if (fitPreference === 'sculpted') size += ' • Snug';
        else if (fitPreference === 'relaxed') size += ' • Easy Drape';

        this.metricSize.textContent = size;

        // Shape derivation
        let shape = 'Classic Proportioned';
        const ratio = bust / waist;
        if (ratio >= 1.28) shape = 'Hourglass Contour';
        else if (height > 175) shape = 'Statuesque Form';
        else if (height < 158) shape = 'Petite Elegance';
        else shape = 'Graceful Column';

        this.metricShape.textContent = shape;

        // Artisan Stitching Time
        let hours = 24;
        if (this.state.silhouette === 'ballgown') hours += 10;
        if (this.state.fabric === 'silk' || this.state.fabric === 'velvet') hours += 4;
        if (this.state.sleeves === 'long' || this.state.sleeves === 'puff') hours += 3;
        if (this.state.hasBelt) hours += 1;
        this.metricHours.textContent = `${hours} hrs`;
    }

    /**
     * Calculates itemized pricing in current currency
     */
    calculatePrice() {
        let base = 180;
        if (this.state.silhouette === 'a-line') base = 210;
        else if (this.state.silhouette === 'bodycon') base = 225;
        else if (this.state.silhouette === 'maxi') base = 230;
        else if (this.state.silhouette === 'mini') base = 185;
        else if (this.state.silhouette === 'ballgown') base = 260;

        base += this.state.fabricPrice;

        if (this.state.sleeves === 'long' || this.state.sleeves === 'puff') base += 25;
        if (this.state.hasBelt) base += 20;
        if (this.state.hasSlit) base += 15;
        if (this.state.pattern !== 'solid') base += 20;

        const converted = Math.round(base * this.state.currencyRate);
        this.studioPrice.textContent = converted;
        this.studioCurrencySymbol.textContent = this.state.currencySymbol;
        return converted;
    }

    setCurrency(code) {
        this.state.currency = code;
        if (code === 'EUR') {
            this.state.currencyRate = 0.92;
            this.state.currencySymbol = '€';
        } else if (code === 'GBP') {
            this.state.currencyRate = 0.78;
            this.state.currencySymbol = '£';
        } else {
            this.state.currencyRate = 1.0;
            this.state.currencySymbol = '$';
        }
        this.calculatePrice();
        this.renderCartUI();
    }

    /**
     * Preloads curated lookbook presets into Studio
     */
    loadPreset(presetKey) {
        const preset = this.presets[presetKey];
        if (!preset) return;

        this.state.silhouette = preset.silhouette;
        this.state.neckline = preset.neckline;
        this.state.sleeves = preset.sleeves;
        this.state.fabric = preset.fabric;
        this.state.fabricPrice = preset.fabricPrice;
        this.state.primaryColor = preset.primaryColor;
        this.state.primaryColorName = preset.primaryColorName;
        this.state.accentColor = preset.accentColor;
        this.state.accentColorName = preset.accentColorName;
        this.state.pattern = preset.pattern;
        this.state.hasSlit = preset.hasSlit;
        this.state.hasBelt = preset.hasBelt;

        // Sync DOM controls
        this.silhouetteButtons.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-silhouette') === preset.silhouette);
        });
        this.necklineButtons.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-neckline') === preset.neckline);
        });
        this.sleeveButtons.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-sleeves') === preset.sleeves);
        });
        this.fabricButtons.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-fabric') === preset.fabric);
        });
        this.colorSwatches.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-color') === preset.primaryColor);
        });
        this.patternButtons.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-pattern') === preset.pattern);
        });

        this.toggleSlitBtn.classList.toggle('active', preset.hasSlit);
        this.toggleBeltBtn.classList.toggle('active', preset.hasBelt);

        const heroPresetName = document.getElementById('heroPresetName');
        if (heroPresetName) heroPresetName.textContent = preset.name;

        this.valSilhouette.textContent = preset.silhouette.toUpperCase();
        this.valNeckline.textContent = preset.neckline.toUpperCase();
        this.valSleeves.textContent = preset.sleeves.toUpperCase();
        this.valColorName.textContent = preset.primaryColorName;

        this.updateModelVisuals();
        this.calculatePrice();
        this.calculateMetrics();

        // Smooth scroll to studio
        document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Shopping Cart Operations
     */
    addToCart() {
        const item = {
            id: 'ATC-' + Date.now().toString().slice(-6),
            silhouette: this.state.silhouette,
            fabric: this.state.fabric,
            primaryColorName: this.state.primaryColorName,
            primaryColor: this.state.primaryColor,
            neckline: this.state.neckline,
            sleeves: this.state.sleeves,
            size: this.metricSize.textContent,
            height: this.state.height,
            weight: this.state.weight,
            price: this.calculatePrice(),
            currencySymbol: this.state.currencySymbol
        };

        this.cart.push(item);
        localStorage.setItem('atelier_cart', JSON.stringify(this.cart));
        this.updateBadges();
        this.renderCartUI();
        this.openCart();
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('atelier_cart', JSON.stringify(this.cart));
        this.updateBadges();
        this.renderCartUI();
    }

    renderCartUI() {
        this.cartDrawerCount.textContent = this.cart.length;
        this.cartCount.textContent = this.cart.length;

        if (this.cart.length === 0) {
            this.cartItemsList.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your bespoke bag is currently empty.</p>
                    <a href="#studio" class="btn-luxury-primary" style="margin-top: 1.5rem; display: inline-flex;" onclick="window.atelierApp.closeCart()">
                        Start Designing
                    </a>
                </div>
            `;
            this.cartSubtotal.textContent = `${this.state.currencySymbol}0`;
            this.cartTotal.textContent = `${this.state.currencySymbol}0`;
            this.discountRow.style.display = 'none';
            return;
        }

        let subtotal = 0;
        this.cartItemsList.innerHTML = this.cart.map((item, index) => {
            subtotal += item.price;
            return `
                <div class="cart-item-card">
                    <div class="cart-thumb">
                        <i class="fas fa-person-dress" style="font-size: 2.2rem; color: ${item.primaryColor};"></i>
                    </div>
                    <div class="cart-item-info">
                        <h4>Bespoke ${item.silhouette.toUpperCase()} Gown</h4>
                        <div class="cart-specs-list">
                            ${item.primaryColorName} • ${item.fabric.toUpperCase()}<br>
                            Size: ${item.size} (${item.height}cm / ${item.weight}kg)
                        </div>
                        <div class="cart-item-price">${item.currencySymbol || this.state.currencySymbol}${item.price}</div>
                    </div>
                    <button class="remove-item-btn" onclick="window.atelierApp.removeFromCart(${index})" title="Remove">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
        }).join('');

        this.cartSubtotal.textContent = `${this.state.currencySymbol}${subtotal}`;

        if (this.state.discountPercent > 0) {
            const discountAmt = Math.round(subtotal * (this.state.discountPercent / 100));
            this.cartDiscount.textContent = `-${this.state.currencySymbol}${discountAmt}`;
            this.discountRow.style.display = 'flex';
            this.cartTotal.textContent = `${this.state.currencySymbol}${subtotal - discountAmt}`;
        } else {
            this.discountRow.style.display = 'none';
            this.cartTotal.textContent = `${this.state.currencySymbol}${subtotal}`;
        }
    }

    openCart() {
        this.cartDrawer.classList.add('active');
        this.cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        this.cartDrawer.classList.remove('active');
        this.cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Wishlist Operations
     */
    addToWishlist() {
        const item = {
            id: Date.now(),
            silhouette: this.state.silhouette,
            color: this.state.primaryColorName,
            price: this.calculatePrice()
        };
        this.wishlist.push(item);
        localStorage.setItem('atelier_wishlist', JSON.stringify(this.wishlist));
        this.updateBadges();
        alert('✨ Design saved to your private Atelier Moodboard!');
    }

    updateBadges() {
        this.cartCount.textContent = this.cart.length;
        this.wishlistCount.textContent = this.wishlist.length;
    }

    /**
     * Checkout Modal Handling
     */
    openCheckoutModal() {
        this.checkoutModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCheckoutModal() {
        this.checkoutModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleOrderComplete() {
        const email = document.getElementById('custEmail').value;
        const name = document.getElementById('custFirstName').value;
        const trackingNum = 'ATC-' + Math.floor(100000 + Math.random() * 900000);

        this.modalStepTitle.textContent = 'Bespoke Order Confirmed';
        this.modalBody.innerHTML = `
            <div class="confirmation-content">
                <div class="confirmation-icon">✧</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--color-gold-light);">
                    Merci, ${name}!
                </h3>
                <p style="color: var(--color-cream-muted); font-size: 0.95rem; max-width: 420px;">
                    Your bespoke couture order <strong>#${trackingNum}</strong> is officially registered. Our Parisian master tailor will begin laser grading your measurements immediately.
                </p>
                <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-light); padding: 1.2rem; border-radius: 12px; width: 100%; text-align: left; font-size: 0.85rem; color: var(--color-cream-muted);">
                    <p><strong>Tracking Confirmation:</strong> Sent to ${email}</p>
                    <p><strong>Estimated Completion:</strong> 7-10 Business Days</p>
                    <p><strong>Delivery:</strong> DHL Express (White Glove Delivery with Archival Box)</p>
                </div>
                <button class="btn-luxury-primary" onclick="window.atelierApp.closeCheckoutModal()" style="margin-top: 1rem;">
                    Return to Atelier
                </button>
            </div>
        `;

        // Clear bag
        this.cart = [];
        localStorage.removeItem('atelier_cart');
        this.updateBadges();
        this.renderCartUI();
    }

    /**
     * Downloads/Prints a Design Specification Card
     */
    downloadDesignSummary() {
        const summary = `
========================================
       ATELIER COUTURE — SPECIFICATION
========================================
Silhouette:       ${this.state.silhouette.toUpperCase()}
Neckline:         ${this.state.neckline.toUpperCase()}
Sleeves:          ${this.state.sleeves.toUpperCase()}
Luxury Textile:   ${this.state.fabric.toUpperCase()} (${this.state.primaryColorName})
Belt / Accent:    ${this.state.hasBelt ? this.state.accentColorName : 'None'}
High Thigh Slit:  ${this.state.hasSlit ? 'Yes' : 'No'}
Weave Pattern:    ${this.state.pattern.toUpperCase()}
----------------------------------------
CLIENT MEASUREMENTS:
Height:           ${this.state.height} cm
Weight:           ${this.state.weight} kg
Bust:             ${this.state.bust} cm
Waist:            ${this.state.waist} cm
Recommended Size: ${this.metricSize.textContent}
Contour Profile:  ${this.metricShape.textContent}
Artisan Hours:    ${this.metricHours.textContent}
Estimated Total:  ${this.state.currencySymbol}${this.calculatePrice()}
========================================
        `;
        const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Atelier-Bespoke-Spec-${Date.now().toString().slice(-4)}.txt`;
        link.click();
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.atelierApp = new AtelierStudio();
});