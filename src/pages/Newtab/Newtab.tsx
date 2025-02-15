import React, { useState } from "react";

const Options = () => {
    const [customFilter, setCustomFilter] = useState("");

    const saveFilter = () => {
        chrome.storage.local.get({ filters: [] }, (data) => {
            const updatedFilters = [...data.filters, customFilter];
            chrome.storage.local.set({ filters: updatedFilters }, () => {
                alert("Custom filter saved!");
            });
        });
    };

    return (
        <div>
            <h1>AdFriend Options</h1>
            <input
                type="text"
                value={customFilter}
                onChange={(e) => setCustomFilter(e.target.value)}
                placeholder="Add a custom filter"
            />
            <button onClick={saveFilter}>Save Filter</button>
        </div>
    );
};

export default Options;
