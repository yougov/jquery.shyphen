(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  var shy = '\u00ad';

  function hasSoftHyphen(text) {
    return text.indexOf(shy) > -1;
  }

  function countCharacters(text, character) {
    return text.split(character).length - 1;
  }

  module("jQuery#shyphen", {

    setup: function() {
      this.simple = $('#qunit-fixture').find('#simple');
      this.complex = $('#qunit-fixture').find('#complex');
    }

  });

  test("is chainable", function() {
    var el = this.simple;
    strictEqual(el.shyphen(), el, "should be chainable");
  });

  test("has no effect on elements which already fit", function () {
    var el = this.simple;
    var expected = el.text();
    var newText = el.shyphen().text();
    equal(newText, expected, "text remains the same if it already fits");
  });

  test("keeps internal HTML structures intact", function () {
    var el = this.complex;
    var expected = el.find('*');

    expect(expected.length);

    this.complex.width(1);
    var actual = el.shyphen().find('*');
    actual.each(function (i, el) {
      strictEqual(el, expected[i], "element is still present, in order");
    });
  });

  test("inserts soft hyphens", function () {
    this.simple.width(1);

    this.simple.shyphen();
    var text = this.simple.text();
    ok(hasSoftHyphen(text), "soft hyphens have been inserted");
  });

  test("doesn't insert more hyphens than necessary", function () {
    this.complex.width(170);
    var text = this.complex.shyphen().text();
    equal(countCharacters(text, shy), 9, "doesn't excessively hyphenate");
  });

  test("fudge is configurable", function () {
    var el = this.complex;
    el.width(1);

    el.shyphen({ fudge: 169 });
    var text = el.text();
    equal(countCharacters(text, shy), 9,
      "hyphenates less with large fudge");
  });

  test("more aggressively hyphenates to fit text if necessary", function () {
    this.complex.width(1);
    var text = this.complex.shyphen().text();
    equal(countCharacters(text, shy), 44, "can aggressively hyphenate");
  });

  test("works on a collection of elements", function () {
    this.simple.add(this.complex).width(1);

    var simple = this.simple;
    var complex = this.complex;
    var all = complex.add(simple);

    all.shyphen();

    ok(hasSoftHyphen(simple.text()), "soft hyphens inserted in simple");
    ok(hasSoftHyphen(complex.text()), "soft hyphens inserted in complex");
  });

  test("always inserts soft hyphens using the original text(s)", function () {
    // first, record the original text
    var original = this.complex.text();

    // second, aggressively hyphenate
    this.complex.width(1);
    var text = this.complex.shyphen().text();
    notEqual(text, original, "text was hyphenated");

    // third, resize so that no hyphens are necessary, re-run
    this.complex.width(1000);
    text = this.complex.shyphen().text();
    equal(text, original, "original text is restored");
  });

}(jQuery));
