/**
 * DOM element representation
 * @type {(name: string, ...properties: any) => HTMLElement}
 */
export function E(name, ...properties) {
  let text = '';
  let children = [];
  let attributes = {};
  for (const property of properties) {
    if (typeof property === 'string') text = property;
    else if (Array.isArray(property)) children = property;
    else if (typeof property === 'object') attributes = property;
  }

  /**
   * Create actual element; at this point, `name` must be a tag name
   */
  const element = document.createElement(name);

  /**
   * Add attributes to new element
   */
  for (const [attr, val] of Object.entries(attributes)) {
    element.setAttribute(attr, val);
  }

  /**
   * Add children to element. Regular text is considered the first child,
   * as would have been set via `Element.textContent` (it deletes every other children)
   */
  element.append(text, ...children);

  return element;
}

/**
 * Namespaced(?) element, e.g. SVGs
 * @type {(nsUri: string, name: string, ...properties: any) => HTMLElement}
 */
export function ENS(nsUri, name, ...properties) {
  let children = [];
  let attributes = {};
  for (const property of properties) {
    if (Array.isArray(property)) children = property;
    else if (typeof property === 'object') attributes = property;
  }

  const element = document.createElementNS(nsUri, name);

  for (const [attr, val] of Object.entries(attributes)) {
    element.setAttributeNS(null, attr, val);
  }

  element.append(...children);

  return element;
}
