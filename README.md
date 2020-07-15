# Huntsman

_Search any webpage for DOM elements, tags, attributes, or other search queries._

Huntsman will highlight all the elements on the page that match your query.

## Setup

1. Download the repo as .zip, unzip it
1. In Chrome, open Extensions: chrome://extensions/
1. Enable Developer Mode in the upper right of the window
1. Click the “Load Unpacked” button in the upper left
1. Select your unzipped Huntsman directory
1. It should add a crosshair icon to Chrome!

## Usage

1. Click the crosshair icon in your Chrome extensions bar to open Huntsman.
1. Enter a search query, which must be a valid [CSS Selector String](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).
1. Click "Search", it will highlight all the elements on the page that match your query!

![Huntsman output](./readme-screenshot-1.png)

NOTE: currently the highlights do not scroll with the page. To repaint, close the Huntsman overlay (either by clicking the crosshair icon or by clicking anywhere else on the page), and open Huntsman again.

## Examples

* `h1`: highlight all h1's
* `.fonkyChonk`: highlight all elements with the 'fonkyChonk' css classname
* `#homepage`: highlight the element with the id 'homepage'
* `[disabled]`: highlight all disabled elements
* `[data-qa="deleteBtn"]`: highlight all elements with a `data-qa` attribute with the value `"deleteBtn"`

Any of these can also be combined together into a CSV, like so:

* `h1,h2,h3,h4,h5,h6`: highlight all headers
* `div, #id, .class, [attr]`: you get the idea
