$(document).ready(function(){
            // alert()
            $('.navbar_menuIcon__zWNv0').click(function(){
            // alert()
               $('#navlinkParent').css('right','0px');
            })
            
            $('.navbar_crossed__tytRa').click(function(){
            // alert()
               // $('#navlinkParent').removecss('right','0px');
               $('#navlinkParent').removeAttr('style');
            })
         })
         var num = 200; //number of pixels before modifying styles

         $(window).bind('scroll', function () {
             if ($(window).scrollTop() > num) {
                 $('.navbar_navbarParent__BM6Am').addClass('navbar_navbarColored__A0hPq');
                 $('.navbar_riLogo__uvPOL').attr('src','_next/static/media/ri-color.00b5d9db.png');
                 $('.navbar_mdioLogo__zCCVL').attr('src','_next/static/media/rsamdio-logo-cranberry.c82080e3.png');
                 
             } else {
                 $('.navbar_navbarParent__BM6Am').removeClass('navbar_navbarColored__A0hPq');
                 $('.navbar_riLogo__uvPOL').attr('src','./Home_files/ri.11da4221.png');
                 $('.navbar_mdioLogo__zCCVL').attr('src','./Home_files/rsamdio-logo-white.b303dfaf.png');
                 
             }
         });
