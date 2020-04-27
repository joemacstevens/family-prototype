import { r as removePX } from './utils-9974937e.js';
import { a as KeyValue } from './types-bc604d28.js';
function scrollContainer(element, container) {
    if (!element || (!container || !container.scrollTo)) {
        return;
    }
    var elementPosition = element.getBoundingClientRect();
    var containerPosition = container.getBoundingClientRect();
    if (elementPosition.bottom < containerPosition.bottom &&
        elementPosition.top > containerPosition.top)
        return;
    var paddingAdjustment = removePX(window.getComputedStyle(container).getPropertyValue('padding-top'));
    var scrollAdjustment = elementPosition.bottom - containerPosition.bottom > 0
        ? elementPosition.bottom - containerPosition.bottom + paddingAdjustment
        : elementPosition.top - containerPosition.top - paddingAdjustment;
    container.scrollTo({ top: container.scrollTop + scrollAdjustment });
}
var handleArrowNavigation = function (key, focusedElement, focusClass, itemsList, scrollableContainer) {
    var activeIndex;
    if (!focusedElement) {
        itemsList[0].classList.add(focusClass);
        return;
    }
    else {
        activeIndex = itemsList.indexOf(focusedElement);
    }
    var newActiveIndex = key === KeyValue.ARROW_UP
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
function handleKeyboardControl(e, itemClass, focusClass, itemsList, focusedElToClick, additionalElements) {
    if (additionalElements === void 0) { additionalElements = []; }
    var elementList = Array.from(itemsList.querySelectorAll("." + itemClass)).concat(additionalElements);
    var focusedElement = elementList.find(function (element) { return element.classList.contains(focusClass); });
    if (e.key === KeyValue.ARROW_UP || e.key === KeyValue.ARROW_DOWN || e.key === KeyValue.TAB_KEY) {
        e.preventDefault();
        handleArrowNavigation(e.key, focusedElement, focusClass, elementList, itemsList);
    }
    if (e.key === KeyValue.ENTER_KEY && focusedElement) {
        e.preventDefault();
        var elementToClick = !!focusedElToClick
            ? focusedElToClick
            : focusedElement;
        elementToClick.click();
    }
}
export { handleKeyboardControl as h };
