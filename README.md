# REALONE — Complete Angular 21 TV & Display Showroom

A premium **responsive, standalone Angular 21** front-end for a local television and display seller. The source code, user-uploaded owl video, poster and animated hummingbird SVG are all included.

This is a **complete runnable Angular frontend** but **not a connected ecommerce backend**. The product names/specs are intentionally labelled DEMO. No invented prices, official social profiles, verified stock, or seller WhatsApp number are included.

## 1. Install and run (Windows 10 / PowerShell)

Use Node.js 22.12+ (current Node 22 patch recommended) and npm.

```powershell
# Extract the ZIP archive, then open the project folder:
cd C:\path\to\realone-angular-complete
npm install
npm start
```

Site: **http://localhost:4200**.

For production static build:

```powershell
npm run build
```

Output: `dist/realone-tv/browser/`. Deploy that folder to a static host configured to serve `index.html` for SPA routes (this starter uses one page with in-page category navigation).

If your previous Angular installation reported `Could not find the @angular/build:dev-server builder's node package`, run `npm install` **in this exact folder**; the included `package.json` declares `@angular/build`. Do not run `ng new` on top of this project.

## 2. Main features

- Cinematic dark/lime hero with nature atmosphere, animated hummingbird SVG, elegant delayed TV reveal and text entrance.
- **Uploaded wildlife clip plays in a realistic TV mockup**. Same clip also drives the subdued full-page hero video atmosphere.
- Play / pause, Fill / Fit controls and still-image alternatives (lake and aurora). The nature stills use Unsplash over the network; the owl video and poster are local.
- **10 display categories:** wall TV, smart TV, banner TV, large screen, advertising TV, LED video wall, outdoor signage, interactive panel, pro monitor, gaming monitor.
- Responsive category gallery and **size + category** filters.
- **10 DEMO products** with details panels (size, resolution, panel, brightness, orientation, audio, ports, usage etc.).
- **Compare 2–3 displays side by side**, even across different types. Add/remove/clear and compare tray.
- Commercial solutions section for business customers.
- Interactive brightness demonstration. Brightness is a **software visual effect only**, not a TV performance test.
- Instagram / YouTube / WhatsApp callouts (awaiting actual seller URLs).
- In-page **guided chatbot** with quick topics and simple FAQ detection. The chat is **local/browser-only**, not an AI service or live human agent. A WhatsApp handoff is available once the seller's number is configured.
- Enquiry form with model selection, name, phone and message, copy-to-clipboard and WhatsApp prefilled message.
- Fully responsive mobile styling, keyboard Escape to close dialogs, labels, reduced-motion support, scroll reveals.

## 3. Configure RealOne details

Open **`src/app/store.config.ts`** and replace:

```ts
export const STORE = {
  name: 'RealOne',
  tagline: 'See nature come alive.',
  whatsappNumber: '91XXXXXXXXXX', // Replace with actual seller number — digits only
  instagramUrl: 'https://www.instagram.com/REPLACE_WITH_REAL_ACCOUNT/',
  youtubeUrl: 'https://www.youtube.com/@REPLACE_WITH_REAL_CHANNEL',
  facebookUrl: '',
  showroomLocation: 'Replace with actual store location',
  businessHours: 'Replace with actual business hours',
  contactEmail: '',
};
```

The default shipped file intentionally has blank URLs/number so the project does not redirect to random accounts. When the number is absent, the site shows a configuration notice.

Edit **`src/app/catalog.ts`** to replace all demo products with the *actual seller's inventory, warranties, prices and product photographs*. The sample `*` specs are illustrative and must not be used as verified claims.

The catalogue is a local TypeScript array, so the site works without a database. You can replace the array with `HttpClient` calls later.

## 4. Hero video / hummingbird assets

```text
public/
  media/owl-wildlife.mp4            Uploaded user video, 1440×1810, ~5 seconds
  images/owl-poster.jpg            Included local owl frame
  images/hummingbird.svg           Original vector flying bird artwork
```

The hero background uses the same owl clip at low opacity with a forest still overlay. The TV uses the original clip at full source quality. The bird flies across the page and hovers using CSS keyframes; this is a stylised SVG, **not photorealistic hummingbird footage**.

To achieve the fully realistic cinematic sequence described (bird actually flies through a forest film and the *identical* nature scene seamlessly continues inside the TV), obtain a properly licensed **16:9 high-bitrate nature/hummingbird production video**. Replace both `<source src="media/owl-wildlife.mp4">` occurrences in `src/app/app.component.html` with `media/nature-hero.mp4`, add that file in `public/media`, update poster, and adjust the `hero-forest-overlay` CSS as desired. For perfect continuity, use one matching clip on both layers; currently two muted instances may drift by a few frames.

**4K cannot be created just by styling or upscaling**. The supplied video is 1440×1810 portrait, so a 16:9 TV crops to fill or shows letterboxing to fit. Use a real 3840×2160 source when available.

To optimise for production, use multiple MP4/WebM encoded resolutions and `preload="metadata"` and consider an image poster fallback for low-power devices. Browsers may restrict autoplay; the video is muted and manual play/pause is provided.

## 5. WhatsApp guided chat vs real live chat

**Included:** A lightweight website chatbot responds instantly using front-end rules. The customer can continue to WhatsApp with a prefilled summary. WhatsApp opens in a new tab; the customer must press **Send**. It is **not** a WhatsApp Business API connection and does not secretly send messages.

**For actual two-way chat and notification delivery:**

1. Build a Spring Boot (or another server) backend that receives customer chat messages.
2. Add authentication, validation, request rate limits, logging policy, privacy consent, and storage only as needed.
3. Configure a Meta WhatsApp Business Platform account, approved phone-number ID and access token **on the backend only**.
4. Use the WhatsApp Cloud API to deliver messages, subject to template/consent rules. Implement webhooks for inbound messages and optionally WebSocket/SSE to display agent responses live.
5. Never expose an API token or webhook secret in the Angular project, GitHub repository, or browser.

The current frontend is safe to run as an isolated demo without credentials.

## 6. Source layout

```text
realone-angular-complete/
├── README.md
├── SETUP-WINDOWS.txt
├── package.json
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── public/
│   ├── images/
│   │   ├── owl-poster.jpg
│   │   └── hummingbird.svg
│   └── media/
│       └── owl-wildlife.mp4
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    └── app/
        ├── app.component.ts       # Signals, filters, compare, chat & enquiries
        ├── app.component.html     # All sections, product and chat templates
        ├── app.component.css      # Design system & responsive animations
        ├── catalog.ts            # Display types & example products
        ├── store.config.ts       # Verified business contacts go here
        └── reveal.directive.ts   # IntersectionObserver scroll reveals
```

## 7. Known limitations / validation

- The TypeScript source passed a strict syntax/type check using Angular-type stubs. The HTML was checked for balanced tags.
- **Full Angular build not verified** in the creation environment: the npm registry/dependencies were unavailable. Run `npm install` followed by `npm run build` on your machine to compile with the real Angular compiler.
- This is one marketing/showroom page with category-based navigation and modals, not 10 distinct Angular routes. It is designed to be easy to split into feature pages as the business grows.
- No backend, real customer notification, shopping cart, actual prices, stock sync, payment handling, Google Maps or admin portal is supplied.
- Demo specifications contain `*`; confirm manufacturer datasheets before making any public promises.
- Photos served via Unsplash depend on internet access and contributor licensing. Replace them with approved and locally served brand assets for production.

## Helpful references

Official Angular docs: https://angular.dev/guide/components and https://angular.dev/tools/cli/build
