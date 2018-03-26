export function Repository() {
    return function(target: any) {
        console.log("Repository", target);
    };
}