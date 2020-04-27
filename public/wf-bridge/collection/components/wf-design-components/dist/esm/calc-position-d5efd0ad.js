import { f as setPX } from './utils-c58b1fe2.js';

const spacesNames = {
    vertical: {
        '1/1': 'top',
        '1/2': 'top',
        '2/2': 'bottom',
        '1/3': 'top',
        '2/3': 'middle',
        '3/3': 'bottom',
        '1/4': 'top',
        '2/4': 'top',
        '3/4': 'bottom',
        '4/4': 'bottom',
    },
    horizontal: {
        '1/1': 'left',
        '1/2': 'left',
        '2/2': 'right',
        '1/3': 'left',
        '2/3': 'center',
        '3/3': 'right',
        '1/4': 'left',
        '2/4': 'left',
        '3/4': 'right',
        '4/4': 'right',
    },
};

const defaultVerticalSpace = 'top';
const defaultHorizontalSpace = 'left';
const middleSpace = 'middle';
const arrowHalfHeight = 6;
const getSpaceCode = (triggerCenter, screenSpace, spacesCount) => {
    const spaceNumber = Math.floor(triggerCenter / screenSpace) + 1;
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
function checkElementPosition(trigger, element, grid, distance, defaultSpaces) {
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
function checkChildElementPosition(trigger, flyout, overlap, defaultSpaces) {
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
function checkParentElementPosition(trigger, element, grid, defaultSpaces) {
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
    if (spaces.vertical === 'middle') {
        const flyoutRect = element.getBoundingClientRect();
        const distance = window.getComputedStyle(element).paddingTop;
        const culcedTop = calculateTopPosition(triggerRect, flyoutRect, distance);
        placement.top = culcedTop.top;
        spaces.vertical = spaces.horizontal;
        if (triggerRect.top - parseInt(distance, 10) === placement.top) {
            spaces.horizontal = 'top';
        }
        else {
            spaces.horizontal = 'bottom';
        }
    }
    return {
        spaces,
        placement,
    };
}
function arrowCoordinate(key, triggerEl) {
    const triggerMiddle = triggerEl.getBoundingClientRect().height / 2 - arrowHalfHeight;
    const arrowList = {
        'left-top': {
            top: setPX(triggerMiddle),
            right: false,
            bottom: false,
            left: false,
        },
        'left-bottom': {
            top: false,
            right: false,
            bottom: setPX(triggerMiddle),
            left: false,
        },
        'right-bottom': {
            top: false,
            right: false,
            bottom: setPX(triggerMiddle),
            left: false,
        },
        'right-top': {
            top: setPX(triggerMiddle),
            right: false,
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

export { arrowCoordinate as a, checkChildElementPosition as b, checkParentElementPosition as c, checkElementPosition as d };
