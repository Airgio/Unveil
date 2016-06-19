$(function () {

    //Dynamic CSS class on body
    
    $('#chat_room').hide();
    var bodyClass = document.location.href.match(/[^\/]+$/)[0];
    $('body').addClass(bodyClass);


    //Navigation threw steps with top helpers

    function slideToNextStep(button){
        $(button).click(function(){
            var pos = $(this).index();
            var margin = - pos * 100;
            console.log(pos+1);
            $('.slides_container').css('margin-left', ''+margin+'%');
            $(this).removeClass('disabled');
            $(this).siblings().addClass('disabled');
        })}
    ;

    slideToNextStep(".steps li");


    //Navigation threw steps with nex buttons

    $('.next_step').click(function(){
        var index = $(this).data('index');
        var coeff = index*100;
        console.log(coeff);
        $('.slides_container').css('margin-left', '-'+(coeff+100)+'%');
        $('.steps li').eq(index).addClass('disabled');
        $('.steps li').eq(index).next().removeClass('disabled');
    });


    //Room creation button appearance when all steps are ok

    $(document).on('elDone', function() {
        if (($('.steps li').length) === ($('.steps .done').length))
        {
            $('#launch_room').fadeIn('fast');
        } else {
            $('#launch_room').fadeOut('fast');
        }
    });

    $('#launch_room').click(function(){
        $('#chat').show();
        $('#create_room').hide();
    });


    //Step 2 next step button appearance

    var $fields = $("form input");

    $fields.keyup(function() {

        var $emptyFields = $fields.filter(function() {
            // remove the $.trim if whitespace is counted as filled
            return $.trim(this.value) === "";
        });
        if (!$emptyFields.length) {
            $('.secreted').fadeIn(100);
            $('.steps li:nth-child(2)').addClass('done');
            $(document).trigger('elDone');
        } else {
            $('.secreted').fadeOut(100);
            $('.steps li:nth-child(2)').removeClass('done');
            $(document).trigger('elDone');
        }
    });

});