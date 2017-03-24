

jQuery(function ($) {
    

	$('#addform').validate({
        rules: {
            tipo: {
                required: true
            },
            nombre: {
                required: true
            },
            tran1: {
                required: true
            },
            tran2: {
                required: true
            },
            start: {
                required: true
            },
            end: {
                required: true,

            }

        },
        
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
});

jQuery(function ($) {
	$('#upform').validate({
        rules: {
            nombreUp: {
                required: true
            },
            tran1Up: {
                required: true
            },
            tran2Up: {
                required: true
            },
            startUp: {
                required: true
            },
            endUp: {
                required: true
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
});