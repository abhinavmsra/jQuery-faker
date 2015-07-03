
/*
* Main Engine to generate fake data
* based on the name of elements
* */
function Faker() {

  // jQuery reference to the faker dictionary
  var $dictionaryRef = '$.fakifyDictionary.';

  /*
  *  Fetches the bestMatch from dictionary or custom function
  *  based on the key passed
  *
  *  @param key [String], a properly formatted string used as a key
  *   to index the dictionary or call the custom functions
  *
  *  @return [String], bestMatch to fill the form
  * */
  this.fetch = function (key) {
    var penetrationDepth = $dictionaryRef + key;
    var applicableDomain = eval(penetrationDepth);

    if (!applicableDomain) { // exists in dictionary
      return customExtraction(key);
    }
    else {
      return applicableDomain[getRandomArbitrary(applicableDomain.length - 1, 0)];
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
  var customExtraction = function (key) {
    var bestMatch = [];
    switch (key) {
      case 'name.fullName':
        Object.keys($.fakifyDictionary.name).forEach(function (index) {
          var keyDomain = $.fakifyDictionary.name[index];
          var seedIndex = getRandomArbitrary(keyDomain.length - 1, 0);
          debugger;
          bestMatch.push(keyDomain[seedIndex]);
        });
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
  var getRandomArbitrary =  function(max, min) {
    return Math.floor((Math.random() * max) + min);
  }

}



