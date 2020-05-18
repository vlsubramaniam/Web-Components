import { Component, h, Prop, State, Method } from "@stencil/core";

@Component({
  tag: "side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true,
})
export class SideDrawer {
  @Prop({ reflectToAttr: true }) title: string;
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;
  @State() showContactInfo = false;

  onCloseDrawer(): void {
    this.opened = false;
  }

  @Method()
  open(): void {
    this.opened = true;
  }

  onTabChanged(content: string): void {
    if (content === "contact") {
      this.showContactInfo = true;
    } else {
      this.showContactInfo = false;
    }
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>Reach me @9941141000</p>
        </div>
      );
    }

    return [
      <div id="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section class="tabs">
          <button
            class={!this.showContactInfo ? "active" : ""}
            onClick={this.onTabChanged.bind(this, "nav")}
          >
            Navigation
          </button>
          <button
            class={this.showContactInfo ? "active" : ""}
            onClick={this.onTabChanged.bind(this, "contact")}
          >
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>,
    ];
  }
}
