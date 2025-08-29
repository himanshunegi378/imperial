/**
 * Parses a string containing XML-like tags to extract their content.
 *
 * @param text The raw string output from the LLM, containing tags like <key>value</key>.
 * @param tags An array of tag names (without brackets) to extract (e.g., ['isValid', 'feedback']).
 * @returns A record object where keys are the tag names and values are the content within them.
 */
export const parseXmlTagFormat = (text: string, tags: string[]): Record<string, string> => {
    const result: Record<string, string> = {};

    for (const tag of tags) {
        // This regex finds the content between a specific <tag> and </tag>.
        // It's case-insensitive (i) and handles multi-line content (s).
        const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'is');
        const match = text.match(regex);

        // If a match is found, match[1] contains the captured content.
        if (match && match[1]) {
            result[tag] = match[1].trim();
        }
    }

    return result;
};