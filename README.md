# Viso — Premium Shopify Theme

A fully custom luxury eyewear theme for the Viso sunglasses store, designed for Pakistan's elite market.

## Theme Features

- **Rich opulent design** — Black, deep emerald, and muted gold palette
- **Online Store 2.0** — JSON templates with customizable sections
- **Responsive** — Mobile-first luxury experience
- **Cart drawer** — Slide-out cart with overlay
- **Product gallery** — Thumbnail navigation with sticky layout
- **Scroll animations** — Subtle reveal effects
- **Trust signals** — Delivery, warranty, returns, concierge badges

## Pages Included

| Page | Template |
|------|----------|
| Homepage | `templates/index.json` |
| Product | `templates/product.json` |
| Collection | `templates/collection.json` |
| Cart | `templates/cart.json` |
| About | `templates/page.about.json` |
| Contact | `templates/page.contact.json` |
| FAQ | `templates/page.faq.json` |
| Search | `templates/search.json` |
| 404 | `templates/404.json` |

## Getting Started

### Prerequisites

1. [Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install) installed
2. A Shopify store (development or production)

### Install & Preview

```bash
# Navigate to theme directory
cd viso

# Login to Shopify (first time only)
shopify auth login

# Start local development server
shopify theme dev --store your-store.myshopify.com
```

### Deploy to Store

```bash
# Push theme to your store
shopify theme push --store your-store.myshopify.com
```

## Store Setup Checklist

After uploading the theme:

1. **Create pages** in Shopify Admin with handles: `about`, `contact`, `faq`
2. **Assign templates** — About → `page.about`, Contact → `page.contact`, FAQ → `page.faq`
3. **Create navigation menus** — `main-menu` and `footer` in Online Store > Navigation
4. **Add products** with high-quality photography (3:4 aspect ratio recommended)
5. **Create collections** — Aviators, Cat Eye, Oversized, etc.
6. **Customize theme** — Upload logo, set colors, configure homepage sections
7. **Set up policies** — Shipping, returns, privacy in Settings > Policies

## Customization

All homepage sections are editable via the Shopify theme customizer:

- Hero banner (image, text, CTAs)
- Featured collections (up to 3)
- Featured products (select collection)
- Image with text (craftsmanship story)
- Testimonials (client quotes)
- Trust bar (delivery, warranty badges)
- CTA banner (appointment booking)

Global settings under **Theme settings**:
- Colors (background, accent, gold)
- Typography (heading & body fonts)
- Logo & favicon
- Social media links
- Cart type (drawer or page)

## Brand Direction

- **Positioning:** Elite, fashion-forward premium eyewear
- **Target:** Pakistan's discerning luxury consumer
- **Tone:** Understated elegance, editorial, exclusive
- **Currency:** PKR (Pakistani Rupee) via Shopify Payments

---

Built for Viso. See the world differently.
