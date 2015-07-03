// Locally passes in `jQuery`, the `window` object, the `document` object, and an `undefined` variable.  The `jQuery`, `window` and `document` objects are passed in locally, to improve performance, since javascript first searches for a variable match within the local variables set before searching the global variables set.  All of the global variables are also passed in locally to be minifier friendly. `undefined` can be passed in locally, because it is not a reserved word in JavaScript.

;
(function ($, window, document, undefined) {
    'use strict';
    $.fn.fakify = function (options) {
        var $this = this[0];
        return this.each(function () {
            var faker = {
                name: {
                    firstName: ["f_name", "fname", "first_name", "firstname", "firstName"],
                    middleName: ["m_name", "mname", "middle_name", "middlename", "middleName"],
                    lastName: ["l_name", "lname", "last_name", "lastname", "lastName"],
                    fullName: ["full_name", "fullName", "fullname"]
                }
            };

            var recurse = function (mappedKey, search, element, key, val) {
                if ($.type(val) === 'array') {
                    if ($.inArray(formatName(search), val) >= 0) {
                        mappedKey += key;
                        var fakerObj = new Faker();

                        $('[name="' + search + '"]').val(fakerObj.fetch(mappedKey));
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

            if (options !== undefined) {
                $.each(options, function (key, value) {
                    if (value !== null && key !== 'except') {
                        key = formatName(key);
                        specifiedOption.push(value);
                        if ($.type(value) === 'array') {
                            $(key).val(value[1]);
                        } else {
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
                if (($.inArray(this.name, excludeOption) < 0) && ($.inArray(this.name, specifiedOption) < 0)) {
                    $.each(faker, recurse.bind(null, '', this.name, this));
                }
            });

            function formatName ( name ){
                return name.split("][")[1].slice(0,-1);
            }
        });
    }
})(jQuery, window, document);


function Faker() {
    this.fetch = function (key) {
        switch (key) {
            case 'name.firstName':
                return $.fakeData.name.firstName[getRandomArbitrary(0, $.fakeData.name.firstName.length-1)];
                break;
            case 'name.middleName':
                return $.fakeData.name.middleName[getRandomArbitrary(0, $.fakeData.name.middleName.length-1)];
                break;
            case 'name.lastName':
                return $.fakeData.name.lastName[getRandomArbitrary(0, $.fakeData.name.lastName.length-1)];
                break;
            case 'name.fullName':
                return $.fakeData.name.firstName[getRandomArbitrary(0, $.fakeData.name.firstName.length-1)] + ' ' +$.fakeData.name.lastName[getRandomArbitrary(0, $.fakeData.name.lastName.length-1)];
                break;

            case 'address.country':
                return $.fakeData.address.country[getRandomArbitrary(0, $.fakeData.address.country.length-1)];
                break;
            case 'address.state':
                return $.fakeData.address.state[getRandomArbitrary(0, $.fakeData.address.state.length-1)];
                break;
            case 'address.streetAddress':
                return $.fakeData.address.streetAddress[getRandomArbitrary(0, $.fakeData.address.streetAddress.length-1)];
                break;
        }
    };


    function getRandomArbitrary(min, max) {
        return Math.floor((Math.random() * max) + min);

    }

}

$.fakeData = {
    name: {
        firstName: ["Bibek", "Hari", "Shyam", "Shiva", "Ram","Bibek1", "Hari1", "Shyam1", "Shiva1", "Ram1"],
        middleName: ["Sharma", "Lal", "Raj", "Prasad", "Dip"],
        lastName: ["Chapagain", "Mishra", "Shrestha", "Gaire", "Poudel"]
    },
    address: {
        country: ["Nepal", "India", "Bhutan"],
        state: ["Kathmandu", "Delhi", "Chennai"],
        zip: ["009977", "12312", "43211"],
        postal: ["123123", "432121"],
        city: ["Pokhara", "Chitwan"],
        streetAddress: ["Kalika Chowk", "Bijayanagar", "Kalanki"]
    },
    phone: ["9812361263", "98123111", "98123123123", "98111111111", "9812222222"],
    internet: {
        email: ["a@a.com", "b@b.com", "c@c.com"],
        URL: ["www.a.com", "www.b.com", "www.com"]
    },
    password: ["password", "Password"],
    amount: ["price", "amount", "Price", "price"],
    creditCardNumber: ["credit_card_number", "card_number", "creditCardNumber", "Credit_card_number", "credit_card"],
    date: ["date", "Date"],
    companyName: ["company_name", "CompanyName", "company", "Company"]
};
