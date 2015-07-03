// Locally passes in `jQuery`, the `window` object, the `document` object, and an `undefined` variable.  The `jQuery`, `window` and `document` objects are passed in locally, to improve performance, since javascript first searches for a variable match within the local variables set before searching the global variables set.  All of the global variables are also passed in locally to be minifier friendly. `undefined` can be passed in locally, because it is not a reserved word in JavaScript.

;
(function ($, window, document, undefined) {
    'use strict';
    $.fn.fakify = function (options) {
        var $this = this[0];
        var faker = {
            name: {
                firstName: ["f_name", "fname", "first_name", "firstname", "firstName"],
                middleName: ["m_name", "mname", "middle_name", "middlename", "middleName"],
                lastName: ["l_name", "lname", "last_name", "lastname", "lastName"],
                fullName: ["full_name", "fullName", "fullname"]
            }
        };


    }
})(jQuery, window, document);
