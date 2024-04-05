(function ($) {
  ("use strict");
  // variables
  var header = $(".header"),
    layout = $(".layout");
  // preloader

  if ($(".departments__list").length) {
    $(".departments__list").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      vertical: true,
    });
    if ($(window).width() > 580) {
      const departments = $(".departments__list"),
        slider = $(".departments__list");
      departments.on("wheel", function (e) {
        e.preventDefault();
        if (e.originalEvent.deltaY >= 0) {
          slider.slick("slickNext");
        } else {
          slider.slick("slickPrev");
        }
      });
    }
  }

  // Menu
  navInit();
  function navInit() {
    header.find(".burger, .nav__link").on("click", function () {
      $(this).closest(header).toggleClass("header_menu-active");
    });

    // modal hide
    $(document).mouseup(function (e) {
      if ($(".header_menu-active").length) {
        var div = $(".header");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
          header.removeClass("header_menu-active");
        }
      }
    });

    // modal hide
    $(window).keydown(function (e) {
      if (e.key === "Escape") {
        header.removeClass("header_menu-active");
      }
    });
  }

  // Validation & customize form
  if ($("form").length) {
    // validation init
    formValidation();

    function formValidation() {
      let form = $("form");
      form.submit(function () {
        if ($(this).valid()) {
          return true;
        } else {
          return false;
        }
      });
      form.validate({
        rules: {
          name: {
            required: true,
            name: true,
          },
          phone: {
            required: true,
          },
        },
      });
    }
  }
  // Scroll
  linkScroll();
  function linkScroll() {
    $('a[href^="#"]:not([href="#"])').click(function (e) {
      e.preventDefault();
      var target = $($(this).attr("href"));
      if (target.length) {
        var scrollTo = target.offset().top;
        $("body, html").animate({ scrollTop: scrollTo + "px" }, 800);
      }
    });
  }

  // PARTNERS
  if ($(".layout__partners").length) {
    partnersCarousel();
  }

  function partnersCarousel() {
    let w = $(window).width();
    $(".partners__list").each(function () {
      if ($(window).width() > 768) {
        let content = $(this).html();
        if ($(this).find(".partners__item").length < 100) {
          $(this).html($(this).html() + content);
          partnersCarousel();
        } else {
          $(this).css(
            "animation-duration",
            $(this).find(".partners__item").length / 2 + "s"
          );
        }
      }
    });
  }
})(jQuery);
