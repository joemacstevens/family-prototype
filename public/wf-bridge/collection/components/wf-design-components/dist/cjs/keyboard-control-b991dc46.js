'use strict';

const utils = require('./utils-aa0a6419.js');
const types = require('./types-84f579fc.js');

function scrollContainer(element, container) {
    if (!element || (!container || !container.scrollTo)) {
        return;
    }
    const elementPosition = element.getBoundingClientRect();
    const containerPosition = container.getBoundingClientRect();
    if (elementPosition.bottom < containerPosition.bottom &&
        elementPosition.top > containerPosition.top)
        return;
    const paddingAdjustment = utils.removePX(window.getComputedStyle(container).getPropertyValue('padding-top'));
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
    const newActiveIndex = key === types.KeyValue.ARROW_UP
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
    if (e.key === types.KeyValue.ARROW_UP || e.key === types.KeyValue.ARROW_DOWN || e.key === types.KeyValue.TAB_KEY) {
        e.preventDefault();
        handleArrowNavigation(e.key, focusedElement, focusClass, elementList, itemsList);
    }
    if (e.key === types.KeyValue.ENTER_KEY && focusedElement) {
        e.preventDefault();
        const elementToClick = !!focusedElToClick
            ? focusedElToClick
            : focusedElement;
        elementToClick.click();
    }
}

exports.handleKeyboardControl = handleKeyboardControl;
