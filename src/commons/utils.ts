import { ReactElement } from "react";

export function getFirstChild(
  childrens: ReactElement[] | ReactElement | undefined,
): ReactElement | undefined {
  let item = {} as ReactElement | undefined;
  if (childrens && Array.isArray(childrens)) {
    item = childrens.find(() => true);
  }
  return item;
}

export function getChild(element: ReactElement | undefined) {
  return element && element.props.children;
}
