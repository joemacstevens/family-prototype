import { a as KeyValue } from './types-bc604d28.js';
import { r as removePX } from './utils-c58b1fe2.js';

function scrollContainer(element, container) {
    if (!element || (!container || !container.scrollTo)) {
        return;
    }
    const elementPosition = element.getBoundingClientRect();
    const containerPosition = container.getBoundingClientRect();
    if (elementPosition.bottom < containerPosition.bottom &&
        elementPosition.top > containerPosition.top)
        return;
    const paddingAdjustment = removePX(window.getComputedStyle(container).getPropertyValue('padding-top'));
    const scrollAdjustment = elementPosition.bottom - containerPosition.bottom > 0
        ? elementPosition.bottom - containerPosition.bottom + paddingAdjustment
        : elementPosition.top - containerPosition.top - paddingAdjustment;
    container.scrollTo({ top: container.scrollTop + scrollAdjustment });
}
const handleArrowNavigation = (key, focusedElement, focusClass, itemsList, scrollableContainer) => {
    let activeIndex;
    if (!focusedElement) {
        itemsList[0].classList.add(focusClass);
        return;
    }
    else {
        activeIndex = itemsList.indexOf(focusedElement);
    }
    const newActiveIndex = key === KeyValue.ARROW_UP
        ? activeIndex > 0
            ? activeIndex - 1
            : itemsList.length - 1
        : activeIndex < itemsList.length - 1
            ? activeIndex + 1
            : 0;
    scrollContainer(itemsList[newActiveIndex], scrollableContainer);
    itemsList[activeIndex].classList.remove(focusClass);
    itemsList[newActiveIndex].classList.add(focusClass);
};
function handleKeyboardControl(e, itemClass, focusClass, itemsList, focusedElToClick, additionalElements = []) {
    const elementList = Array.from(itemsList.querySelectorAll(`.${itemClass}`)).concat(additionalElements);
    const focusedElement = elementList.find((element) => element.classList.contains(focusClass));
    if (e.key === KeyValue.ARROW_UP || e.key === KeyValue.ARROW_DOWN || e.key === KeyValue.TAB_KEY) {
        e.preventDefault();
        handleArrowNavigation(e.key, focusedElement, focusClass, elementList, itemsList);
    }
    if (e.key === KeyValue.ENTER_KEY && focusedElement) {
        e.preventDefault();
        const elementToClick = !!focusedElToClick
            ? focusedElToClick
            : focusedElement;
        elementToClick.click();
    }
}

export { handleKeyboardControl as h };
