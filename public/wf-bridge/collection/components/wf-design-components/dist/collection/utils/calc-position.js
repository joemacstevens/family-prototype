import { spacesNames } from './spaces-names';
import { setPX } from './utils';
const defaultVerticalSpace = 'top';
const defaultHorizontalSpace = 'left';
const middleSpace = 'middle';
const getSpaceCode = (triggerCenter, screenSpace, spacesCount) => {
    let spaceNumber = Math.floor(triggerCenter / screenSpace) + 1;
    spaceNumber = spaceNumber > spacesCount ? spacesCount : spaceNumber;
    return `${spaceNumber}/${spacesCount}`;
};
const isTooltipTooWide = (triggerPosition, elTotalWidth) => {
    return (triggerPosition.left < elTotalWidth && window.innerWidth - triggerPosition.right < elTotalWidth);
};
const getMainSpaces = (triggerPosition, columns, rows, elTotalWidth) => {
    const triggerCenter = {
        vertical: (triggerPosition.top + triggerPosition.bottom) / 2,
        horizontal: (triggerPosition.left + triggerPosition.right) / 2,
    };
    const screenSpace = {
        width: window.innerWidth / columns,
        height: window.innerHeight / rows,
    };
    const mainSpaces = {
        vertical: defaultVerticalSpace,
        horizontal: defaultHorizontalSpace,
    };
    if (!!(rows % 2) && isTooltipTooWide(triggerPosition, elTotalWidth)) {
        rows = rows - 1;
        screenSpace.height = window.innerHeight / rows;
    }
    mainSpaces.vertical =
        spacesNames.vertical[getSpaceCode(triggerCenter.vertical, screenSpace.height, rows)];
    if (mainSpaces.vertical === middleSpace) {
        columns = columns - 1;
        screenSpace.width = window.innerWidth / columns;
    }
    mainSpaces.horizontal =
        spacesNames.horizontal[getSpaceCode(triggerCenter.horizontal, screenSpace.width, columns)];
    return mainSpaces;
};
const calculateVerticalPosition = (spaces, triggerRect, dimensions) => {
    const verticalSpace = spaces.vertical;
    if (verticalSpace === 'top') {
        return triggerRect.bottom;
    }
    if (verticalSpace === 'middle') {
        return triggerRect.bottom - dimensions.height / 2 - triggerRect.height / 2;
    }
    return triggerRect.top - dimensions.height;
};
const calculateHorizontalPosition = (spaces, rect, dimensions, distance) => {
    const horizontalSpace = spaces.horizontal;
    const isVerticalMiddle = spaces.vertical === 'middle';
    if (horizontalSpace === 'left') {
        return isVerticalMiddle ? rect.right : rect.left - distance;
    }
    if (horizontalSpace === 'center') {
        return rect.left + rect.width / 2 - dimensions.width / 2;
    }
    return isVerticalMiddle ? rect.left - dimensions.width : rect.right - dimensions.width + distance;
};
export function checkElementPosition(trigger, element, grid, distance, defaultSpaces) {
    const triggerRect = trigger.getBoundingClientRect();
    const elementDimensions = {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
    const elementTotalWidth = elementDimensions.width + distance;
    const spaces = defaultSpaces || getMainSpaces(triggerRect, grid.columns, grid.rows, elementTotalWidth);
    const placement = {
        top: calculateVerticalPosition(spaces, triggerRect, elementDimensions),
        left: calculateHorizontalPosition(spaces, triggerRect, elementDimensions, distance),
    };
    return {
        spaces,
        placement,
    };
}
const calculateTopPosition = (triggerRect, flyoutRect, distance) => {
    if (triggerRect.top - parseInt(distance, 10) + flyoutRect.height < window.innerHeight) {
        return { top: triggerRect.top - parseInt(distance, 10), vertical: 'top' };
    }
    else {
        return {
            top: triggerRect.top + triggerRect.height - flyoutRect.height + parseInt(distance, 10),
            vertical: 'bottom',
        };
    }
};
const calculateStaticLeftPosition = (triggerRect, flyoutRect, overlap, spaces) => {
    if (spaces.horizontal === 'right') {
        return {
            left: triggerRect.left - flyoutRect.width + overlap,
            horizontal: 'right',
        };
    }
    if (spaces.horizontal === 'left') {
        return {
            left: triggerRect.right - overlap,
            horizontal: 'left',
        };
    }
};
const calculateDynamicLeftPosition = (triggerRect, flyoutRect, overlap) => {
    const leftSpace = triggerRect.left;
    const rightSpace = document.body.clientWidth - triggerRect.right;
    const isRightSpace = triggerRect.right + flyoutRect.width < document.body.clientWidth;
    if (isRightSpace || leftSpace < rightSpace) {
        const leftPosition = triggerRect.right - overlap;
        return {
            left: leftPosition + flyoutRect.width >= document.body.clientWidth
                ? document.body.clientWidth - flyoutRect.width
                : leftPosition,
            horizontal: 'left',
        };
    }
    else {
        const leftPosition = triggerRect.left - flyoutRect.width + overlap;
        return {
            left: leftPosition <= 0 ? 0 : leftPosition,
            horizontal: 'right',
        };
    }
};
const calculateLeftPosition = (triggerRect, flyoutRect, overlap, spaces) => {
    return spaces
        ? calculateStaticLeftPosition(triggerRect, flyoutRect, overlap, spaces)
        : calculateDynamicLeftPosition(triggerRect, flyoutRect, overlap);
};
export function checkChildElementPosition(trigger, flyout, overlap, defaultSpaces) {
    const triggerRect = trigger.getBoundingClientRect();
    const flyoutRect = flyout.getBoundingClientRect();
    const distance = window.getComputedStyle(flyout).paddingTop;
    const culcedTop = calculateTopPosition(triggerRect, flyoutRect, distance);
    const culcedLeft = calculateLeftPosition(triggerRect, flyoutRect, overlap, defaultSpaces);
    const spaces = {
        vertical: culcedLeft.horizontal,
        horizontal: culcedTop.vertical,
    };
    const placement = {
        top: culcedTop.top,
        left: culcedLeft.left,
    };
    return {
        spaces,
        placement,
    };
}
export function checkParentElementPosition(trigger, element, grid, defaultSpaces) {
    const triggerRect = trigger.getBoundingClientRect();
    const elementDimensions = {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
    const spaces = defaultSpaces || getMainSpaces(triggerRect, grid.columns, grid.rows, elementDimensions.width);
    const placement = {
        top: calculateVerticalPosition(spaces, triggerRect, elementDimensions),
        left: calculateHorizontalPosition(spaces, triggerRect, elementDimensions, 0),
    };
    const distance = window.getComputedStyle(element).paddingTop;
    const parsedDistance = parseInt(distance, 10);
    if (spaces.vertical === 'middle') {
        const flyoutRect = element.getBoundingClientRect();
        const culcedTop = calculateTopPosition(triggerRect, flyoutRect, distance);
        placement.top = culcedTop.top;
        spaces.vertical = spaces.horizontal;
        if (triggerRect.top - parsedDistance === placement.top) {
            spaces.horizontal = 'top';
        }
        else {
            spaces.horizontal = 'bottom';
        }
    }
    if (spaces.horizontal === 'left' && !isNaN(parsedDistance)) {
        placement.left = placement.left - parsedDistance;
    }
    if (spaces.horizontal === 'right' && !isNaN(parsedDistance)) {
        placement.left = placement.left + parsedDistance;
    }
    return {
        spaces,
        placement,
    };
}
export function calucaleTriggerMiddle(triggerSize, arrowSize, minDistance) {
    const triggerMiddle = (triggerSize - arrowSize) / 2;
    const reseted = triggerMiddle >= minDistance ? triggerMiddle : minDistance;
    return setPX(reseted);
}
export function arrowCoordinate(key, triggerEl, arrowSize) {
    const triggerHeight = triggerEl.getBoundingClientRect().height;
    const triggerWidth = triggerEl.getBoundingClientRect().width;
    const actualArrowSize = arrowSize / 1.41;
    const horizontalArrowPosition = calucaleTriggerMiddle(triggerHeight, actualArrowSize, arrowSize / 4);
    const verticalArrowPosition = calucaleTriggerMiddle(triggerWidth, actualArrowSize, arrowSize / 4);
    const arrowList = {
        'left-top': {
            top: horizontalArrowPosition,
            right: false,
            bottom: false,
            left: false,
        },
        'left-bottom': {
            top: false,
            right: false,
            bottom: horizontalArrowPosition,
            left: false,
        },
        'right-bottom': {
            top: false,
            right: false,
            bottom: horizontalArrowPosition,
            left: false,
        },
        'right-top': {
            top: horizontalArrowPosition,
            right: false,
            bottom: false,
            left: false,
        },
        'top-left': {
            top: false,
            right: false,
            bottom: false,
            left: verticalArrowPosition,
        },
        'bottom-left': {
            top: false,
            right: false,
            bottom: false,
            left: verticalArrowPosition,
        },
        'top-right': {
            top: false,
            right: verticalArrowPosition,
            bottom: false,
            left: false,
        },
        'bottom-right': {
            top: false,
            right: verticalArrowPosition,
            bottom: false,
            left: false,
        },
    };
    return arrowList.hasOwnProperty(key)
        ? arrowList[key]
        : {
            top: false,
            right: false,
            bottom: false,
            left: false,
        };
}
