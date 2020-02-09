"use strict";

exports.validator = {
  name: function name(input) {
    if (!input) return 'username is required';
    var min = 3;
    var max = 30;
    if (input.length < min) return 'username min of length is ' + min;
    if (input.length > max) return 'username max of length is ' + max;
    return null;
  },
  about: function about(input) {
    if (!input) return 'username is required';
    var max = 220;
    if (input.length > max) return 'username max of length is ' + max;
    return null;
  }
};
//# sourceMappingURL=helper.js.map