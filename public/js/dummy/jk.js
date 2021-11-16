<script src="js/jquery.min.js"></script>
<script src="js/jquery-migrate-3.0.0.js"></script>
<!-- Popper JS -->
<script src="js/popper.min.js"></script>
<!-- Bootstrap JS -->
<script src="js/bootstrap.min.js"></script>
<!-- Modernizr JS -->
<script src="js/modernizr.min.js"></script>
<!-- ScrollUp JS -->
<script src="js/scrollup.js"></script>
<!-- FacnyBox JS -->
<script src="js/jquery-fancybox.min.js"></script>
<!-- Cube Portfolio JS -->
<script src="js/cubeportfolio.min.js"></script>
<!-- Slick Nav JS -->
<script src="js/slicknav.min.js"></script>
<!-- Slick Nav JS -->
<script src="js/slicknav.min.js"></script>
<!-- Slick Slider JS -->
<script src="js/owl-carousel.min.js"></script>
<!-- Easing JS -->
<script src="js/easing.js"></script>
<!-- Magnipic Popup JS -->
<script src="js/magnific-popup.min.js"></script>
<!-- Active JS -->
<script src="js/active.js"></script>
<script>
    $(function () {
        var fx = function fx() {
            $(".stat-number").each(function (i, el) {
                var data = parseInt(this.dataset.n, 10);
                var props = {
                    "from": {
                        "count": 0
                    },
                    "to": {
                        "count": data
                    }
                };
                $(props.from).animate(props.to, {
                    duration: 1000 * 1,
                    step: function (now, fx) {
                        $(el).text(Math.ceil(now));
                    },
                    complete: function () {
                        if (el.dataset.sym !== undefined) {
                            el.textContent = el.textContent.concat(el.dataset.sym)
                        }
                    }
                });
            });
        };

        var reset = function reset() {
            //console.log($(this).scrollTop())
            if ($(this).scrollTop() > 90) {
                $(this).off("scroll");
                fx()
            }
        };

        $(window).on("scroll", reset);
    });
</script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<script src="build/jquery.runner.js"></script>
<script>

    $('#runner').runner({
    
        countdown:true,
    
        startAt: 30000,
    
        stopAt: 0
    
    }).on('runnerFinish',function(eventObject, info) {
    
        alert('Finished!');
    
    });
    
    </script>
    