class TodoItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("toDoItem").content.cloneNode(true)
    );

    this.$item = this._shadowRoot.querySelector(".item");
    this.$removeButton = this._shadowRoot.querySelector("button");
    this.$text = this._shadowRoot.querySelector("label");
    this.$checkbox = this._shadowRoot.querySelector("input");

    this.$removeButton.addEventListener("click", (e) => {
      this.dispatchEvent(new CustomEvent("onRemove", { detail: this.index }));
    });

    this.$checkbox.addEventListener("click", (e) => {
      this.dispatchEvent(new CustomEvent("onToggle", { detail: this.index }));
    });
  }

  connectedCallback() {
    // We set a default attribute here; if our end user hasn't provided one,
    // our element will display a "placeholder" text instead.
    if (!this.hasAttribute("text")) {
      this.setAttribute("text", "placeholder");
    }

    this._renderTodoItem();
  }

  static get observedAttributes() {
    return ["text", "checked", "index"];
  }

  _renderTodoItem() {
    if (this.hasAttribute("checked")) {
      this.$item.classList.add("completed");
      this.$checkbox.setAttribute("checked", "");
    } else {
      this.$item.classList.remove("completed");
      this.$checkbox.removeAttribute("checked");
    }

    this.$text.innerHTML = this._text;
  }

  get checked() {
    return this.hasAttribute("checked");
  }

  set checked(newVal) {
    if (newVal) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  get index() {
    return this._index;
  }

  set index(newVal) {
    this.setAttribute("index", newVal);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "text":
        this._text = newValue;
        break;
      case "checked":
        this._checked = this.hasAttribute("checked");
        break;
      case "index":
        this._index = parseInt(newValue);
        break;
    }
  }
}
window.customElements.define("to-do-item", TodoItem);
