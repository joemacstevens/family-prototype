import { EventOptions } from '@stencil/core/dist/declarations';
interface PrefixEventOption extends EventOptions {
    prefix?: string;
}
export declare const addPrefix: (str: any, prefix: any) => any;
export declare function customEventEmitter(host: HTMLElement, event: string, opts?: PrefixEventOption): {
    emit(detail?: any): void;
};
export declare function PrefixEvent(opts?: PrefixEventOption): PropertyDecorator;
export {};
