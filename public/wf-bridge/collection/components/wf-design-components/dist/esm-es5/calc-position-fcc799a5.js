import { h as setPX } from './utils-9974937e.js';
var spacesNames = {
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
var defaultVerticalSpace = 'top';
var defaultHorizontalSpace = 'left';
var middleSpace = 'middle';
var getSpaceCode = function (triggerCenter, screenSpace, spacesCount) {
    var spaceNumber = Math.floor(triggerCenter / screenSpace) + 1;
    return spaceNumber + "/" + spacesCount;
};
var isTooltipTooWide = function (triggerPosition, elTotalWidth) {
    return (triggerPosition.left < elTotalWidth && window.innerWidth - triggerPosition.right < elTotalWidth);
};
var getMainSpaces = function (triggerPosition, columns, rows, elTotalWidth) {
    var triggerCenter = {
        vertical: (triggerPosition.top + triggerPosition.bottom) / 2,
        horizontal: (triggerPosition.left + triggerPosition.right) / 2,
    };
    var screenSpace = {
        width: window.innerWidth / columns,
        height: window.innerHeight / rows,
    };
    var mainSpaces = {
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
var calculateVerticalPosition = function (spaces, triggerRect, dimensions) {
    var verticalSpace = spaces.vertical;
    if (verticalSpace === 'top') {
        return triggerRect.bottom;
    }
    if (verticalSpace === 'middle') {
        return triggerRect.bottom - dimensions.height / 2 - triggerRect.height / 2;
    }
    return triggerRect.top - dimensions.height;
};
var calculateHorizontalPosition = function (spaces, rect, dimensions, distance) {
    var horizontalSpace = spaces.horizontal;
    var isVerticalMiddle = spaces.vertical === 'middle';
    if (horizontalSpace === 'left') {
        return isVerticalMiddle ? rect.right : rect.left - distance;
    }
    if (horizontalSpace === 'center') {
        return rect.left + rect.width / 2 - dimensions.width / 2;
    }
    return isVerticalMiddle ? rect.left - dimensions.width : rect.right - dimensions.width + distance;
};
function checkElementPosition(trigger, element, grid, distance, defaultSpaces) {
    var triggerRect = trigger.getBoundingClientRect();
    var elementDimensions = {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
    var elementTotalWidth = elementDimensions.width + distance;
    var spaces = defaultSpaces || getMainSpaces(triggerRect, grid.columns, grid.rows, elementTotalWidth);
    var placement = {
        top: calculateVerticalPosition(spaces, triggerRect, elementDimensions),
        left: calculateHorizontalPosition(spaces, triggerRect, elementDimensions, distance),
    };
    return {
        spaces: spaces,
        placement: placement,
    };
}
var calculateTopPosition = function (triggerRect, flyoutRect, distance) {
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
var calculateStaticLeftPosition = function (triggerRect, flyoutRect, overlap, spaces) {
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
var calculateDynamicLeftPosition = function (triggerRect, flyoutRect, overlap) {
    var leftSpace = triggerRect.left;
    var rightSpace = document.body.clientWidth - triggerRect.right;
    var isRightSpace = triggerRect.right + flyoutRect.width < document.body.clientWidth;
    if (isRightSpace || leftSpace < rightSpace) {
        var leftPosition = triggerRect.right - overlap;
        return {
            left: leftPosition + flyoutRect.width >= document.body.clientWidth
                ? document.body.clientWidth - flyoutRect.width
                : leftPosition,
            horizontal: 'left',
        };
    }
    else {
        var leftPosition = triggerRect.left - flyoutRect.width + overlap;
        return {
            left: leftPosition <= 0 ? 0 : leftPosition,
            horizontal: 'right',
        };
    }
};
var calculateLeftPosition = function (triggerRect, flyoutRect, overlap, spaces) {
    return spaces
        ? calculateStaticLeftPosition(triggerRect, flyoutRect, overlap, spaces)
        : calculateDynamicLeftPosition(triggerRect, flyoutRect, overlap);
};
function checkChildElementPosition(trigger, flyout, overlap, defaultSpaces) {
    var triggerRect = trigger.getBoundingClientRect();
    var flyoutRect = flyout.getBoundingClientRect();
    var distance = window.getComputedStyle(flyout).paddingTop;
    var culcedTop = calculateTopPosition(triggerRect, flyoutRect, distance);
    var culcedLeft = calculateLeftPosition(triggerRect, flyoutRect, overlap, defaultSpaces);
    var spaces = {
        vertical: culcedLeft.horizontal,
        horizontal: culcedTop.vertical,
    };
    var placement = {
        top: culcedTop.top,
        left: culcedLeft.left,
    };
    return {
        spaces: spaces,
        placement: placement,
    };
}
function checkParentElementPosition(trigger, element, grid, defaultSpaces) {
    var triggerRect = trigger.getBoundingClientRect();
    var elementDimensions = {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
    var spaces = defaultSpaces || getMainSpaces(triggerRect, grid.columns, grid.rows, elementDimensions.width);
    var placement = {
        top: calculateVerticalPosition(spaces, triggerRect, elementDimensions),
        left: calculateHorizontalPosition(spaces, triggerRect, elementDimensions, 0),
    };
    var distance = window.getComputedStyle(element).paddingTop;
    var parsedDistance = parseInt(distance, 10);
    if (spaces.vertical === 'middle') {
        var flyoutRect = element.getBoundingClientRect();
        var culcedTop = calculateTopPosition(triggerRect, flyoutRect, distance);
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
        spaces: spaces,
        placement: placement,
    };
}
function calucaleTriggerMiddle(triggerSize, arrowSize, minDistance) {
    var triggerMiddle = (triggerSize - arrowSize) / 2;
    var reseted = triggerMiddle >= minDistance ? triggerMiddle : minDistance;
    return setPX(reseted);
}
function arrowCoordinate(key, triggerEl, arrowSize) {
    var triggerHeight = triggerEl.getBoundingClientRect().height;
    var triggerWidth = triggerEl.getBoundingClientRect().width;
    var actualArrowSize = arrowSize / 1.41;
    var horizontalArrowPosition = calucaleTriggerMiddle(triggerHeight, actualArrowSize, arrowSize / 4);
    var verticalArrowPosition = calucaleTriggerMiddle(triggerWidth, actualArrowSize, arrowSize / 4);
    var arrowList = {
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
export { arrowCoordinate as a, checkChildElementPosition as b, checkParentElementPosition as c, checkElementPosition as d };
