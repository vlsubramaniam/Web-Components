class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
                      <style>
                          #backdrop {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100vh;
                            background: rgba(0,0,0,0.75);
                            z-index: 10;
                            opacity: 0;
                            pointer-events: none;
                          }

                          :host([opened]) #backdrop {
                            opacity: 1;
                            pointer-events: all;
                          }

                          :host([opened]) #modal {
                            opacity: 1;
                            pointer-events: all;
                          }

                          #modal {
                            position: fixed;
                            top: 15vh;
                            left: 25%;
                            width: 50%;
                            z-index: 100;
                            background: #fff;
                            border-radius: 3px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            opacity: 0;
                            pointer-events: none;
                          }

                          header {
                            padding: 1rem;
                          }

                          ::slotted(h1), header h1 {
                            font-size: 1.2rem;
                          }                         

                         #main {
                            padding: 1rem;
                          }

                          #actions {
                            border-top: 1px solid #ccc;
                            padding: 1rem;
                            display: flex;
                            justify-content: flex-end;
                          }

                          #actions button {
                            margin: 0.25rem;
                          }

                      </style>

                      <div id="backdrop">
                      </div>
                      <div id="modal">
                          <header>
                            <slot class="title" name="title"> <h1> Please Confirm </h1> </slot> 
                          </header>
                          <section id="main">
                            <slot></slot>
                          </section>
                          <section id="actions">
                            <button id="btn-cancel">Cancel</button>
                            <button id="btn-ok">Ok</button>
                          </section>
                      </div>
    `;
    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', (event) => {
      console.dir(slots[1].assignedNodes());
    });

    const cancelButton = this.shadowRoot.getElementById('btn-cancel');
    const confirmButton = this.shadowRoot.getElementById('btn-ok');

    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
  }

  connectedCallback() {
    if (this.hasAttribute('confirmText')) {
      const button = this.shadowRoot.getElementById('btn-ok');
      button.innerText = this.getAttribute('confirmText');
    }
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === 'opened') {
  //     if (this.hasAttribute('opened')) {
  //       this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
  //       this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
  //       this.shadowRoot.querySelector('#modal').style.opacity = 1;
  //       this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
  //     }
  //   }
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute('opened')) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  static get observedAttributes() {
    return ['opened'];
  }

  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }

  hide() {
    this.removeAttribute('opened');
    this.isOpen = false;
  }

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.hide();
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }
}

window.customElements.define('uc-modal', Modal);
