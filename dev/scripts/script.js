/**
 * Created by bipashant on 7/3/15.
 */
;(function () {
  $(document).ready(function () {
    $('#form').fakify({
      'customer[state]': ['abc','cde','1abc','2cde','4abc','5cde5','123abc','c123de','a123bc','123cde','a22bc','cd32e'],
      'except': ['mname', 'address_2', 'website']
    });
  });
})();
