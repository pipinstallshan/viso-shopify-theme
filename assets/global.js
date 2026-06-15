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
    this.initHeaderScroll();
    this.initHeroParallax();
    this.initLookbookCarousel();
    this.initCountUp();
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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  initHeaderScroll() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    const onScroll = () => {
      const scrolled = window.scrollY > 60;
      header.classList.toggle('is-scrolled', scrolled);
      header.classList.toggle('is-transparent', !scrolled && document.body.classList.contains('template-index'));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  initHeroParallax() {
    const hero = document.querySelector('[data-hero-parallax]');
    if (!hero) return;

    const media = hero.querySelector('[data-hero-media]');
    if (!media) return;

    window.addEventListener('scroll', () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0) {
        const offset = window.scrollY * 0.35;
        media.style.transform = `translateY(${offset}px) scale(1.05)`;
      }
    }, { passive: true });
  }

  initLookbookCarousel() {
    document.querySelectorAll('[data-lookbook]').forEach(carousel => {
      const track = carousel.querySelector('[data-lookbook-track]');
      const prev = carousel.querySelector('[data-lookbook-prev]');
      const next = carousel.querySelector('[data-lookbook-next]');
      if (!track) return;

      let position = 0;
      const slide = () => {
        const item = track.querySelector('[data-lookbook-item]');
        if (!item) return 0;
        return item.offsetWidth + 24;
      };

      next?.addEventListener('click', () => {
        const max = track.scrollWidth - carousel.offsetWidth;
        position = Math.min(position + slide(), max);
        track.style.transform = `translateX(-${position}px)`;
      });

      prev?.addEventListener('click', () => {
        position = Math.max(position - slide(), 0);
        track.style.transform = `translateX(-${position}px)`;
      });
    });
  }

  initCountUp() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;

      const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + (el.dataset.suffix || '');
        }, 20);
      }, { threshold: 0.5 });

      observer.observe(el);
    });
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

      form.querySelectorAll('.variant-picker__option input').forEach(option => {
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
            const container = form.closest('[data-product-info]');
            const priceEl = container?.querySelector('[data-product-price]');
            const addBtn = form.querySelector('[type="submit"]');
            const variantInput = form.querySelector('[name="id"]');

            if (variantInput) variantInput.value = match.id;
            if (priceEl) priceEl.innerHTML = this.formatPriceHTML(match);
            if (addBtn) {
              addBtn.disabled = !match.available;
              addBtn.textContent = match.available ? addBtn.dataset.addText : addBtn.dataset.soldOutText;
            }
          }
        });
      });
    });
  }

  formatPriceHTML(variant) {
    const price = (variant.price / 100).toLocaleString('en-PK');
    let html = `<span class="price price--large">Rs. ${price}</span>`;
    if (variant.compare_at_price > variant.price) {
      const compare = (variant.compare_at_price / 100).toLocaleString('en-PK');
      html += `<span class="price--compare">Rs. ${compare}</span>`;
    }
    return html;
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
