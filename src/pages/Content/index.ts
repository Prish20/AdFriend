/**
 * Retrieves the list of ad filter files.
 * @returns {Promise<string[]>} List of filter file paths.
 */
async function getFilterFiles(): Promise<string[]> {
  return [
    'filters/filter_1.txt',
    'filters/filter_2.txt',
    'filters/filter_3.txt',
    'filters/filter_4.txt',
    'filters/filter_5.txt',
    'filters/filter_6.txt',
    'filters/filter_7.txt',
    'filters/filter_8.txt',
  ];
}

/**
 * Loads and parses the filter lists from the extension's assets.
 * @returns {Promise<string[]>} List of ad-blocking rules extracted from the filter files.
 */
async function loadFilters(): Promise<string[]> {
  let allRules: string[] = [];
  const filterFiles = await getFilterFiles();

  for (const file of filterFiles) {
    try {
      const response = await fetch(chrome.runtime.getURL(file));
      if (!response.ok) continue;
      const text = await response.text();
      const rules = text
        .split('\n')
        .filter((line) => line.trim() !== '' && !line.startsWith('!'));
      allRules = allRules.concat(rules);
    } catch {
      continue;
    }
  }
  return allRules;
}

/**
 * Extracts different types of ad-blocking rules from the filter lists.
 * @returns {Promise<{ adDomains: string[], adSelectors: string[], scriptPatterns: string[] }>}
 * An object containing domain rules, CSS selectors, and script patterns.
 */
async function extractAdRules() {
  const rules = await loadFilters();
  let adDomains: string[] = [];
  let adSelectors: string[] = [];
  let scriptPatterns: string[] = [];

  rules.forEach((rule) => {
    if (rule.startsWith('||')) {
      adDomains.push(rule.replace('||', '').split('^')[0]);
    } else if (rule.startsWith('##')) {
      adSelectors.push(rule.replace('##', '').trim());
    } else if (rule.includes('$script')) {
      scriptPatterns.push(rule.split('$')[0].trim());
    }
  });

  return { adDomains, adSelectors, scriptPatterns };
}

/**
 * Removes detected ads in the DOM based on predefined CSS selectors.
 */
async function blockAdsInDOM() {
  const { adSelectors } = await extractAdRules();
  if (adSelectors.length === 0) return;
  document
    .querySelectorAll(adSelectors.join(', '))
    .forEach((adElement) => adElement.remove());
}
blockAdsInDOM();

/**
 * Observes and removes dynamically inserted ads in the page using MutationObserver.
 */
async function observeAndBlockAds() {
  const { adSelectors } = await extractAdRules();
  if (adSelectors.length === 0) return;
  const observer = new MutationObserver(() => {
    document
      .querySelectorAll(adSelectors.join(', '))
      .forEach((adElement) => adElement.remove());
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
observeAndBlockAds();

/**
 * Blocks script-based ad injections by removing scripts from known ad sources.
 */
async function blockScriptBasedAds() {
  const { scriptPatterns } = await extractAdRules();
  if (scriptPatterns.length === 0) return;
  document.querySelectorAll('script').forEach((script) => {
    const src = script.getAttribute('src');
    if (src && scriptPatterns.some((pattern) => src.includes(pattern))) {
      script.remove();
    }
  });
}
blockScriptBasedAds();
