/**
 * Expanded CSS filters to include as many ad-related elements as possible.
 */
const cssFilters = [
    "[id*='ad']",
    "[class*='ad']",
    "[src*='ads']",
    "[href*='ads']",
    "[id*='sponsor']",
    "[class*='sponsor']",
    "[id*='banner']",
    "[class*='banner']",
    "[id*='promo']",
    "[class*='promo']",
    "[id*='popup']",
    "[class*='popup']",
    "[id*='offer']",
    "[class*='offer']",
    "[id*='advertisement']",
    "[class*='advertisement']",
    "[id*='marketing']",
    "[class*='marketing']",
    "[data-ad]",
    "[data-advertisement]",
    "[data-sponsored]",
    "iframe[src*='ads']",
    "iframe[id*='ad']",
    "iframe[class*='ad']",
    "img[src*='ads']",
    "img[alt*='ad']",
    ".ad-box",
    ".ad-container",
    ".ad-banner",
    ".ad-slot",
    ".ad-label",
    ".ad-space",
    ".ad-widget",
    ".ad-wrapper",
    ".sponsored-content",
    ".advertisement-container",
    ".banner-ad",
    ".popup-ad",
    ".ad-frame"
];

/**
 * Validate a CSS selector to ensure it does not cause syntax errors.
 * @param selector The CSS selector string to validate.
 * @returns True if the selector is valid; false otherwise.
 */
function isValidCSSSelector(selector: string): boolean {
    try {
        document.querySelector(selector);
        return true;
    } catch (e) {
        console.warn(`Invalid CSS Selector: ${selector}`, e);
        return false;
    }
}

/**
 * Parse and sanitize filter rules into valid CSS selectors.
 * @param rules Array of raw filter rules.
 * @returns Array of valid CSS selectors.
 */
function sanitizeFilters(rules: string[]): string[] {
    return rules.filter(isValidCSSSelector);
}

/**
 * Replace ads with custom content.
 */
function replaceAds() {
    const validSelectors = sanitizeFilters(cssFilters);

    validSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
            const element = el as HTMLElement;

            if (element.dataset?.adfriendProcessed) return;

            // Replace ad content
            element.innerHTML = `<div style="text-align:center; padding:10px; background-color:#f0f0f0; border:1px solid #ccc;">
        <p>Hello! Ad replaced by AdFriend. Make sure to take some rest and drink lots of water.</p>
      </div>`;
            element.style.display = "block";
            element.dataset.adfriendProcessed = "true";
            console.log(`Replaced ad content for element: ${selector}`);
        });
    });

    // Detect and replace dynamically created ads
    detectAndReplaceAds();
}

/**
 * Detect dynamic ads using additional heuristics.
 */
function detectAndReplaceAds() {
    const ads = Array.from(document.querySelectorAll("*")).filter((el) => {
        const element = el as HTMLElement;

        const id = element.id?.toLowerCase() || "";
        const className =
            typeof element.className === "string"
                ? element.className.toLowerCase()
                : "";
        const src = element.getAttribute("src")?.toLowerCase() || "";

        return (
            id.includes("ad") ||
            className.includes("ad") ||
            element.tagName.toLowerCase() === "iframe" ||
            src.includes("ads") ||
            element.getAttribute("data-ad") !== null
        );
    });

    ads.forEach((ad) => {
        const element = ad as HTMLElement;

        if (element.dataset?.adfriendProcessed) return;
        element.innerHTML = `<div style="text-align:center; padding:10px; background-color:#f0f0f0; border:1px solid #ccc;">
      <p>Hello! Ad replaced by AdFriend. Make sure to take some rest and drink lots of water.</p>
    </div>`;
        element.style.display = "block";
        element.dataset.adfriendProcessed = "true";
        console.log(`Replaced dynamic ad: ${element.tagName}`);
    });
}

/**
 * Throttle DOM mutation observer to prevent performance issues.
 */
let lastRun = Date.now();
const throttleDelay = 500;

const throttledReplaceAds = () => {
    const now = Date.now();
    if (now - lastRun >= throttleDelay) {
        lastRun = now;
        replaceAds();
    }
};

const observer = new MutationObserver(throttledReplaceAds);
observer.observe(document.body, { childList: true, subtree: true });
replaceAds();
