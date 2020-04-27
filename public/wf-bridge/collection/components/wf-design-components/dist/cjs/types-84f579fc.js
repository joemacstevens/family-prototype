'use strict';

(function (KeyCodes) {
    KeyCodes[KeyCodes["TAB_KEY"] = 9] = "TAB_KEY";
    KeyCodes[KeyCodes["ENTER_KEY"] = 13] = "ENTER_KEY";
    KeyCodes[KeyCodes["ESC_KEY"] = 27] = "ESC_KEY";
    KeyCodes[KeyCodes["ARROW_DOWN"] = 40] = "ARROW_DOWN";
    KeyCodes[KeyCodes["ARROW_UP"] = 38] = "ARROW_UP";
})(exports.KeyCodes || (exports.KeyCodes = {}));
(function (KeyValue) {
    KeyValue["TAB_KEY"] = "Tab";
    KeyValue["ENTER_KEY"] = "Enter";
    KeyValue["ESC_KEY"] = "Escape";
    KeyValue["ARROW_DOWN"] = "ArrowDown";
    KeyValue["ARROW_UP"] = "ArrowUp";
    KeyValue["ARROW_RIGHT"] = "ArrowRight";
    KeyValue["ARROW_LEFT"] = "ArrowLeft";
})(exports.KeyValue || (exports.KeyValue = {}));
(function (DropdownTriggerType) {
    DropdownTriggerType["TOGGLE"] = "toggle";
    DropdownTriggerType["OPEN_ONLY"] = "open_only";
    DropdownTriggerType["OPEN_ONLY_WITH_ICON"] = "open_only_icon";
})(exports.DropdownTriggerType || (exports.DropdownTriggerType = {}));
