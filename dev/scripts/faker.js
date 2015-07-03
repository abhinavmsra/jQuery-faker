;(function ($, window, document, undefined) {
    'use strict';
    $.fn.fakify = function (options) {
        var $this = this[0];
        return this.each(function () {
            var faker = {
                name: {
                    firstName: ['f_name', 'fname', 'first_name', 'firstname', 'fstname'],
                    middleName: ['m_name', 'mname', 'middle_name', 'middlename'],
                    lastName: ['l_name', 'lname', 'last_name', 'lastname', 'lstname']
                },
                address: {
                    country: ['country'],
                    state: ['state'],
                    zip: ['zipcode', 'zip'],
                    postcode: ['postcode', 'postcode_by_state'],
                    address: ['address', 'secondary_address', 'primary_address'],
                    street_address: ['street_address', 'street', 'street_name'],
                    state_abbr: ['state_abbr'],
                    city: ['city'],
                    phone: ['cell_phone', 'phone', 'phone_number'],
                    extension: ['extension', 'ext'],
                    fax_number: ['fax_number', 'fax'],
                    building_number: ['building_number'],
                    department: ['department']
                },
                company: {
                    name: ['company_name', 'c_name', 'organization_name', 'name'],
                    website: ['url', 'website', 'web_address', 'web-address'],
                    title: ['title'],
                    description: ['description', 'desc']
                },
                personal: {
                    academic: ['academic', 'education', 'qualification']
                },
                email: ['email', 'mailto', 'free_email', 'internet_email']
            };
            var recurse = function (mappedKey, element, key, val) {
                if ($.type(val) === 'array') {
                    if ($.inArray(formatName(element.name), val) >= 0) {
                        mappedKey += key;
                        var fakerObj = new Faker();
                        $('[name="' + element.name + '"]').val(fakerObj.fetch(mappedKey));
                    }
                    else {
                        mappedKey = '';
                    }
                } else {
                    mappedKey += key + '.';
                    $.each(val, recurse.bind(null, mappedKey, element));
                }
            };

            var excludeOption = [];
            var specifiedOption = [];

            if (options !== undefined) {
                $.each(options, function (key, value) {
                    if (value !== null && key !== 'except') {
                        var element = $('[name="' + key + '"]')[0];
                        var objFaker = new Faker();
                        if ($.type(value) === 'array') {
                            specifiedOption.push(key);
                            $(element).val(objFaker.fetch(undefined, value));
                        } else {
                            specifiedOption.push(key);
                            $(element).val(objFaker.fetch(value));
                        }
                    }

                    if (key === 'except' && $.type(value) === 'array') {
                        excludeOption = value;
                    }
                });
            }

            $('#' + $this.id + ' :input').each(function () {
                if (($.inArray(this.name, excludeOption) < 0) && ($.inArray(this.name, specifiedOption) < 0)) {
                    $.each(faker, recurse.bind(null, '', this));
                }
            });

            function formatName(name) {
                return name.split("][")[1].slice(0, -1);
            }
        });
    };
})(jQuery, window, document);


/*
 * Main Engine to generate fake data
 * based on the name of elements
 * */
function Faker() {

    // jQuery reference to the faker dictionary
    var $dictionaryRef = '$.fakifyDictionary.';

    // minimum indexing value from the array
    var lowerIndex = 0;
    var emailSeparator = '@';

    /*
     *  Fetches the bestMatch from dictionary or custom function
     *  based on the key passed
     *
     *  @param key [String], a properly formatted string used as a key
     *   to index the dictionary or call the custom functions
     *
     *  @return [String], bestMatch to fill the form
     * */
    this.fetch = function (key, domain) {
        var penetrationDepth = $dictionaryRef + key;
        var applicableDomain = eval(penetrationDepth);
        if (!applicableDomain) { // exists in dictionary
            return customExtraction(key, domain);
        }
        else {
            return getMeValueOf(key, domain);
        }
    };

    /*
     * Implements the custom fill-up logic for keys not matched to the
     * dictionary
     *
     * @param key [String], a properly formatted string used as a key
     *   to implement the required logic
     *
     * @return [String], bestMatch to fill the form
     * */
    var customExtraction = function (key, domain) {
        var bestMatch = [];
        switch (key) {
            case 'name.fullName':
                Object.keys($.fakifyDictionary.name).forEach(function (index) {
                    bestMatch.push(getMeValueOf('name.' + index));
                });
                break;
            case 'email':
                var firstName = getMeValueOf('name.firstName').toLowerCase();
                var lastName = getMeValueOf('name.lastName').toLowerCase();
                var localPart = firstName + lastName;
                var domainPart = getMeValueOf('domainName');
                bestMatch.push(localPart + emailSeparator + domainPart);
                break;
            case undefined:
                bestMatch.push(getMeValueOf(null, domain));
                break;
              default:
              bestMatch.push('company.description');
              break;
        }
        return bestMatch.join(' ');
    };

    /*
     * Returns a random integer within a defined range
     *
     * @param max [Integer], upper-limit of the range
     * @param min [Integer], lower-limit of the range
     *
     * @return [Integer], a pseudo-random integer within the desired range
     * */
    var getRandomArbitrary = function (max, min) {
        return Math.floor((Math.random() * max) + min);
    };

    /*
     *  Returns the bestMatch for the key
     *
     *  @param index [String], indexing for the database
     *  @return [String], bestMatch for the element
     * */

    var getMeValueOf = function (index, customArray) {
        var domain = [];
        if (customArray === undefined) {
            domain = eval($dictionaryRef + index);
        }
        else {
            domain = customArray;
        }
        var seedIndex = getRandomArbitrary((domain.length - 1), lowerIndex);
        return domain[seedIndex];
    };
}

$.fakifyDictionary = {
    name: {
        firstName: ["Bibek", "Hari", "Shyam", "Shiva", "Ram"],
        middleName: ["Sharma", "Lal", "Raj", "Prasad", "Dip"],
        lastName: ['Lamichhane', 'Aryal', 'Basnet', 'Adhikari', 'Poudyal']
    },
    address: {
        country: ["Nepal", "India", "Bhutan"],
        state: ["Kathmandu", "Delhi", "Chennai"],
        zip: ["009977", "12312", "43211"],
        postcode: ["123"],
        address: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
        streetAddress: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
        state_abbr: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT'],
        city: ['Ktm', 'Pokhara', 'Butwal'],
        phone: ['123-456-789', '546-666-888', '544-666-998'],
        extension: ['3456', '1234', '7890'],
        fax_number: ['444-555-555', '333-555-5577'],
        building_number: ['123', '6789', '9870'],
        department: ['HR', 'Finance']
    },
    company: {
        name: ['Global IME', 'Everest', 'Investment'],
        website: ['a.com', 'b.gov', 'c.net'],
        title: ['Lorem ipsum'],
        description: ['Lorem description']
    },
    personal: {
        academic: ['MBA', 'BBA', 'SLC']
    },
    domainName: ['gmail.con', 'yahoo.com', 'hotmail.com']
};