/**
 * List of e-commerce domains to exclude from ad replacement.
 * These domains are excluded to prevent the extension from affecting their user experience.
 */
const excludedDomains: string[] = [
    // Global e-commerce sites
    "amazon.com",
    "amazon.in",
    "amazon.co.uk",
    "ebay.com",
    "aliexpress.com",
    "walmart.com",
    "etsy.com",
    "rakuten.co.jp",
    "flipkart.com",
    "wayfair.com",
    "target.com",
    "bestbuy.ca",
    "shopify.com",
    "aliexpress.us",
    "ebay.co.uk",
    "ebay.de",
    "ebay.com.au",
    "ebay.ca",

    // Regional e-commerce sites
    "mercadolibre.com",
    "jd.com",
    "taobao.com",
    "tmall.com",
    "lazada.com",
    "zalando.de",
    "carrefour.fr",
    "bol.com",
    "tokopedia.com",
    "shopee.com",
    "cdiscount.com",
    "manomano.fr",
    "jumia.com",
    "noon.com",
    "daraz.com",
    "bigw.com.au",
    "alibaba.com",

    // Grocery and specialty e-commerce
    "instacart.com",
    "ocado.com",
    "bigbasket.com",
    "freshdirect.com",
    "kroger.com",
    "woolworths.com.au",
    "tesco.com",
    "safeway.com",
    "coles.com.au",

    // Electronics and tech retailers
    "bestbuy.com",
    "newegg.com",
    "bhphotovideo.com",
    "microcenter.com",
    "currys.co.uk",
    "fnac.com",
    "mediamarkt.com",
    "elkjop.no",

    // Fashion and luxury retailers
    "shein.com",
    "asos.com",
    "farfetch.com",
    "zappos.com",
    "boohoo.com",
    "macys.com",
    "nordstrom.com",
    "saksfifthavenue.com",
    "matchesfashion.com",
    "ssense.com",
    "net-a-porter.com",
    "uniqlo.com",
    "hm.com",
    "zalora.com",

    // Furniture and home goods
    "ikea.com",
    "westelm.com",
    "crateandbarrel.com",
    "overstock.com",
    "wayfair.co.uk",
    "made.com", // UK
    "castlery.com",
    "cb2.com",
    "ashleyfurniture.com",

    // Automotive
    "autozone.com",
    "carparts.com",
    "rockauto.com",
    "advanceautoparts.com",
    "pepboys.com",

    // Beauty and wellness
    "sephora.com",
    "ulta.com",
    "nykaa.com",
    "lookfantastic.com",
    "bathandbodyworks.com",

    // Sporting goods and outdoor equipment
    "decathlon.com",
    "rei.com",
    "dickssportinggoods.com",
    "cabelas.com",
    "basspro.com",

    // Travel and booking-related (optional, depending on your scope)
    "booking.com",
    "expedia.com",
    "airbnb.com",
    "tripadvisor.com",
    "trivago.com",
    "hotels.com",

    // Other popular e-commerce platforms
    "gumtree.com",
    "olx.com",
    "letgo.com",
    "vinted.com",
    "poshmark.com",
    "mercari.com",
    "kijiji.ca",

    "jumia.co.ke", "jumia.com.ng", "jumia.com.gh", "jumia.co.tz", "jumia.co.ug", "jumia.ci", "jumia.sn", "jumia.ma", "jumia.cm", "jumia.dz", "jumia.rw", "jumia.co.ls", "jumia.co.mz", "jumia.co.bw", "jumia.co.sz", "jumia.ne", "jumia.tn", "jumia.co.zm", "jumia.co.zw"
];

/**
 * Function to check if the current domain is excluded.
 * @param domain The current domain to check.
 * @returns True if the domain is excluded; false otherwise.
 */
export function isExcludedDomain(domain: string): boolean {
    const currentDomain = domain.replace("www.", "");
    return excludedDomains.some((excludedDomain) =>
        currentDomain.includes(excludedDomain)
    );
}

export default excludedDomains;


/**
 * Expanded CSS filters to include as many ad-related elements as possible.
 */
export const cssFilters = [
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
  ".ad-frame",
  "div[aria-label*='ads']",
  "iframe[id*='google_ads_iframe']",
  "[aria-label*='Google Ads']",
  "iframe[title*='Advertisement']",
  "div:has(> iframe[src*='ads'])",
];
