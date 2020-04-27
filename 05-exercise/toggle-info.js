class ToggleInfo extends HTMLElement {
  constructor() {
    super();
    this._showInfo = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `   
            <style>
            #info-box {
                display: none;
              }

              button {
                font-size:14pt;
                border: 1px solid black;
                outline: none;
                border-radius: 15px;
                width: 200px;
                height: 50px;
              }
            </style>   

            <button> Show Info </button> 
            <p id="info-box">
              <slot></slot>
            </p>  
    `;
    this._toggleButton = this.shadowRoot.querySelector('button');
    this._toggleInfoBox = this.shadowRoot.querySelector('#info-box');
    this._toggleButton.addEventListener('click', this._toggleInfo.bind(this));
  }

  _toggleInfo() {
    this._showInfo = !this._showInfo;
    this._toggleButton.textContent = !this._showInfo
      ? 'Show Info'
      : 'Hide Info';
    this._toggleInfoBox.style.display = !this._showInfo ? 'none' : 'block';
  }

  connectedCallback() {
    if (this.hasAttribute('show-info')) {
      if (this.getAttribute('show-info') === 'true') {
        this._showInfo = true;
        this._toggleButton.textContent = !this._showInfo
          ? 'Show Info'
          : 'Hide Info';
        this._toggleInfoBox.style.display = !this._showInfo ? 'none' : 'block';
      }
    }
  }
}

customElements.define('uc-toggle-info', ToggleInfo);
