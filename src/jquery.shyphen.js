/*
 * shyphen
 * https://github.com/yougov/jquery.shyphen
 *
 * Copyright (c) 2014 Mark Florian
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.shyphen = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.shyphen = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.shyphen.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.shyphen.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].shyphen = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
