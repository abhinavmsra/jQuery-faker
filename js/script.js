/**
 * Created by bipashant on 7/3/15.
 */
;(function () {
    $(document).ready(function () {
        //alert(Faker.fetch('name.firstName'));
        $('#form').fakify({
            '[customer][state]': 'name.fullName',
            'except': ['[customer][mname]', 'address_2', 'website']
        });
    });
})();
