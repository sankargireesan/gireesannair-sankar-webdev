  $('a[href*=#]').click(function()
    {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            && location.hostname == this.hostname)
        {
            var $target = $(this.hash);
            $target = $target.length && $target
                || $('[name=' + this.hash.slice(1) +']');
            if ($target.length)
            {
                if( $('.header').hasClass('fixed') )
                {
                    var targetOffset = $target.offset().top - $('.header').height() - 20;
                }
                else
                {
                    var targetOffset = $target.offset().top - 2 * $('.header').height() - 45;
                }

                $('html,body')
                    .animate({scrollTop: targetOffset}, 1000);
                return false;
            }
        }
    });
