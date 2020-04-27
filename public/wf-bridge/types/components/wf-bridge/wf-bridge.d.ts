import "../wf-design-components/dist/collection/assets/js/runtime-mocks.js";
import "../wf-design-components/dist/collection/assets/js/register-aliases.js";
import "../wf-design-components/dist/collection/skins/ubs/scripts.js";
declare global {
    interface Window {
        config: any;
    }
}
export declare class WFBridge {
    host: HTMLElement;
    theme: string;
    componentWillLoad(): void;
    componentDidRender(): void;
    render(): any;
}
