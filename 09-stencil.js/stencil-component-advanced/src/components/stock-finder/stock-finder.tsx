import { Component, h, State, Event, EventEmitter } from "@stencil/core";
import { AV_API_KEY } from "../../shared/global";

@Component({
  tag: "stock-finder",
  styleUrl: "./stock-finder.css",
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string; name: string }[] = [];
  @State() loading = false;
  @Event({ bubbles: true, composed: true }) symbolSelected: EventEmitter<
    String
  >;

  onFindStocks(event: Event) {
    this.loading = true;
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`
    )
      .then((res) => res.json())
      .then((parsedRes) => {
        this.searchResults = parsedRes["bestMatches"].map((match) => {
          this.loading = false;
          return { name: match["2. name"], symbol: match["1. symbol"] };
        });
        // console.log(this.searchResults);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  onSelectSymbol(symbol: string): void {
    this.symbolSelected.emit(symbol);
  }

  render() {
    let content = (
      <ul>
        {this.searchResults.map((result) => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong> - {result.name}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      content = <uc-spinner />;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input id="stock-symbol" ref={(el) => (this.stockNameInput = el)} />
        <button type="submit">Find!</button>
      </form>,
      content,
    ];
  }
}
