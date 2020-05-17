class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.innerHTML = `
                      <style>
                          #backdrop {
                            postion: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100vh;
                            background: rgba(0,0,0,0.75)
                          }
                      </style>
                      <div id="backdrop">
                      </div>
                      <div id="modal">
                      </div>
    `;
  }
}

window.customElements.define('uc-modal', Modal);
