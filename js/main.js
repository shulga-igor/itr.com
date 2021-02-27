$(document).ready(function(e){

    function sliderIcon(){
        $('.slider-icon').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            prevArrow:"<div class='prev slick-prev'><img src='../img/ar-l.png'></div>",
            nextArrow:"<div class='next slick-next'><img src='../img/ar-r.png'></div>",
            responsive: [
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                  }
                }
              ]
          });
    }
    if($( window ).width() < 992){
        sliderIcon();
    }
    $( window ).resize(function() {
        let width = $(this).width()
        if(width < 991){
            sliderIcon();
        }
        console.log();
      });


    $('.toogle-menu').on('click', function(e){
      e.preventDefault();
      if($(this).hasClass('menu-btn')){
        $('.header-bottom .navigation').addClass('show');
        $(this).parent('.mobile-btns').addClass('show-menu');
      }else if($(this).hasClass('close-btn')){
        $('.header-bottom .navigation').removeClass('show');
        $(this).parent('.mobile-btns').removeClass('show-menu');
      }
    });


    $('.more-toogle').on('click', function(e){
      e.preventDefault();
      $(this).parent('.more-blc').toggleClass('open-text');
    })


    var step = $('.step-wrap-slide .step');
    var steps = step.length;
    var currentStep = 0;
    var prevStep = 0;


    // slide blc
    var width = $('.step-wrap').width();
    var slideBlc = $('.step-wrap-slide');
    
    function countPercent(){
      var percent = (100 / steps) * (prevStep + 1);
      $ ('.quiz-range .range span').css({
        'width' :  percent  + '%'
      });
      $ ('.quiz-range .quiz-range-num').text( parseInt(percent)  + '%');
    }
    function slide(numSlide){
      slideBlc.css({
        'transform' : 'translateX(-'+ width * numSlide +'px)'
      });
      countPercent();
    }

    for (let i = 0; i < steps - 1; i++) {
      var st = step[i];
      $(st).prop('step', i + 1);
    }

    $(document).on('change', 'input[type="radio"]', function(e){
      if($(this).hasClass('next-yes')){
        var nextStep = $(this).parents('.step').next('.step.double');
        nextStep.find('.q-yes').show();
      }else if($(this).hasClass('next-no')){
        var nextStep = $(this).parents('.step').next('.step.double');
        nextStep.find('.q-no').show();
      }
      var numStep  = $(this).parents('.step').prop('step');
      if(currentStep <= numStep ){
        prevStep = numStep;
        currentStep = numStep + 1;
        slide(prevStep);
      }else{
        return false;
      }
      
    })

    $(document).on('click', '.js-back', function(e){
      e.preventDefault();
      prevStep = prevStep - 1;
      currentStep = currentStep - 1;
      slide(prevStep);
      $('.step.double .quiz-main').hide();
      countPercent();
    })

    countPercent();
    cost();
    
    $(document).on('click', '.show-all-field',function(e){
      e.preventDefault();
      $(this).hide();
      $('.wrap-field').removeClass('hide-field');
    })

    function cost(){
      $('.cost span').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
      });
    }
    
    new WOW().init();

    $(document).on('click', '.custom-accordion .custom-accordion-header',function(e){
      e.preventDefault();
      var _this = $(this);

      if(_this.hasClass('open')){
        slideAccordin();
      }else{
        $('.custom-accordion-header').removeClass('open');
        $('.custom-accordion-content').slideUp();

        slideAccordin();
      }
      
      
      function slideAccordin(){
        _this.toggleClass('open');
        _this.siblings('.custom-accordion-content').slideToggle('300', function(){
          $('html, body').animate({
            scrollTop: _this.offset().top
          }, 400);
        });
      }
      

      
    })
    

    function tabs(){
      var wrap = $('.tabs');
      var link;
      var headerItem = wrap.find('.tab-header-item');
      var headerItemLink = headerItem.find('a');
      var select = wrap.find('.tabs .wrap-select select');

      var tabBody = wrap.find('.tab-body');
      var firstItem = headerItem.eq(0).find('a');

      headerItem.eq(0).find('a').addClass('active');
      tabBody.find(firstItem.data('link')).addClass('show');


      function changeTab(link){
        var headerLink = $('.tab-header-item a[data-link=' + link + ']');
        headerItemLink.removeClass('active');
        headerLink.addClass('active');
        

        $('.tabs .wrap-select select option[data-link=' + link + ']').attr('selected','selected');
      }
      
     $(document).on('click', '.tab-header-item a', function(e){
       e.preventDefault();
       link = $(this).data('link');
        tabBody.find('.tab-body-page').removeClass('show');

        changeTab(link);
        tabBody.find(link).addClass('show');
     })

     $(document).on('change', '.tabs .wrap-select select', function(e){ 
      var element = $(this).find('option:selected'); 
        link = element.data("link");

        tabBody.find('.tab-body-page').removeClass('show');
        tabBody.find(link).addClass('show');

        changeTab(link);
      })

    }

    tabs();
    
})