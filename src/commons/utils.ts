import { ReactElement } from "react";


export function checkIsNavigatorMovil() {
    const _navigator = (window.navigator.userAgent || window.navigator.vendor || (window as any).opera);
    const Firfx = /Firefox/i.test(_navigator);
    const movil = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(_navigator);
    const firfoxMobile = (Firfx && movil);
    return movil || firfoxMobile;
}




export function getFirstChild(childrens: ReactElement[] | ReactElement | undefined): ReactElement | undefined {
    let item = {} as ReactElement | undefined;
    if (childrens && Array.isArray(childrens)) {
        item = childrens.find(() => true);
    }
    return item;
}

export function getChild(element: ReactElement | undefined) {
    return element && element.props.children
}