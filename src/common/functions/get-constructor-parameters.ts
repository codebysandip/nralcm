/**
 * Method to get constructor parameter names
 * @param target class Object
 */
export function getConstructorParameters(target: any): string[] {
    const classString = target.toString() as string;
    let constructorParameters: string[] = [];
    const constructorIndex = classString.indexOf("constructor");
    if (classString && constructorIndex !== -1) {
        let args = classString.substr(constructorIndex);
        args = args.substring(args.indexOf("(") + 1, args.indexOf(")"));
        if (args.length)
            constructorParameters = args.replace(/ /g, "").split(",");
    }
    return constructorParameters;
}