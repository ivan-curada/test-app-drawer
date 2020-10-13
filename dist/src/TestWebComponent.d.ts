import { LitElement } from 'lit-element';
export declare class TestWebComponent extends LitElement {
    static styles: import("lit-element").CSSResult;
    apps: any[];
    show_apps: boolean;
    is_loading: boolean;
    is_overflow: boolean;
    constructor();
    onUserClick: (e: MouseEvent) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    toggleApps: () => void;
    getDrawerBtnElement: () => HTMLElement | null | undefined;
    getAppsContainerElement: () => HTMLElement | any;
    alignElement: () => void;
    getPosition: () => {
        x: number;
        y: number;
    };
    render(): import("lit-element").TemplateResult;
}
