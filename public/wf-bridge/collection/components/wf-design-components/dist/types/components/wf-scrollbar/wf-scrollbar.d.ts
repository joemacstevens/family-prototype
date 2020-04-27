import { ScrollType } from './types';
export declare class WfScrollbar {
    host: HTMLElement;
    /** Define scrollbar type. */
    type: ScrollType;
    /** Define attribute name that will be added to scroll parent. */
    parentAttr: string;
    /** Define static height of scrolling content. If set, content height won't be recalculated. */
    staticHeight: string;
    /** Scrolling content calculated height */
    contentHeight: string;
    private addIntersectionObserver;
    private addResizeObserver;
    private addMutationObserver;
    getDirectChildrenHeight(parent: HTMLElement): number;
    getParentByAttr(element: HTMLElement, attributeName: string): HTMLElement;
    private getAvailableHeight;
    private readonly setContentHeight;
    componentDidLoad(): void;
    render(): any;
}
