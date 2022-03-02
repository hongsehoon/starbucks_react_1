(function($, window){

  let starBucks = {
        init: function(){
            this.header();
            this.section1();
            this.section2Notice();  //cnt  mainSlide() ... 변수, 함수 충돌
            this.section2Slide();            //
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.quickMenu();
        },
        header:function(){
           //모바일 버튼 이벤트
           $('.berger-btn').on({
            click: function(){
                $('#mobileNav').addClass('addMobile');
                $('.mobile-container').stop().animate({left:0}, 400);
            }
          });

          $('.mobile-close').on({
            click: function(){
              $('.mobile-container').stop().animate({left:110+'%'}, 400, function(){
                  $('#mobileNav').removeClass('addMobile');
              });                  
            }
          });
          
          $('.mobile-container li a').on({
              click: function(){
                $(this).next('div').slideToggle(300);
              }
          });

        },
        
        section1: function(){
           //애니메이션 페이드 인효과
           function ani(){
              $('.img').eq(0).stop().animate({opacity:1},1000, function(){
                  $('.img').eq(1).stop().animate({opacity:1},1000, function(){
                      $('.img').eq(2).stop().animate({opacity:1},1000, function(){
                          $('.img').eq(3).stop().animate({opacity:1},1000, function(){
                              $('.img').eq(4).stop().animate({opacity:1},1000);
                          });
                      });
                  });
              });
           }
           setTimeout(ani, 1000);
           
        },
        section2Notice: function(){
          let cnt = 0;

              // 1. 메인 슬라이드 함수
              function mainSlide(){
                  $('.notice')                   .css({zIndex:1}).stop().animate({top:24},0);
                  $('.notice').eq(cnt==0?4:cnt-1).css({zIndex:2}).stop().animate({top: 0},0);
                  $('.notice').eq(cnt)           .css({zIndex:3}).stop().animate({top:24},0).animate({top:0},1000);
              }

              // 2. 다음 카운트 함수
              function nextCount(){
                  cnt++;  //1 2 3 4 0 1 2 3 4 
                  if(cnt>4){cnt=0}
                  mainSlide();
              }
              
              // 3. 자동타이머 함수(셋인터발)
              function autoTimer(){
                  setInterval(nextCount, 3000);
              }

              setTimeout(autoTimer, 100);

        },


        section2Slide: function(){
            let cnt = 0;
            let setId = null;
            let winW = $(window).innerWidth()*0.9;    //창너비의 90% 크기
                // 반응형             
                function resizeFn(){
                    if( $(window).innerWidth()<=819 ){
                      winW = $(window).innerWidth()*0.9;
                    }
                    else{
                      winW = 819;
                    }                   
                    $('.slide').css({width: winW }); //슬라이드 너비
                    mainSlide(); //실시간으로 메인슬라이드 연동 반응 즉각
                }
                resizeFn();
                $(window).resize(function(){
                    resizeFn();
                });  
                      
            //메인슬라이드함수
                function mainSlide(){
                   $('.slide-wrap').stop().animate({left:-winW*cnt}, 500, function(){
                       if(cnt>2){cnt=0}
                       if(cnt<0){cnt=2}
                       $('.slide-wrap').stop().animate({left:-winW*cnt}, 0);
                       $('.slide').removeClass('addCurrent');        
                       $('.slide').eq(cnt+1).addClass('addCurrent');  
                   });
                   pageEvent();
                }                              
                //함수
                //넥스트카운트함수
                function nextCount(){
                  cnt++;
                  mainSlide(); //버튼클릭떄사용
                }
                //프리뷰카운트함수
                function prevCount(){
                  cnt--;
                  mainSlide(); //버튼클릭떄사용
                }

                //자동타이머함수
                function autoTimer(){
                  setId = setInterval(nextCount, 3000);
                }
                //오토타이머
                //setTimeout(autoTimer,10);

               //페이지 이벤트 함수
                function pageEvent(){               
                  $('.page-btn').children().attr('src','./images/main_prom_off.png')
                  $('.page-btn').eq(cnt==3?0:cnt).children().attr('src','./images/main_prom_on.png')
                }

               $('.page-btn').each(function(idx){
                  $(this).on({
                    click: function(e){
                      e.preventDefault();
                      cnt = idx;
                      mainSlide();
                      stopFn()
                    }
                  });
               });

               //일시정지와 플레이버튼 클릭 이벤트
                function stopFn(){
                  $('.play-btn').children().attr('src','./images/main_prom_play.png');//플레이버튼이미지
                  $('.play-btn').removeClass('on');  //삭제
                  $('.play-btn').addClass('off');    //꺼짐 
                  // 슬라이드 정치
                  clearInterval(setId);
                   }
                function playFn(){
                $('.play-btn').children().attr('src','./images/main_prom_stop.png');//스탑버튼이미지
                $('.play-btn').removeClass('off');   //삭제
                $('.play-btn').addClass('on');      //꺼짐 
                    autoTimer();
                  }

                 $('.play-btn').on({
                   click: function(e){
                     e.preventDefault();                  
                        if( $(this).hasClass('on') ){ 
                          stopFn();//참이면 스톱
                        }
                        else{
                          playFn();//참이면 플레이
                        }
                   }
                 });
                  //넥스트 버튼 클릭 이벤트
                  $('.next-btn').on({
                    click: function(e){
                      e.preventDefault();
                      nextCount();//다음 카운트 함수
                      stopFn(); //멈추게
                    }
                  });                 
                 //프리뷰버튼 클릭 이벤트
                 $('.prev-btn').on({
                  click: function(e){
                    e.preventDefault();
                    prevCount();//이전 카운트 함수
                    stopFn();
                  }
                });
                
                // 프로모션 버튼 클릭 이벤트 업다운
                $('.promotion-btn').on({
                  click: function(e){
                    e.preventDefault();

                    if( $(this).hasClass('close') ){ //열기
                      $('#slide').stop().slideDown(600);
                      $(this).removeClass('close');
                      playFn();//플레이
                    }

                    else{ //닫기
                      $('#slide').stop().slideUp(600);
                      $(this).addClass('close');
                      stopFn();//정지
                      cnt=0;
                      mainSlide(); //처음으로 초기화
                    }                   
                  }
                });

                // 슬라이드 랩 박스 위에 마우스 있을시 슬라이드 정지
                // 슬라이드 랩 박스 위에 마우스 떠나면 슬라이드 재실행
                $('.slide-wrap').on({
                  mouseenter: function(){
                    e.preventDefault(e);
                    stopFn();                 
                  },
                  mouseleave: function(){
                    e.preventDefault(e);
                    playFn();                  
                  },
                });
        },
     
        section4: function(){      
           $(window).scroll(function(){//스크롤이벤트 : 페럴럭스 애니메이션 효과
           
            if($(window).scrollTop()==0){//초기화
              $('#section4').removeClass('addAni');
             }
            if($(window).scrollTop()>400){
              $('#section4').addClass('addAni');
             }
            
           });
        },
        section5: function(){
          // 변수
          let sec3Top = $('#section3').offset().top-200; 

          $(window).scroll(function(){
           //스크롤이 탑에있으면 섹션5 addClass 멈춰라
            if($(window).scrollTop() == 0) {
              $('#section5').removeClass('addFadein');
            }
            //스크롤이 탑에있으면 섹션5 addClass실행
            if($(window).scrollTop() >= sec3Top){
              $('#section5').addClass('addFadein');
            }
          });
        },
        section6: function(){
          //변수
          let sec4Top = $('#section4').offset().top;
          
          $(window).scroll(function(){
           //스크롤이 섹션4위에있으면 섹션6 addClass 리무브
            if($(window).scrollTop()==0){sec4Top
              $('#section6').removeClass('addAni')
            }
            //스크롤이 섹션4에있으면 섹션6 addClass 실행
            if($(window).scrollTop()>= sec4Top){
              $('#section6').addClass('addAni')
            }
          });
        },
        section7: function(){
            let sec6Top = $('#section6').offset().top;
            
            $(window).scroll(function(){
             
              if($(window).scrollTop()==0){sec6Top
                $('#section7').removeClass('addFade')
              }
              if($(window).scrollTop()>= sec6Top){
                $('#section7').addClass('addFade')
              }
            });
        },
        section8: function(){
           let sec6Top = $('#section6').offset().top+200;
            
            $(window).scroll(function(){
             
              if($(window).scrollTop()==0){sec6Top
                $('#section8').removeClass('addAni')
              }
              if($(window).scrollTop()>= sec6Top){
                $('#section8').addClass('addAni')
              }
            });
            //반응형
            let leftW=null;
            let leftH=null;

            function leftResize(){

              winW = $(window).innerWidth();          
              if( winW <= 960 ){    // 창너비가 
                leftW = winW * 0.38125;                 
                leftH = leftW * 0.85246; //높이 = 너비*비율(85.246%)
              }
              else{
                leftW = 366;
                leftH = 312;
              }
              $('#section8 .left').css({ width:leftW, height:leftH });

            }
            leftResize();

            $(window).resize(function(){
              leftResize();
            });
        },
      
        
        quickMenu: function(){
            // let quicTop = (창높이에서 - 퀵메뉴박스높이)/2;
            let quicTop1 = ($(window).height() - 96)/2;
            let quicTop2 = 150;
                
                function quickMenuFn(){
                  $('.quick-menu').stop().animate({top: $(window).scrollTop() + quicTop2 }, 600, "easeOutExpo");
                }                               
            
                quickMenuFn(); //로딩시

            $(window).scroll(function(){
                quickMenuFn();
            });
        },
     
     
}
       
  
  
  
  starBucks.init();


})(jQuery, window);