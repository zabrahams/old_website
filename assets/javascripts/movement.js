(function () {
  if (typeof Move === "undefined") {
    window.Move = {}
  }


  Move.slide = slide =  function (event) {
    var $anchor, pageName, $old, $section;

    if (Move.sliding === false || typeof Move.sliding === "undefined") {
      event.preventDefault();
      $anchor = $(event.currentTarget);
      pageName = $anchor.data("page");
      $section = $("." + pageName);
      $old = $('.in');


      if (!($section === $old)) {
        Move.sliding = true;
        $old
          .addClass("out")
          .removeClass("in");

        $section
          .addClass("in")
          .removeClass("reset")

        window.setTimeout(function (){
          Move.sliding = false;
        }, 500);

        $section.one("transitionend", function () {
          $old
            .removeClass("out")
            .addClass("reset");
        });
      }
    }
  };


  Move.fade = fade = function (event) {
    var $anchor, pageName, $section, $old;

    event.preventDefault();
    $anchor = $(event.currentTarget);
    pageName = $anchor.data('page');
    $section = $("." + pageName);
    $old = $(".project-index");

    $old
      .addClass("vanish")
      .removeClass("show");
    $section
      .removeClass("hide")
      .addClass("vanish");
    $old.one("transitionend", function () {
      $old
        .addClass("hide")
        .removeClass("vanish");
      $section
      .removeClass("vanish")
      .addClass("show");
    })
  };

  Move.goBack = goBack = function(event) {
    console.log("in go back");
    var $section, $prev;

    event.preventDefault();
    $prev = $(".project-index");
    $section = $(event.currentTarget).parents('.project');
    console.log($section);

    $section
      .addClass("vanish")
      .removeClass("show");
    $prev
      .addClass("vanish")
      .removeClass("hide");
    $section.one("transitionend", function () {
      $section
        .addClass("hide")
        .removeClass("vanish");
      console.log("start!");
      $prev
        .removeClass("vanish")
        .addClass("show");
    })
  };

}());

$(function () {
  $("nav a").on("click", Move.slide);
  $("a.project-link").on("click", Move.fade);
  $("a.back-link").on("click", Move.goBack);
});
