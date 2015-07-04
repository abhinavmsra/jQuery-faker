/*
 * jQuery-faker plugin
 * Original author: [@anantalft, @ojash, @bipashant, @abhinavmsra]
 */
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
          zip: ['zipcode', 'zip'],
          postCode: ['postcode', 'postcode_by_state'],
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
        email: ['email', 'mailto', 'free_email', 'internet_email']
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
    postCode: ["123"],
    address: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
    streetAddress: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'],
    stateAbbr: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT'],
    city: ['Ktm', 'Pokhara', 'Butwal'],
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
  domainName: ['gmail.con', 'yahoo.com', 'hotmail.com']
};
