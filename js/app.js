
$(document).ready(function() {
    
    $('.button__menu').on('click', function(){
        $(this).toggleClass('button__menu--active');
        $(this).next().toggleClass('box__layer--active');
    });

    //theme switch
    const theme = localStorage.getItem('theme');
    if(!theme) localStorage.setItem('theme','daymode');
    if(theme === 'darkmode'){
        $('body').addClass('darkmode active');
        $('#button__mode-switch').find('.text').text('DAY MODE')
    }else{
        $('body').removeClass('darkmode').addClass('daymode active');
        $('#button__mode-switch').find('.text').text('NIGHT MODE')
    };
    $('.button__mode').on('click', function(e){
        e.preventDefault();
        var $body = $('body');
        if( !$body.hasClass('darkmode') ){
            $(this).addClass('active');
            $body.removeClass('daymode').addClass('darkmode');
            localStorage.setItem('theme','darkmode');
            setTimeout(function(){
                $body.addClass('active');
                $('#button__mode-switch').find('.text').text('DAY MODE')
            }, 200)
            setTimeout(function(){
                $('#button__mode-switch').removeClass('active');
            }, 700)
        }else{
            $(this).addClass('active');
            $body.removeClass('darkmode').addClass('daymode');
            localStorage.setItem('theme','daymode');
            setTimeout(function(){
                $body.addClass('active');
                $('#button__mode-switch').find('.text').text('NIGHT MODE')
            }, 200)
            setTimeout(function(){
                $('#button__mode-switch').removeClass('active');
            }, 700)
        }
    })

    // Clock rotation
    // Get Date
    const date = new Date();
    let h = date.getHours() % 12;
    let m = date.getMinutes();
    let s = date.getSeconds();

    // Initialize Clock
    let hA = updateClock($('#hour'), Math.round((h * 360) / 12), 0);
    let mA = updateClock($('#min'), Math.round((m * 360) / 60), 0);
    let sA = updateClock($('#sec'), Math.round((s * 360) / 60), 0);

    // Update Second
    setInterval(() => {
        sA = updateClock($('#sec'), sA, 6);
    }, 1000);

    // Update Minute
    setInterval(() => {
        mA = updateClock($('#min'), mA, 1);
    }, 10000)

    // Update Hour
    setInterval(() => {
        hA = updateClock($('#hour'), hA, 1);
    }, 50000);

    // Prevent overflow (Refresh After 6 hrs)
    setTimeout(() => {
        window.location.reload();
    }, 21600000);

    // Update Time
    function updateClock(ref, start, add) {
        start += add;
        ref.css("transform", `rotate(${start}deg)`);
        return start;
    }

    // wheel event
    var translateX = 0;
    var visualGapX = [];
    var wheelTargetWrap = document.querySelector('.box__visual-scroll');
    var wheelTarget = document.querySelector('.box__visual-content');
    var tailTarget = $('.box__all-cases');
    var bottomPagination = document.querySelector('.box__pagination');
    var translatePaginationX = 0;

    document.querySelectorAll('.box__visual').forEach(function(event){
        var sizeCheck = event.getBoundingClientRect();
        var windowSize = wheelTargetWrap.clientWidth / 2;
        var min = sizeCheck.left - windowSize;
        var max = sizeCheck.right - windowSize;
        visualGapX.push({min,max});
    });
    $('.box__pagination').find('.text__num').text( $('.box__visual-content').find('.box__visual').length )

    $(window).on('wheel', function(event){

        var wheelDelta = event.originalEvent.wheelDelta;
        translatePaginationX = -(-translateX - 40) / wheelTarget.clientWidth * 100;

        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            // scroll up
            if(tailTarget.hasClass('active')){
                if(tailTarget.hasClass('active-step2')){
                    tailTarget.removeClass('active-step2');
                }else{
                    tailTarget.removeClass('active');
                }
            }else{
                if(translateX < 0){
                    translateX = translateX + wheelDelta;
                }
            }
        } else {
            // scroll down
            if(translateX > -(wheelTarget.clientWidth - wheelTargetWrap.clientWidth)){
                translateX = translateX + wheelDelta;
            }else{
                if(tailTarget.hasClass('active')){
                    tailTarget.addClass('active-step2');
                }else{
                    tailTarget.addClass('active');
                }
                
            }
        }
        if(visualGapX[0].min < -(translateX) && -(translateX) < visualGapX[0].max){
            $('.box__visual-content').find('.box__visual').removeClass('focus-in');
            $('.box__visual-content').find('.box__visual').eq(0).addClass('focus-in');
            $('.box__pagination').find('.text__num').text('4')
        }else if(visualGapX[1].min < -(translateX) && -(translateX) < visualGapX[1].max){
            $('.box__visual-content').find('.box__visual').removeClass('focus-in');
            $('.box__visual-content').find('.box__visual').eq(1).addClass('focus-in');
            $('.box__pagination').find('.text__num').text('3')
        }
        else if(visualGapX[2].min < -(translateX) && -(translateX) < visualGapX[2].max){
            $('.box__visual-content').find('.box__visual').removeClass('focus-in');
            $('.box__visual-content').find('.box__visual').eq(2).addClass('focus-in');
            $('.box__pagination').find('.text__num').text('2')
        }
        else if(visualGapX[3].min < -(translateX) && -(translateX) < visualGapX[3].max){
            $('.box__visual-content').find('.box__visual').removeClass('focus-in');
            $('.box__visual-content').find('.box__visual').eq(3).addClass('focus-in');
            $('.box__pagination').find('.text__num').text('1')
        }else{
           $('.box__visual-content').find('.box__visual').removeClass('focus-in');
        }
        if(visualGapX[0].max/3 < -(translateX)){
            $('.box__visual-scroll').addClass('active');
        }else{
            $('.box__visual-scroll').removeClass('active');
        }

        wheelTarget.style.transform = "translate("+translateX+"px)";
        bottomPagination.style.transform = "translate("+translatePaginationX+"%)";
    });

}); 