# Huntsman (finalized name tbd)

Highlights all elements in the DOM that match a given search query.

The input must be a valid [CSS Selector String](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

## Examples

* `h1`: highlight all h1's
* `.myClass`: highlight all elements with this class
* `#myId`: highlight the element with this id
* `[disabled]`: highlight all disabled elements
* `[data-qa="deleteBtn"]`: highlight all elements with a `data-qa` attribute with the value `"deleteBtn"`

Any of these can also be combined into a CSV like so:

* `h1,h2,h3,h4,h5,h6`: highlight all headers
* `div, #id, .class, [attr]`: you get the idea
