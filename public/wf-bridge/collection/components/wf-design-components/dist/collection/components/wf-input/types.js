import IMask from 'imask';
export const BASIC_TYPES = [
    'color',
    'email',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url',
];
export const MapMaskTypes = {
    enum: IMask.MaskedEnum,
    range: IMask.MaskedRange,
};
export const MASKED_TYPE = 'masked';
export class ShadowHTMLMaskElement extends IMask.HTMLMaskElement {
    get isActive() {
        let active = document.activeElement;
        while (active && active.shadowRoot && active.shadowRoot.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return this.input === active;
    }
}
