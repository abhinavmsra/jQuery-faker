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
        firstName: [ "Aarav", "Ajita", "Amit", "Amita", "Amrit", "Arijit", "Ashmi", "Asmita", "Bibek", "Bijay", "Bikash", "Bina", "Bishal", "Bishnu", "Buddha", "Deepika", "Dipendra", "Gagan", "Ganesh", "Khem", "Krishna", "Laxmi", "Manisha", "Nabin", "Nikita", "Niraj", "Nischal", "Padam", "Pooja", "Prabin", "Prakash", "Prashant", "Prem", "Purna", "Rajendra", "Rajina", "Raju", "Rakesh", "Ranjan", "Ratna", "Sagar", "Sandeep", "Sanjay", "Santosh", "Sarita", "Shilpa", "Shirisha", "Shristi", "Siddhartha", "Subash", "Sumeet", "Sunita", "Suraj", "Susan", "Sushant"],
        middleName: ["Sharma", "Lal", "Raj", "Prasad", "Dip", "Kumar", "Bhatta"],
        lastName: ["Adhikari", "Aryal", "Baral", "Basnet", "Bastola", "Basynat", "Bhandari", "Bhattarai", "Chettri", "Devkota", "Dhakal", "Dongol", "Ghale", "Gurung", "Gyawali", "Hamal", "Jung", "KC", "Kafle", "Karki", "Khadka", "Koirala", "Lama", "Limbu", "Magar", "Maharjan", "Niroula", "Pandey", "Pradhan", "Rana", "Raut", "Sai", "Shai", "Shakya", "Sherpa", "Shrestha", "Subedi", "Tamang", "Thapa"]
    },
    address: {
        country: ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica (the territory South of 60 deg S)', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island (Bouvetoya)', 'Brazil', 'British Indian Ocean Territory (Chagos Archipelago)', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Faroe Islands', 'Falkland Islands (Malvinas)', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Democratic People\'s Republic of Korea', 'Republic of Korea', 'Kuwait', 'Kyrgyz Republic', 'Lao People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands Antilles', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthelemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard & Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands', 'Britain', 'Virgin Islands', 'U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'],
        state: ["Baglung", "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojupu", "Chitwan", "Dailekh", "Dang", "Dhading", "Dhankuta", "Dhanusa", "Dolakha", "Dolpha", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kabhrepalanchok", "Kalikot", "Kapilvastu", "Kaski", "Kathmandu", "Lalitpur", "Lamjung", "Manang", "Mohottari", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalparasi", "Nuwakot", "Palpa", "Parbat", "Parsa", "Ramechhap", "Rauswa", "Rautahat", "Rolpa", "Rupandehi", "Sankhuwasabha", "Sarlahi", "Sindhuli", "Sindhupalchok", "Sunsari", "Surket", "Syangja", "Tanahu", "Terhathum"],
        zip: ["009977", "12312", "43211", "27320", "27321", "27322", "27323", "27325", "27326", "27330", "27331", "27332", "27340", "27341", "27342", "27343", "27344", "27349", "27350", "27351", "27355", "27356", "27357", "27358", "27359", "27360", "27361", "27370", "27371", "27373", "27374", "27375", "27376", "27377", "27379", "27395", "27401", "27402", "27403"],
        postcode: ["123", "44700"],
        address: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
        streetAddress: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
        state_abbr: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT'],
        city: ["Bhaktapur", "Biratnagar", "Birendranagar", "Birgunj", "Butwal", "Damak", "Dharan", "Gaur", "Gorkha", "Hetauda", "Itahari", "Janakpur", "Kathmandu", "Lahan", "Nepalgunj", "Pokhara"],
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
    domainName: ['gmail.con', 'yahoo.com', 'hotmail.com'],
    business: {
        credit_card_numbers: ['1234-2121-1221-1211', '1212-1221-1121-1234', '1211-1221-1234-2201', '1228-1221-1221-1431'],
        credit_card_expiry_dates: ['2011-10-12', '2012-11-12', '2015-11-11', '2013-9-12'],
        credit_card_types: ['visa', 'mastercard', 'americanexpress', 'discover']
    }
};
