// IMPORTANT
// Quill is built with ES6 classes and is transpiled with Babel. In order to extend a class
// a Quill's class, we have to write the code using ES6 and transpile it down to ES5

// To edit the block, you should modify this file, and transpile it on Babel's website:
// https://babeljs.io/repl/
// Once this is done, copy the output to the file with the same name, but ending with the
// extension ".js", between the two "eslint-disable" and "eslint-enable" comments

var Embed = Quill.import('blots/block/embed');

class HtmlBlot extends Embed {
  /**
   * Creates an instance of HtmlBlot.
   *
   * @param {HTMLElement} domNode
   * @param {String} rawContent
   * @memberOf HtmlBlot
   */
  constructor (domNode, rawContent) {
    super(domNode);

    this.editor = window.editor;
    this.content = domNode.querySelector('.js-raw-html-content');
    this.content.setAttribute('contenteditable', false);
    this.content.innerHTML = rawContent;

    if (!this.editor.options.readOnly) {
      // We make the caption editable
      this._renderToolbar();
    }
  }

  /**
   * Create the DOM node
   * @returns {HTMLElement} node
   */
  static create () {
    const node = super.create();
    const container = document.createElement('div');

    container.classList.add('js-raw-html-content');
    node.appendChild(container);

    return node;
  }

  /**
   * Return the attributes attached to the node
   * @static
   * @param {HTMLElement} node
   * @returns {any}
   * @memberOf HtmlBlot
   */
  static formats(node) {
    const res = {};

    const content = node.querySelector('.js-raw-html-content');
    if (content && content.innerHTML) {
      res.content = content.innerHTML;
    }

    return res;
  }

  /**
   * Set an attribute of the node
   * @param {string} name - attribute name
   * @param {any} value
   * @memberOf HtmlBlot
   */
  format(name, value) {
    if (name === 'content') {
      if (value) {
        this.content.innerHTML = value;
      } else {
        this.content.parentElement.removeChild(this.caption);
      }
    } else {
      super.format(name, value);
    }
  }

  /**
   * Event handler called when the user clicks the remove button
   * @memberOf HtmlBlot
   */
  _onClickRemove() {
    const offset = this.offset();
    this.editor.deleteText(offset, this.length());
    this.editor.setSelection(offset);
  }

  /**
   * Event handler called when the user clicks the change image button
   * @memberOf HtmlBlot
   */
  _onClickChange() {
    const offset = this.offset();
    this.editor.setSelection(offset);
    this.editor.emitter.emit('HTML_BLOT_EDIT', { content: this.content.innerHTML, blot: this });
  }

  /**
   * Event handler called when the mouse is over an image
   * @memberOf ImageBlot
   */
  _onMouseoverImage() {
    this._showToolbar();
  }

  /**
   * Event handler called when the mouse leaves the image toolbar
   * @param {object} e - event object
   * @memberOf ImageBlot
   */
  _onMouseoutToolbar(e) {
    if (e.relatedTarget !== this.image && !$(e.relatedTarget).closest(this.toolbar).length) {
      this._hideToolbar();
    }
  }

  /**
   * Hide the image toolbar
   * @memberOf ImageBlot
   */
  _hideToolbar() {
    this.toolbar.classList.add('-hidden');
  }

  /**
   * Show the image toolbar
   * @memberOf ImageBlot
   */
  _showToolbar() {
    this.toolbar.classList.remove('-hidden');
  }

  /**
   * Render the toolbar
   * @memberOf HtmlBlot
   */
  _renderToolbar() {
    // We create the element with the default state
    this.toolbar = document.createElement('div');
    this.domNode.appendChild(this.toolbar);
    this.toolbar.classList.add('toolbar');

    // We append its content
    this.toolbar.innerHTML = HandlebarsTemplates['management/wysiwyg-block-toolbar']({
      hideChangeBtn: false,
      showSizeBtn: false
    });

    // We attach the event listeners
    this.toolbar.querySelector('.js-remove').addEventListener('click', () => this._onClickRemove());
    this.toolbar.querySelector('.js-change').addEventListener('click', () => this._onClickChange());
    this.domNode.addEventListener('mouseover',() => this._onMouseoverImage());
    this.domNode.addEventListener('mouseout', e => this._onMouseoutToolbar(e));
  }
}
