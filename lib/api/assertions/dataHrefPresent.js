/**
 * Checks if the given element has the specified CSS class.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.dataHrefPresent('#main', 'container');
 *    };
 * ```
 *
 * @method dataHrefPresent
 * @param {string} selector The selector (CSS / Xpath) used to locate the element.
 * @param {string} dataHref The data-href to look for.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

var util = require('util');
exports.assertion = function(selector, dataHref, msg) {

  var MSG_ELEMENT_NOT_FOUND = 'Testing if element <%s> has data href: "%s". ' +
    'Element could not be located.';

  this.message = msg || util.format('Testing if element <%s> has data href: "%s".', selector, dataHref);

  this.expected = function() {
    return dataHref;
  };

  this.pass = function(value) {
    return value.indexOf(dataHref) > -1;
  };

  this.failure = function(result) {
    var failed = result === false || result && result.status === -1;
    if (failed) {
      this.message = msg || util.format(MSG_ELEMENT_NOT_FOUND, selector, dataHref);
    }
    return failed;
  };

  this.value = function(result) {
    return result.value;
  };

  this.command = function(callback) {
    return this.api.getAttribute(selector, 'class', callback);
  };

};
