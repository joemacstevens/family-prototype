export class NumericStrategy {
    generateValue({ value }) {
        return Number(value);
    }
    swipeUp(object) {
        object.value = Number(object.value) + 1;
    }
    swipeDown(object) {
        object.value = Number(object.value) - 1;
    }
    validateValue(value) {
        if (isNaN(Number(value))) {
            throw new Error('Value is not valid');
        }
    }
}
export class OptionsStrategy {
    constructor(getValueFn) {
        this.getValueFn = getValueFn;
    }
    generateValue({ parsedOptions, selectedIndex }) {
        const selectedOption = parsedOptions[selectedIndex];
        return typeof selectedOption === 'object'
            ? this.getValueFn(selectedOption)
            : selectedOption.toString();
    }
    swipeUp(object) {
        object.selectedIndex = object.selectedIndex + 1;
    }
    swipeDown(object) {
        object.selectedIndex = object.selectedIndex - 1;
    }
    validateValue(value, object) {
        const index = Array.isArray(object.options) && typeof object.options[0] === 'object'
            ? object.options.findIndex((valueObj) => this.getValueFn(valueObj) === value)
            : object.options.indexOf(value);
        if (index === -1) {
            throw new Error('Value is not valid');
        }
        else {
            object.selectedIndex = index;
        }
    }
}
