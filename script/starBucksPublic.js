(function($, window){

    var starBucksPublic = {
          init: function(){
              this.header();
              this.goTop();
          },
          header:function(){
              //통합검색 버튼 클릭 이벤트
              $('.find-btn').on({
                  click: function(){
                      $('.find-box').toggleClass('addInput');
                  }
              });
  
              //네비게이션 : 메인메뉴의 마우스 이벤트
              $('.main-btn').on({
                  mouseenter: function(){
                    $('.main-btn').removeClass('addCurrent');
                    $(this).addClass('addCurrent');
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(600,'easeOutExpo');
                  }
              });
  
              //네비게이션을 마우스가 떠나면 
              //모두 초기화
              $('#nav').on({
                  mouseleave: function(){
                    $('.main-btn').removeClass('addCurrent');
                    $('.sub').stop().slideUp(600,'easeOutExpo');
                  }
              });
          },
          goTop: function(){
            //버튼클릭 이벤트
            // 스무스 스크롤링 
            $('.go-top-btn').on({
              click:  function(){
                 $('html, body').stop().animate({ scrollTop: 0 }, 600,'easeInOutExpo');
              }
            });
  
  
  
            $('.go-top').stop().fadeOut(1000);
  
            $(window).scroll(function(){
                if( $(window).scrollTop() >=100 ){
                    $('.go-top').stop().fadeIn(1000);
                }
                else{
                    $('.go-top').stop().fadeOut(1000);
                }
            });
  
          }
          
    }  
    
    starBucksPublic.init();  //스타벅스 객체 init() 메서드 실행
  
  
  })(jQuery, window);