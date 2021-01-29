import Sortable from "sortablejs"

export const draggableClassName = "dynamic-form__enable-drag-item"
export const draggableActiveClassName = "dynamic-form__enable-drag-item--active"

export const setSortable = (el, options) => {
  return new Sortable(el, Object.assign({
    draggable: "." + draggableClassName,
    ghostClass: "dynamic-form__sortable-ghost"
  }, options))
}