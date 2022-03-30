export const cloneNode = <T extends Node>(node: T) => {
    return node.cloneNode(true) as T
}