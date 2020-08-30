"use strict";
const storageKey = "toDoList";
const data = localStorage.getItem(storageKey);

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("toDoApp").content.cloneNode(true)
    );
    this.$todoList = this._shadowRoot.querySelector("ul");
    this.$input = this._shadowRoot.querySelector("input");

    this.$form = this._shadowRoot.querySelector("form");
    console.log(this);
    this.$form.addEventListener("submit", this._addTodo.bind(this));
    this._todos = data ? JSON.parse(data) : [];
  }

  _renderTodoList() {
    this.$todoList.innerHTML = "";

    this._todos.forEach((todo, index) => {
      let $todoItem = document.createElement("to-do-item");
      $todoItem.setAttribute("text", todo.text);

      if (todo.checked) {
        $todoItem.setAttribute("checked", "");
      }

      $todoItem.setAttribute("index", index);

      $todoItem.addEventListener("onRemove", this._removeTodo.bind(this));

      $todoItem.addEventListener("onToggle", this._toggleTodo.bind(this));

      this.$todoList.appendChild($todoItem);
    });
  }

  _addTodo() {
    if (this.$input.value.length > 0) {
      const todo = { text: this.$input.value, checked: false };
      this._todos.push(todo);
      localStorage.setItem(storageKey, JSON.stringify(this._todos));
      this._renderTodoList();
      this.$input.value = "";
    }
  }

  _removeTodo(e) {
    this._todos.splice(e.detail, 1);
    localStorage.setItem(storageKey, JSON.stringify(this._todos));
    this._renderTodoList();
  }

  _toggleTodo(e) {
    const todo = this._todos[e.detail];
    this._todos[e.detail] = Object.assign({}, todo, {
      checked: !todo.checked,
    });
    localStorage.setItem(storageKey, JSON.stringify(this._todos));
    this._renderTodoList();
  }

  set todos(value) {
    this._todos.concat(value);
    this._renderTodoList();
  }

  get todos() {
    return this._todos;
  }

  connectedCallback() {
    this._renderTodoList();
  }
}

customElements.define("to-do-app", TodoApp);

// document.querySelector("to-do-app").todos = [
//   { text: "Make a to-do list", checked: false },
//   { text: "Finish blog post", checked: false },
// ];

// document.querySelector("to-do-app").todos = [
//   { text: "Hither", checked: false },
//   { text: "Finish", checked: false },
// ];
