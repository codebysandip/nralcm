export function isValidType(type: any, value: any) {
    if (type.name === "Number") {
        return !isNaN(value);
    }

    if (type.name === "String" && typeof value === "string") {
        return true;
    }

    if (type.name === "Boolean" && ((value as string).toLowerCase() === "true" || (value as string).toLowerCase() === "false")) {
        return true;
    }
    return false;
}