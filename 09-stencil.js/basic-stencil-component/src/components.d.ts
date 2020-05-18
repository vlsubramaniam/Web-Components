/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SideDrawer {
        "open": () => Promise<void>;
        "opened": boolean;
        "title": string;
    }
    interface ToolTip {
        "displayTooltip": () => Promise<void>;
        "tooltipText": string;
    }
}
declare global {
    interface HTMLSideDrawerElement extends Components.SideDrawer, HTMLStencilElement {
    }
    var HTMLSideDrawerElement: {
        prototype: HTMLSideDrawerElement;
        new (): HTMLSideDrawerElement;
    };
    interface HTMLToolTipElement extends Components.ToolTip, HTMLStencilElement {
    }
    var HTMLToolTipElement: {
        prototype: HTMLToolTipElement;
        new (): HTMLToolTipElement;
    };
    interface HTMLElementTagNameMap {
        "side-drawer": HTMLSideDrawerElement;
        "tool-tip": HTMLToolTipElement;
    }
}
declare namespace LocalJSX {
    interface SideDrawer {
        "opened"?: boolean;
        "title"?: string;
    }
    interface ToolTip {
        "tooltipText"?: string;
    }
    interface IntrinsicElements {
        "side-drawer": SideDrawer;
        "tool-tip": ToolTip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "side-drawer": LocalJSX.SideDrawer & JSXBase.HTMLAttributes<HTMLSideDrawerElement>;
            "tool-tip": LocalJSX.ToolTip & JSXBase.HTMLAttributes<HTMLToolTipElement>;
        }
    }
}
