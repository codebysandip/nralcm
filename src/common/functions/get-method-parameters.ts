
/**
 * Get method parameters names
 * @param target Class
 * @param methodName name of Method
 * @returns Array of method parameters names
 */
export function getMethodParameters(target: Function, methodName: string): string[] {
    const methodString = target.toString() as string;
    let methodParameters: string[] = [];
    if (methodString) {
        let args = methodString.substr(methodString.indexOf(methodName));
        args = args.substring(args.indexOf("(") + 1, args.indexOf(")"));
        if (args.length)
            methodParameters = args.replace(/ /g, "").split(",");
    }
    return methodParameters;
}