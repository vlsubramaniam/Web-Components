import { Component, h } from "@stencil/core";

@Component({
  tag: "stock-finder",
  styleUrl: "./stock-finder.css",
  shadow: true,
})
export class StockFinder {
  render() {
    return [<input type="text" />];
  }
}
