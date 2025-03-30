export function filterSearch(array, searchStr) {
    const lowerSearch = searchStr.toLowerCase();

    const startsWithMatches = [];
    const containsMatches = [];

    for (const item of array) {
        if (typeof item !== 'string') continue; // Avoid errors with non-strings

        const lowerItem = item.toLowerCase();
        if (lowerItem.startsWith(lowerSearch)) {
            startsWithMatches.push(item);
        } else if (lowerItem.includes(lowerSearch)) {
            containsMatches.push(item);
        }
    }

    return [...startsWithMatches, ...containsMatches].slice(0, 6);
}
