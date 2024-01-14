import { createRenderEffect, onCleanup } from "solid-js";

function findCorrespondingTableHeadOfCell(target: HTMLTableCellElement): HTMLTableCellElement | null {
  const parentElement = target.parentElement as HTMLTableRowElement;
  const collection = parentElement.cells;
  for (let i = 0; i < collection.length; i++) {
    if (collection.item(i) === target) {
      const tbody = parentElement.parentElement
      const table = tbody.parentElement
      const allHeads =
        table.querySelectorAll(
          "thead > tr > th"
        );
      return allHeads.item(i) as HTMLTableCellElement;
    }
  }
  return null;
}

const TABLE_COLUMN_HOVER_CLASSNAME = "table-column-hover";

export function renderAdvancedTablesOn(elements: Iterable<Element>) {
  for (const e of elements) {
    if (!(e instanceof HTMLTableElement)) {
      console.warn(e, "is unable to be rendered as advanced table");
      continue;
    }

    const onMouseEnter = (ev: MouseEvent) => {
      const head = findCorrespondingTableHeadOfCell(
        ev.target as HTMLTableCellElement
      );
      if (!head.classList.contains(TABLE_COLUMN_HOVER_CLASSNAME)) {
        head.classList.add(TABLE_COLUMN_HOVER_CLASSNAME);
      }
    };

    const onMouseLeave = (ev: MouseEvent) => {
      const head = findCorrespondingTableHeadOfCell(
        ev.target as HTMLTableCellElement
      );
      if (head.classList.contains(TABLE_COLUMN_HOVER_CLASSNAME)) {
        head.classList.remove(TABLE_COLUMN_HOVER_CLASSNAME);
      }
    };

    createRenderEffect(() => {
      for (const td of e.querySelectorAll("td")) {
        td.addEventListener("mouseenter", onMouseEnter);
        td.addEventListener("mouseleave", onMouseLeave);
      }
    });

    onCleanup(() => {
      for (const td of e.querySelectorAll("td")) {
        td.removeEventListener("mouseenter", onMouseEnter);
        td.removeEventListener("mouseenter", onMouseLeave);
      }
    });
  }
}
