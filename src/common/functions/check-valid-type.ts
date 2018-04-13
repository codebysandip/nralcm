
/**
 * Checks for valid value
 * @param type type of value
 * @param value Value to be checked
 * @returns true|false
 */
export function isValidType(type: Function, value: any): boolean {
    if (type.name === "Number") {
        return !isNaN(value);
    }

    if (type.name === "String" && typeof value === "string") {
        return true;
    }

    if (type.name === "Boolean" && ((value as string).toLowerCase() === "true" || (value as string).toLowerCase() === "false")) {
        return true;
    }

    if (type.name === "Array") {
        return checkValidArray(value);
    }

    if (type.constructor && type.constructor.name === "Date") {
        return Date.parse(value) !== NaN
    }
    try {
        JSON.parse(JSON.stringify(value));
        return true;
    } catch (e) {
        return false;
    }

}

/**
 * Check for valid array
 * @param str array string
 * @returns true|false
 */
function checkValidArray(str: string): boolean {
    const arrayStr = str.normalize();
    if (arrayStr.startsWith("[") && arrayStr.endsWith("]")) {
        return true;
    }
    return false;
}