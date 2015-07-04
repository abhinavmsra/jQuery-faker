/**
 * Created by bipashant on 7/3/15.
 */
;(function () {
  $(document).ready(function () {
    //alert(Faker.fetch('address.zip'));
    $('#form').fakify({
      '[customer][state]': 'name.fullName',
      'except': ['mname', 'address_2', 'website']
    });
  });
})();
