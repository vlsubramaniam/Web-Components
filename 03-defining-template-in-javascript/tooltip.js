class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Default tooltip text';
    this.attachShadow({ mode: 'open' });
    const template = document.querySelector('#tooltip-template');
    this.shadowRoot.innerHTML = `<style> 
                                    div {
                                      background-color: black;
                                      color: blue;
                                      position: absolute;
                                      z-index: 10;
                                    }
                                  </style>
                                  <slot> Some default </slot>
                                  <span> (?) </span>`;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    const tooltipIcon = this.shadowRoot.querySelector('span');
    // tooltipIcon.textContent = '(*)';
    this.shadowRoot.appendChild(tooltipIcon);
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.style.position = 'relative';
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);
