;(function ($, window, document, undefined) {
  'use strict';
  $.fn.fakify = function (options) {
    var $this = this[0];
    return this.each(function () {

      /*
       * Plugin Map Table
       *   -> maps the element names to the key for modularised usage
       *      for dictionary access and customization
       * */
      var faker = {
        name: {
          firstName: ['f_name', 'fname', 'first_name', 'firstname', 'fstname'],
          middleName: ['m_name', 'mname', 'middle_name', 'middlename'],
          lastName: ['l_name', 'lname', 'last_name', 'lastname', 'lstname']
        },
        address: {
          country: ['country'],
          state: ['state'],
          zip: ['zipcode', 'zip', 'postcode', 'postcode_by_state'],
          address: ['address', 'secondary_address', 'primary_address'],
          streetAddress: ['street_address', 'street', 'street_name'],
          stateAbbr: ['state_abbr'],
          city: ['city'],
          phone: ['cell_phone', 'phone', 'phone_number'],
          extension: ['extension', 'ext'],
          faxNumber: ['fax_number', 'fax'],
          buildingNumber: ['building_number'],
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
        email: ['email', 'mailto', 'free_email', 'internet_email', 'mailTo', 'freeEmail', 'internetEmail'],
        business: {
          creditCardNumbers: ['credit_card', 'creditCard']
        }
      };

      /*
       * Parses the element's name and returns the bestMatch
       * key
       *
       * @param name[String], element's name
       * @return [String], bestMatch key
       * */
      var formatName = function(name) {
        var token = name.substring(name.lastIndexOf("[") + 1, name.lastIndexOf("]"));
        return token ? token : name;
      };

      /*
       * Recursive function to parse the element names and returns the
       *  corresponding bestMatch standard key
       *
       *  @param mappedKey[String], holds the bestMatch key
       *  @param element[jQuery Object], reference to the element
       *  @param key[String]
       * @param val[<Hash> or <Array>]
       *
       * */
      var recurse = function (mappedKey, element, key, val) {
        if (val.constructor === Array) {
          if ($.inArray(formatName(element.name), val) >= 0) {
            mappedKey += key;
            $('[name="' + element.name + '"]').val(Faker.fetch(mappedKey));
          }
          else {
            mappedKey = '';
          }
        } else {
          mappedKey += (key + '.');
          $.each(val, recurse.bind(null, mappedKey, element));
        }
      };

      // array to hold the elements to be excluded for fill-up
      var excludeOption = [];
      // array to hold the domain or key for specific elements
      var specifiedOption = [];

      /*
       * Extends the fakify options
       * */
      if (options !== undefined) {
        $.each(options, function (key, value) {
          if (value !== null && key !== 'except') {
            var element = $('[name="' + key + '"]');
            if ($.type(value).constructor === Array) {
              specifiedOption.push(key);
              $(element).val(Faker.fetch(undefined, value));
            } else {
              specifiedOption.push(key);
              $(element).val(Faker.fetch(value));
            }
          }

          if (key === 'except' && value.constructor === Array) {
            excludeOption = value;
          }
        });
      }

      /*
       * Iterates over the non-hidden text form elements
       * and tries to assign a bestMatch value to it based on it's name
       * */
      $('#' + $this.id + ' input:text[type!=hidden]').each(function () {
        if (($.inArray(this.name, excludeOption) < 0) && ($.inArray(this.name, specifiedOption) < 0)) {
          $.each(faker, recurse.bind(null, '', this));
        }
      });

      /*
       * Iterates over the checkbox form elements
       * and tries to check a random number of checkboxes
       * */
      var checkBoxArray =  $('#' + $this.id + ' input:checkbox');
      $.each(checkBoxArray, function(){
        $(this).prop('checked', Faker.randBool());
      });

      /*
       * Iterates over the radio form elements
       * and tries to check a single radio element
       * */
      var radioArray = $('#' + $this.id + ' input:radio');
      $(radioArray[Faker.randInt(radioArray.length - 1, 0)]).attr('checked', true);

      /*
       * Iterates over the select options
       * and tries to select a random option
       * */
      var selectTagArray = $('#' + $this.id + ' select');
      $.each(selectTagArray, function () {
        this.selectedIndex = Faker.randInt(this.children.length - 1, 1);
      });
    });
  };
})(jQuery, window, document);


/*
 * Main Engine to generate fake data
 * based on the name of elements
 * */
function Faker() {
  'use strict';

  // jQuery reference to the faker dictionary
  this.$dictionaryRef = '$.fakifyDictionary.';

  // minimum indexing value from the array
  this.lowerIndex = 0;
  this.emailSeparator = '@';

  var that = this;
  /*
   * Implements the custom fill-up logic for keys not matched to the
   * dictionary
   *
   * @param key [String], a properly formatted string used as a key
   *   to implement the required logic
   *
   * @return [String], bestMatch to fill the form
   * */
  this.customExtraction = function (key, domain) {
    var bestMatch = [];
    switch (key) {
      case 'name.fullName':
        Object.keys($.fakifyDictionary.name).forEach(function (index) {
          bestMatch.push(that.getMeValueOf('name.' + index));
        });
        break;
      case 'email':
        var firstName = that.getMeValueOf('name.firstName').toLowerCase();
        var lastName = that.getMeValueOf('name.lastName').toLowerCase();
        var localPart = firstName + lastName;
        var domainPart = that.getMeValueOf('domainName');
        bestMatch.push(localPart + that.emailSeparator + domainPart);
        break;
      case undefined:
        bestMatch.push(that.getMeValueOf(null, domain));
        break;
      default:
        bestMatch.push('company.description');
        break;
    }
    return bestMatch.join(' ');
  };

  /*
   *  Returns the bestMatch for the key
   *
   *  @param index [String], indexing for the database
   *  @return [String], bestMatch for the element
   * */

  this.getMeValueOf = function (index, customArray) {
    var domain = [];
    if (customArray === undefined) {
      domain = eval(that.$dictionaryRef + index);
    }
    else {
      domain = customArray;
    }
    var seedIndex = Faker.randInt((domain.length - 1), that.lowerIndex);
    return domain[seedIndex];
  };
}

/*
 *  Fetches the bestMatch from dictionary or custom function
 *  based on the key passed
 *
 *  @param key [String], a properly formatted string used as a key
 *   to index the dictionary or call the custom functions
 *
 *  @return [String], bestMatch to fill the form
 * */
Faker.fetch = function (key, domain) {
  var objFaker = new Faker();
  var penetrationDepth = objFaker.$dictionaryRef + key;
  var applicableDomain = eval(penetrationDepth);
  if (!applicableDomain) { // exists in dictionary
    return objFaker.customExtraction(key, domain);
  }
  else {
    return objFaker.getMeValueOf(key, domain);
  }
};

/*
 * Returns a random integer within a defined range
 *
 * @param max [Integer], upper-limit of the range
 * @param min [Integer], lower-limit of the range
 *
 * @return [Integer], a pseudo-random integer within the desired range
 * */
Faker.randInt = function (max, min) {
  return Math.floor((Math.random() * max) + min);
};

/*
 * Randomly returns a true or false value.
 *
 * @return [Boolean]
 */
Faker.randBool = function () {
  return (Faker.randInt(100, 0) % 2 === 0 );
};

/*
* Fakify pool of words
* */
$.fakifyDictionary = {
    name: {
        firstName: [ 'Aarav', 'Ajita', 'Amit', 'Amita', 'Amrit', 'Arijit', 'Ashmi', 'Asmita', 'Bibek', 'Bijay', 'Bikash', 'Bina', 'Bishal', 'Bishnu', 'Buddha', 'Deepika', 'Dipendra', 'Gagan', 'Ganesh', 'Khem', 'Krishna', 'Laxmi', 'Manisha', 'Nabin', 'Nikita', 'Niraj', 'Nischal', 'Padam', 'Pooja', 'Prabin', 'Prakash', 'Prashant', 'Prem', 'Purna', 'Rajendra', 'Rajina', 'Raju', 'Rakesh', 'Ranjan', 'Ratna', 'Sagar', 'Sandeep', 'Sanjay', 'Santosh', 'Sarita', 'Shilpa', 'Shirisha', 'Shristi', 'Siddhartha', 'Subash', 'Sumeet', 'Sunita', 'Suraj', 'Susan', 'Sushant'],
        middleName: ['Sharma', 'Lal', 'Raj', 'Prasad', 'Dip', 'Kumar', 'Bhatta'],
        lastName: ['Adhikari', 'Aryal', 'Baral', 'Basnet', 'Bastola', 'Basynat', 'Bhandari', 'Bhattarai', 'Chettri', 'Devkota', 'Dhakal', 'Dongol', 'Ghale', 'Gurung', 'Gyawali', 'Hamal', 'Jung', 'KC', 'Kafle', 'Karki', 'Khadka', 'Koirala', 'Lama', 'Limbu', 'Magar', 'Maharjan', 'Niroula', 'Pandey', 'Pradhan', 'Rana', 'Raut', 'Sai', 'Shai', 'Shakya', 'Sherpa', 'Shrestha', 'Subedi', 'Tamang', 'Thapa']
    },
    address: {
        country: ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica (the territory South of 60 deg S)', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island (Bouvetoya)', 'Brazil', 'British Indian Ocean Territory (Chagos Archipelago)', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Faroe Islands', 'Falkland Islands (Malvinas)', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Democratic People\'s Republic of Korea', 'Republic of Korea', 'Kuwait', 'Kyrgyz Republic', 'Lao People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands Antilles', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthelemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard & Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands', 'Britain', 'Virgin Islands', 'U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'],
        state: ['Baglung', 'Banke', 'Bara', 'Bardiya', 'Bhaktapur', 'Bhojupu', 'Chitwan', 'Dailekh', 'Dang', 'Dhading', 'Dhankuta', 'Dhanusa', 'Dolakha', 'Dolpha', 'Gorkha', 'Gulmi', 'Humla', 'Ilam', 'Jajarkot', 'Jhapa', 'Jumla', 'Kabhrepalanchok', 'Kalikot', 'Kapilvastu', 'Kaski', 'Kathmandu', 'Lalitpur', 'Lamjung', 'Manang', 'Mohottari', 'Morang', 'Mugu', 'Mustang', 'Myagdi', 'Nawalparasi', 'Nuwakot', 'Palpa', 'Parbat', 'Parsa', 'Ramechhap', 'Rauswa', 'Rautahat', 'Rolpa', 'Rupandehi', 'Sankhuwasabha', 'Sarlahi', 'Sindhuli', 'Sindhupalchok', 'Sunsari', 'Surket', 'Syangja', 'Tanahu', 'Terhathum'],
        address: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
        streetAddress: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
        stateAbbr: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT'],
        city: ['Bhaktapur', 'Biratnagar', 'Birendranagar', 'Birgunj', 'Butwal', 'Damak', 'Dharan', 'Gaur', 'Gorkha', 'Hetauda', 'Itahari', 'Janakpur', 'Kathmandu', 'Lahan', 'Nepalgunj', 'Pokhara'],
        phone: ['123-456-789', '546-666-888', '544-666-998'],
        extension: ['3456', '1234', '7890'],
        faxNumber: ['444-555-555', '333-555-5577'],
        buildingNumber: ['123', '6789', '9870'],
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
        creditCardNumbers: ['378282246310005', '371449635398431', '378734493671000', '5610591081018250',
          '30569309025904', '38520000023237', '6011111111111117', '6011000990139424', '3530111333300000',
          '3566002020360505', '5555555555554444', '5105105105105100', '4111111111111111']
    }
};
