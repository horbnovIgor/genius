(function ($) {
  ("use strict");
  // variables
  var header = $(".header"),
    layout = $(".layout");
  // preloader
  preloader();
  function preloader() {
    layout.on("click", ".nav__link", function (event) {
      layout.removeClass("layout_ready-load");
      event.preventDefault();
      var linkLocation = this.href;
      setTimeout(function () {
        window.location = linkLocation;
      }, 500);
    });
    setTimeout(function () {
      layout.addClass("layout_ready-load");
    }, 0);
  }

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
    header.find(".burger").on("click", function () {
      $(this).closest(header).toggleClass("header_menu-active");
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
    });
  }
})(jQuery);
