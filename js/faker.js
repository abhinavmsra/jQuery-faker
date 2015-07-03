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

        var recurse = function(mappedKey, search, element, key, val) {
            if ($.type(val) === 'array') {
                if ($.inArray(search, val) >= 0) {
                    mappedKey += key;
                    var fakerObj = new Faker();
                    $('#'+search).val(fakerObj.fetch(mappedKey));
                }
                else {
                    mappedKey = '';
                }
            } else {
                mappedKey += key + '.';
                $.each(val, recurse.bind(null, mappedKey, search, element));
            }
        };

        var excludeOption = new Array();
        var specifiedOption = new Array();

        if(options !== undefined){
            $.each(options, function (key, value) {
                if(value !== null && key !== 'except'){
                    specifiedOption.push(value);
                    if ($.type(value) === 'array') {
                        $('#'+key).val(value[1]);
                    }else{
                        specifiedOption.push(value);
                        var objFaker = new Faker();
                        objFaker.fetch(value);
                    }
                }

                if (key === 'except' && $.type(value) === 'array') {
                    excludeOption = value;
                }
            });
        }

        $('#' + $this.id + ' :input').each(function () {
            if (($.inArray(this.id, excludeOption) < 0) && ($.inArray(this.id, specifiedOption) < 0))
            {
                $.each(faker, recurse.bind(null, '', this.id, this));
            }
        });



    }
})(jQuery, window, document);
