import { createRoot } from "solid-js";
import { renderLocalTimeOn } from "./uxaddon/time.js";
import { wrapElementsInClass } from "./uxaddon/dom.js";
import { renderAdvancedTablesOn } from "./uxaddon/table.js";

createRoot(() => {
  renderLocalTimeOn(document.querySelectorAll("[data-time-format]"))
  wrapElementsInClass(document.querySelectorAll(".content > table"), ["table-responsive"])
  renderAdvancedTablesOn(document.querySelectorAll(".content > .table-responsive > table"))
})
