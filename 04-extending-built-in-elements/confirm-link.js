class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Do you want to navigate to the link?')) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('uc-confirm-link', ConfirmLink, {
  extends: 'a',
});
