export function isValidType(type: Function, value: any) {
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
    try {
        JSON.parse(JSON.stringify(value));
        return true;
    } catch (e) {
        return false;
    }

}

function checkValidArray(str: string) {
    const arrayStr = str.normalize();
    if (arrayStr.startsWith("[") && arrayStr.endsWith("]")) {
        return true;
    }
    return false;
}