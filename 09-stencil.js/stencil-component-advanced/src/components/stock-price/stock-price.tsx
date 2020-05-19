import { Component, h, State, Element } from "@stencil/core";
import { AV_API_KEY } from "../../shared/global";

@Component({
  tag: "stock-price",
  styleUrl: "./stock-price.css",
  shadow: true,
})
export class StockPrice {
  @State() fetchedPrice: number;
  @Element() el: HTMLElement;
  stockInput: HTMLInputElement;
  @State() stockUserInput: string;
  @State() isValidInput = false;
  @State() errMessage: string;

  onUserInut(e: Event): void {
    this.stockUserInput = (e.target as HTMLInputElement).value;
    this.fetchedPrice = null;
    if (this.stockUserInput.trim()) {
      this.isValidInput = true;
    } else {
      this.isValidInput = false;
    }
  }

  onFetchStockPrice(e: Event): void {
    e.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector(
    //   "#stock-symbol"
    // ) as HTMLInputElement).value;
    const stockSymbol = this.stockInput.value;
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Invalid Response!!!");
        }
        return res.json();
      })
      .then((data) => {
        if (!data["Global Quote"]) {
          throw new Error("Invalid Symbol!!!");
        }
        this.fetchedPrice = +data["Global Quote"]["05. price"];
      })
      .catch((err) => (this.errMessage = err));
  }
  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.errMessage) {
      dataContent = <p>{this.errMessage}</p>;
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice ? this.fetchedPrice : 0}</p>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id="stock-symbol"
          type="text"
          ref={(el) => (this.stockInput = el)}
          value={this.stockUserInput}
          onInput={this.onUserInut.bind(this)}
        />
        <button type="submit" disabled={!this.isValidInput}>
          Fetch
        </button>
      </form>,
      <div>{dataContent}</div>,
    ];
  }
}
