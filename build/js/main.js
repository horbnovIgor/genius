(function ($) {
  ("use strict");
  // variables
  var header = $(".header"),
    layout = $(".layout");
  // preloader

  // if ($(".departments__list").length) {
  //   $(".departments__list").slick({
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     arrows: false,
  //     vertical: true,
  //   });
  //   if ($(window).width() > 580) {
  //     const departments = $(".departments__list"),
  //       slider = $(".departments__list");
  //     departments.on("wheel", function (e) {
  //       e.preventDefault();
  //       if (e.originalEvent.deltaY >= 0) {
  //         slider.slick("slickNext");
  //       } else {
  //         slider.slick("slickPrev");
  //       }
  //     });
  //   }
  // }
  if ($(".departments__list").length) {
    let scroll = 0;
    $("body").on("wheel", function (e) {
      scroll = scroll + e.originalEvent.deltaY;

      if (scroll > 500 || scroll < -500) {
        if (
          !$(".departments__list").is(e.target) &&
          $(".departments__list").has(e.target).length === 0
        ) {
          $("html,css").css("overflow", "auto");
        } else {
          $("html,css").css("overflow", "hidden");
          if (e.originalEvent.deltaY >= 0) {
            if ($(".departments__item_active").index() !== 2) {
              $(".departments__list")
                .find(".departments__item_active")
                .removeClass("departments__item_active")
                .next(".departments__item")
                .addClass("departments__item_active");
            } else {
              $("html,css").css("overflow", "auto");
            }
          } else {
            if ($(".departments__item_active").index() !== 0) {
              $(".departments__list")
                .find(".departments__item_active")
                .removeClass("departments__item_active")
                .prev(".departments__item")
                .addClass("departments__item_active");
            } else {
              $("html,css").css("overflow", "auto");
            }
          }
        }
        scroll = 0;
      }
    });
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

  // CASES
  if ($(".layout__cases").length) {
    cases();
  }

  function cases() {
    $(".cases__link").on("mouseover", function () {
      $(this).find("video").attr("src", $(this).find("video").attr("data-src"));
    });
  }

  // ABOUT
  if ($(".layout__about").length) {
    about();
  }

  function about() {
    $(".about__init").on("click", function () {
      $(".layout__about").toggleClass("layout__about_play");
      $(this)
        .siblings(".about__video")
        .attr("src", $(this).siblings(".about__video").attr("data-src"));
    });
  }
})(jQuery);
