import Sortable from "sortablejs"

export const draggableClassName = "dynamic-form__enable-drag-item"
export const draggableActiveClassName = "dynamic-form__enable-drag-item--active"

export const setSortable = (el, options) => {
  return new Sortable(el, Object.assign({
    draggable: "." + draggableClassName,
    ghostClass: "dynamic-form__sortable-ghost"
  }, options))
}

export const getItemParentPath = (node) => {
  let path = []
  while(node.className.indexOf("dynamic-form__drag-wrap") === -1){
    path.unshift(node.id)
    node = node.parentNode
  }
  return path
}

export const getItemIndex = (node) => {
  let idx = 0
  while(node.previousSibling) {
    idx ++;
    node = node.previousSibling;
  }
  return idx
}