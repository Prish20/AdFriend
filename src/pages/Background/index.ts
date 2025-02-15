const filters: string[] = [];

// Load filters dynamically
async function loadFilters() {
    const filterFiles = [
        "filter_1.txt",
        "filter_2.txt",
        "filter_3.txt",
        "filter_4.txt",
        "filter_5.txt",
        "filter_6.txt",
        "filter_7.txt",
        "filter_8.txt",
    ]; // Add all filter files
    for (const file of filterFiles) {
        const response = await fetch(chrome.runtime.getURL(`assets/filters/${file}`));
        const content = await response.text();
        parseFilters(content);
    }
}

// Parse filters into memory
function parseFilters(content: string) {
    const lines = content.split("\n");
    lines.forEach((line) => {
        if (!line.startsWith("!") && line.trim()) {
            filters.push(line.trim());
        }
    });
}

// Send filters to the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getFilters") {
        sendResponse({ filters });
    }
});

// Load filters on startup
loadFilters().then(() => {
    console.log("Filters loaded in background script");
});
