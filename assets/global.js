/* Viso — Global JavaScript */

class VisoTheme {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initAccordions();
    this.initMobileMenu();
    this.initCartDrawer();
    this.initSearchModal();
    this.initQuantitySelectors();
    this.initVariantPickers();
  }

  initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const wasOpen = item.classList.contains('is-open');
        item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  }

  initMobileMenu() {
    const toggle = document.querySelector('[data-mobile-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    const overlay = document.querySelector('[data-mobile-menu-overlay]');
    if (!toggle || !menu) return;

    const close = () => {
      menu.classList.remove('is-active');
      overlay?.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      menu.classList.add('is-active');
      overlay?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });

    overlay?.addEventListener('click', close);
    menu.querySelector('[data-mobile-menu-close]')?.addEventListener('click', close);
  }

  initCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer]');
    const overlay = document.querySelector('[data-cart-overlay]');
    if (!drawer) return;

    const open = () => {
      drawer.classList.add('is-active');
      overlay?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      drawer.classList.remove('is-active');
      overlay?.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-cart-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    });

    drawer.querySelector('[data-cart-close]')?.addEventListener('click', close);
    overlay?.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  initSearchModal() {
    const modal = document.querySelector('[data-search-modal]');
    const overlay = document.querySelector('[data-search-overlay]');
    if (!modal) return;

    const open = () => {
      modal.classList.add('is-active');
      overlay?.classList.add('is-active');
      modal.querySelector('input[type="search"]')?.focus();
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      modal.classList.remove('is-active');
      overlay?.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-search-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    });

    modal.querySelector('[data-search-close]')?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
  }

  initQuantitySelectors() {
    document.querySelectorAll('.quantity-selector').forEach(selector => {
      const input = selector.querySelector('input');
      const minus = selector.querySelector('[data-quantity-minus]');
      const plus = selector.querySelector('[data-quantity-plus]');
      if (!input) return;

      minus?.addEventListener('click', () => {
        const val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
        input.dispatchEvent(new Event('change'));
      });

      plus?.addEventListener('click', () => {
        const val = parseInt(input.value) || 1;
        input.value = val + 1;
        input.dispatchEvent(new Event('change'));
      });
    });
  }

  initVariantPickers() {
    document.querySelectorAll('[data-product-form]').forEach(form => {
      const variantData = form.querySelector('[data-variant-json]');
      if (!variantData) return;

      const variants = JSON.parse(variantData.textContent);
      const options = form.querySelectorAll('.variant-picker__option input');

      options.forEach(option => {
        option.addEventListener('change', () => {
          const selectedOptions = [];
          form.querySelectorAll('.variant-picker').forEach(picker => {
            const checked = picker.querySelector('input:checked');
            if (checked) selectedOptions.push(checked.value);
          });

          const match = variants.find(v =>
            v.options.every((opt, i) => opt === selectedOptions[i])
          );

          if (match) {
            const priceEl = form.closest('[data-product-info]')?.querySelector('[data-product-price]');
            const compareEl = form.closest('[data-product-info]')?.querySelector('[data-product-compare-price]');
            const addBtn = form.querySelector('[type="submit"]');
            const variantInput = form.querySelector('[name="id"]');

            if (variantInput) variantInput.value = match.id;
            if (priceEl) priceEl.textContent = this.formatMoney(match.price);
            if (compareEl) {
              if (match.compare_at_price > match.price) {
                compareEl.textContent = this.formatMoney(match.compare_at_price);
                compareEl.style.display = '';
              } else {
                compareEl.style.display = 'none';
              }
            }
            if (addBtn) {
              addBtn.disabled = !match.available;
              addBtn.textContent = match.available ? addBtn.dataset.addText : addBtn.dataset.soldOutText;
            }
          }
        });
      });
    });
  }

  formatMoney(cents) {
    return 'Rs. ' + (cents / 100).toLocaleString('en-PK');
  }
}

class ProductRecommendations extends HTMLElement {
  connectedCallback() {
    const url = this.dataset.url;
    if (!url) return;

    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const doc = document.createElement('div');
        doc.innerHTML = text;
        const recommendations = doc.querySelector('product-recommendations');
        if (recommendations?.innerHTML.trim().length) {
          this.innerHTML = recommendations.innerHTML;
          window.visoTheme?.initScrollAnimations();
        }
      })
      .catch(() => {});
  }
}

if (!customElements.get('product-recommendations')) {
  customElements.define('product-recommendations', ProductRecommendations);
}

document.addEventListener('DOMContentLoaded', () => {
  window.visoTheme = new VisoTheme();
});
