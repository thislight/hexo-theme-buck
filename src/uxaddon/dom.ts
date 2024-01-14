import { createRenderEffect } from "solid-js";


export function wrapElementsInClass(elements: Iterable<Element>, classes: string[]) {
  for (const e of elements) {
    createRenderEffect(() => {
      const wrapper = document.createElement("div");
      wrapper.dataset.buckBaked = "false"
      wrapper.classList.add(...classes);
      e.replaceWith(wrapper);
      wrapper.appendChild(e);
    });
  }
}
