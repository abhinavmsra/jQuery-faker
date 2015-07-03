/**
 * Created by bipashant on 7/3/15.
 */
;(function () {
    $(document).ready(function () {
        //alert(Faker.fetch('name.fullName'));
        $('#form').fakify({
            'customer[username]': 'name.firstName',
            'except': ['customer[mname]', 'customer[mname]']
        });
    });
})();
