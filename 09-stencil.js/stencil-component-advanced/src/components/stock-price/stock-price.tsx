import {
  Component,
  h,
  State,
  Element,
  Prop,
  Watch,
  Listen,
} from "@stencil/core";
import { AV_API_KEY } from "../../shared/global";

@Component({
  tag: "stock-price",
  styleUrl: "./stock-price.css",
  shadow: true,
})
export class StockPrice {
  @Element() el: HTMLElement;
  stockInput: HTMLInputElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() isValidInput = false;
  @State() errMessage: string;
  @State() loading = false;

  @Prop({ mutable: true, reflectToAttr: true }) stockSymbol: string;
  @Watch("stockSymbol")
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.isValidInput = true;
      this.fetchStockPrice(newValue);
    }
  }

  hostData() {
    return { class: this.errMessage ? "error" : "" };
  }

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
    // const stockSymbol = this.stockInput.value;
    this.stockSymbol = this.stockInput.value;
    // this.fetchStockPrice(stockSymbol);
  }

  fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`
    )
      .then((res) => {
        if (res.status !== 200) {
          this.loading = false;
          throw new Error("Invalid Response!!!");
        }
        return res.json();
      })
      .then((data) => {
        if (!data["Global Quote"]) {
          throw new Error("Invalid Symbol!!!");
        }
        this.fetchedPrice = +data["Global Quote"]["05. price"];
        this.loading = false;
      })
      .catch((err) => {
        this.errMessage = err;
        this.fetchedPrice = null;
        this.loading = false;
      });
  }

  componentWillLoad(): void {
    console.log("componentWillLoad");
  }

  componentDidLoad(): void {
    console.log("componentDidLoad");
    if (this.stockSymbol) {
      this.stockUserInput = this.stockSymbol;
      this.isValidInput = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate(): void {
    console.log("componentWillUpdate");
    if (this.stockSymbol) {
    }
  }

  componentDidUpdate(): void {
    console.log("componentDidUpdate");
  }

  componentDidUnload(): void {
    console.log("componentDidUnload");
  }

  @Listen("symbolSelected", { target: "body" })
  onStockSymbolSelected(e: CustomEvent): void {
    if (e.detail && e.detail !== this.stockSymbol) {
      console.log(e.detail);
      this.stockSymbol = e.detail;
    }
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.errMessage) {
      dataContent = <p>{this.errMessage}</p>;
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice ? this.fetchedPrice : 0}</p>;
    }
    if (this.loading) {
      dataContent = <uc-spinner />;
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
