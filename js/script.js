/**
 * Created by bipashant on 7/3/15.
 */
;
(function () {
    $(document).ready(function () {
        $('#form1').fakify({
            except: ['country', 'address_2', 'website']
        });
    });
})();
