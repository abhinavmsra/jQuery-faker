/**
 * Created by bipashant on 7/3/15.
 */
;
(function () {
    $(document).ready(function () {
        $('#form1').fakify({
            '[customer][state]': 'name.fullName',
            '[customer][fname]': ['sanjeeb','bibhusan','satish'],
            'except': ['[customer][mname]', 'address_2', 'website']
        });
    });
})();
