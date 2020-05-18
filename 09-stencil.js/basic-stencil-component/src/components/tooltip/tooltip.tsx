import { Component, h, Prop, Method, State } from "@stencil/core";

@Component({
  tag: "tool-tip",
  styleUrl: "./tooltip.css",
  shadow: true,
})
export class Tooltip {
  @Prop({ attribute: "tooltipText" }) tooltipText: string;
  @State() showTooltip = false;
  render() {
    return (
      <div id="tooltip">
        <slot /> &nbsp;
        <span id="tooltip-icon" onClick={this.displayTooltip.bind(this)}>
          ?
        </span>
        <div id="tooltip-text" class={this.showTooltip ? "showTooltip" : ""}>
          {this.showTooltip ? this.tooltipText : null}
        </div>
      </div>
    );
  }

  @Method()
  displayTooltip(): void {
    this.showTooltip = !this.showTooltip;
  }
}
