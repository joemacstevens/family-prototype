import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';
export class DragManager {
    constructor(dragClass) {
        Sortable.mount(new AutoScroll());
        this.dragIcon = `.${dragClass}`;
    }
    initContainer(dragArea, options = {}) {
        this.dragManager = new Sortable(dragArea, Object.assign({ handle: this.dragIcon }, options));
        this.initOrder = this.getCurrentOrder();
    }
    resetDraggable() {
        if (this.dragManager)
            this.dragManager.sort(this.initOrder);
    }
    unload() {
        if (this.dragManager)
            this.dragManager.destroy();
    }
    getCurrentOrder() {
        return this.dragManager.toArray();
    }
}
