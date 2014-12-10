# Shyphen

Insert soft hyphens into text nodes as necessary to avoid overflow.

Browsers will sooner break a word up, even with CSS hyphens, than put the word
on a new line. This plugin tries to avoid that.

Tested and working in IE7+, Chrome 39, Firefox 34, iOS 7.1.

## When not to use Shyphen

Don't use Shyphen if you want to hyphenate a large body of text, for instance,
to justify all text. There are [better solutions][hyphenator] for that.

[hyphenator]: https://code.google.com/p/hyphenator/

## Getting Started
Download a copy of [jquery.textnodes][textnodes] - Shyphen depends on it.

Download the [development version][max].

[dev]: https://raw.github.com/yougov/jquery.shyphen/master/src/shyphen.js
[textnodes]: https://github.com/yougov/jquery.textnodes

In your web page:

```html
<script src="jquery.js"></script>
<script src="jquery.textnodes.min.js"></script>
<script src="dist/shyphen.min.js"></script>
<script>
jQuery(function($) {
  $('.things').shyphen();
});
</script>
```
