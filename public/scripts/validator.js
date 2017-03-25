jQuery(document).ready(function ($) {

    $.validator.addMethod('gt', function (value, element, param) {
        return this.optional(element) || parseInt(value) > parseInt($(param).val());
    }, 'End must be greater than start');

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
                gt: '#start'
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

    $('[name="start"]').on('change blur keyup', function() {
        $('[name="end"]').valid();
    });

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
                gt: '#startUp'
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

    $('[name="startUp"]').on('change blur keyup', function() {
        $('[name="endUp"]').valid();
    });

});