
export function getMethodParameters(target: any, methodName: string) {
    const methodString = target.toString() as string;
    let methodParameters: string[] = [];
    if (methodString) {
        let args = methodString.substr(methodString.indexOf(methodName));
        args = args.substring(args.indexOf("(") + 1, args.indexOf(")"));
        methodParameters = args.replace(/ /g, "").split(",");
        // this.validateParams(methodParameters, target);
    }
    return methodParameters;
}