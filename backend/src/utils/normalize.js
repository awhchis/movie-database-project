export function normalize(text) {
    if (!text) return "";

    return String(text)
    .toLowerCase()

    //turn dashes and underscore to space
    .replace(/[-_]/g, " ")
    
    //no multiple spaces
    .replace(/\s+/g, " ")

    //no apostrophes
    .replace(/[-_]/g, " ")

    .trim();
}