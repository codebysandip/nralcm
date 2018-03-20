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

    console.log("value", type.name, value);
    if (type.name === "Array") {
        return checkValidArray(value);
            // const arrayStr = (value as string).replace(/[\[\]]/g, "");
        // }
        // return Array.isArray((value as string).normalize());
    }
    // if (type.name === "Object") {
        try {
            JSON.parse(JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    // }
    // console.log("type", type.name, value, );
    // return false;
}

function checkValidArray(str: string) {
    const arrayStr = str.normalize();
    if (arrayStr.startsWith("[") && arrayStr.endsWith("]")) {
        return true;
    }
    return false;
}