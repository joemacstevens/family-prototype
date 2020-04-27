export const renderIntoTwoLines = (params) => {
    let retVal = null;
    const value = params.getValue();
    if (value) {
        const container = document.createElement('div');
        const firstLineContainer = document.createElement('div');
        const secondLineContainer = document.createElement('div');
        const [firstLine, secondLine] = value;
        firstLineContainer.innerText = firstLine;
        secondLineContainer.innerText = secondLine;
        container.appendChild(firstLineContainer);
        container.appendChild(secondLineContainer);
        if (params.align) {
            container.classList.add(`align-${params.align}`);
            container.classList.add('align-column');
        }
        retVal = container;
    }
    return retVal;
};
export const renderBoldText = (params) => {
    let retVal = null;
    const value = params.getValue();
    if (value) {
        const container = document.createElement('div');
        container.innerText = value;
        container.style.fontWeight = 'bold';
        retVal = container;
    }
    return retVal;
};
export const renderFormattedNumber = (params, minimumFractionDigits = 2, maximumFractionDigits = 2) => {
    let retVal = null;
    const value = params.getValue();
    if (value || value === 0) {
        const container = document.createElement('div');
        container.classList.add('align-right');
        let formattedNumber = null;
        if (typeof value === 'number') {
            formattedNumber = value.toLocaleString('en-US', {
                style: 'decimal',
                minimumFractionDigits,
                maximumFractionDigits,
            });
        }
        else {
            formattedNumber = value;
        }
        container.innerText = formattedNumber;
        retVal = container;
    }
    return retVal;
};
export const renderPositiveNegativeColors = (params) => {
    let retVal = null;
    const value = params.getValue();
    if (value || value === 0) {
        retVal = renderFormattedNumber(params);
        const arrow = document.createElement('span');
        let arrowDirection = '';
        let className = '';
        if (value < 0) {
            className = 'negative-value';
            arrowDirection = '⏷';
        }
        else if (value > 0) {
            className = 'positive-value';
            arrowDirection = '⏶';
        }
        else {
            className = 'neutral-value';
        }
        arrow.innerText = arrowDirection;
        if (!params.withoutArrow) {
            retVal.appendChild(arrow);
        }
        retVal.classList.add(className);
    }
    return retVal;
};
export const renderCurrency = (params) => {
    let retVal = null;
    const value = params.getValue();
    const currency = params.currencySymbol || '$';
    const valueType = typeof value;
    if (value || value === 0) {
        retVal = renderFormattedNumber(params);
        if (valueType === 'number') {
            const currencyValue = document.createElement('span');
            currencyValue.innerHTML = currency;
            //not supported for IE11
            retVal.prepend ? retVal.prepend(currencyValue) : retVal.insertBefore(currencyValue, null);
            retVal.classList.add('cell-currency');
        }
    }
    return retVal;
};
export const renderNumberWithSymbol = (params) => {
    let retVal = null;
    const value = params.getValue();
    const suffix = params.suffixSymbol || '%';
    const valueType = typeof value;
    if (value || value === 0) {
        retVal = renderFormattedNumber(params);
        if (valueType === 'number') {
            const suffixValue = document.createElement('span');
            suffixValue.innerHTML = suffix;
            retVal.appendChild(suffixValue);
            retVal.classList.add('cell-suffix');
        }
    }
    return retVal;
};
