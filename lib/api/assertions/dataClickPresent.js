/**
 * Checks if the given element has the specified CSS class.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.dataClickPresent('#main', 'container');
 *    };
 * ```
 *
 * @method dataClickPresent
 * @param {string} selector The selector (CSS / Xpath) used to locate the element.
 * @param {string} dataClick The data-click to look for.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

var util = require('util');
exports.assertion = function(selector, dataClick, msg) {

  var MSG_ELEMENT_NOT_FOUND = 'Testing if element <%s> has data click: "%s". ' +
    'Element could not be located.';

  this.message = msg || util.format('Testing if element <%s> has data click: "%s".', selector, dataClick);

  this.expected = function() {
    return dataClick;
  };

  this.pass = function(value) {
    return value.indexOf(dataClick) > -1;
  };

  this.failure = function(result) {
    var failed = result === false || result && result.status === -1;
    if (failed) {
      this.message = msg || util.format(MSG_ELEMENT_NOT_FOUND, selector, dataClick);
    }
    return failed;
  };

  this.value = function(result) {
    return result.value;
  };

  this.command = function(callback) {
    return this.api.getAttribute(selector, 'data-click', callback);
  };

};
