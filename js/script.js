/**
 * Created by bipashant on 7/3/15.
 */
;
(function () {
    $(document).ready(function () {
        $('#form1').fakify({
            '[customer][state]': 'name.fullName',
            '[customer][email]': ['a@a.com', 'b@b.com', 'c@c.com']
            //'except': ['[customer][fname]', 'address_2', 'website']
        });
    });
})();
