/*
 * shyphen
 * https://github.com/yougov/jquery.shyphen
 *
 * Copyright (c) 2014 Mark Florian
 * Licensed under the MIT license.
 */

(function($) {

  // Match 5 non-whitespace characters only if they are
  // followed by another 5 non-whitespace characters.
  var rEveryFiveNonWS = (/(\S{5})(?=\S{5})/g);

  /**
   * Inject soft hypens (U+00AD) into the string and return it,
   * according to the regular expression provided, or the default.
   * @param {string} string The string to be modified.
   * @param {RegExp} [re] Regular expression specifying the pattern
   *     after which a soft hyphen should be put. The soft hyphen will
   *     be put immediately after the first capturing group of the RegExp.
   *
   * Example:
   *     softHyphenify("Hello? How splendiferous!") == (
   *       "Hel\u00adlo? How spl\u00adend\u00adife\u00adrous!"
   *     )
   */
  function softHyphenify(string, re) {
    re = re || rEveryFiveNonWS;
    return string.replace(re, "$1\u00ad");
  }

  /**
   * Return a regex which matches sequences of non-whitespace characters of
   * length `size` when they are followed immediately by at least the
   * same number of non-whitespace characters.
   *
   * @param {number} size The length of the partial word to match.
   */
  function getHyphenationRegex(size) {
    var regexString = "(\\S{"+size+"})(?=\\S{"+size+"})";
    return new RegExp(regexString, "g");
  }

  function makeWrapper() {
    return $('<span></span>').css('display', 'inline');
  }

  function tooWide($elements, width) {
    var widths = $elements.map(function () {
      return $(this).width();
    }).get();
    return Math.max.apply(Math, widths) > width;
  }

  function shyphenate($el, options) {
    var width = $el.width();
    var nodes = $el.textNodes();
    var texts = nodes.map(function () {
      return this.nodeValue;
    });
    var wrappers = nodes.wrap(makeWrapper).parent();

    function tryHyphenation(interval) {
      var regex = getHyphenationRegex(interval);

      nodes.each(function (i, node) {
        var hyphenated = softHyphenify(texts[i], regex);
        node.nodeValue = hyphenated;
      });
    }

    var interval = 5;
    var targetWidth = width + options.fudge;
    while (interval >= 2 && tooWide(wrappers, targetWidth)) {
      tryHyphenation(interval);
      interval -= 1;
    }

    nodes.unwrap();
  }

  // Collection method.
  $.fn.shyphen = function (options) {
    options = $.extend({}, $.shyphen.defaults, options);
    return this.each(function () {
      // Do something awesome to each selected element.
      var $el = $(this);
      shyphenate($el, options);
    });
  };

  $.shyphen = {
    defaults: {
      fudge: 3
    }
  };

}(jQuery));
