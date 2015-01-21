(function () {
  if (typeof Move === "undefined") {
    window.Move = {}
  }

  Move.slide = slide =  function (event) {
    var $anchor, pageName, $old, $section;

    event.preventDefault();
    $anchor = $(event.currentTarget);
    pageName = $anchor.data("page");
    $section = $("." + pageName);
    $old = $('.in');


    if (!($section === $old)) {
      $old
        .addClass("out")
        .removeClass("in");

      $section
        .addClass("in")
        .removeClass("reset")
      console.log($old);

      $old.one("trasitionend", Move.reset($old));
    }
  };

  Move.reset = reset = function ($el) {
    console.log("reseting?")
    $el
      .removeClass("out")
      .addClass("reset");
  };

  Move.fade = fade = function (event) {
    var $anchor, pageName, $section, $old;

    event.preventDefault();
    $anchor = $(event.currentTarget);
    pageName = $anchor.data('page');
    $section = $("." + pageName);
    $old = $(".projects");
    Move.$back = $old

    $old.addClass("vanish");
    $section
      .removeClass("hide")
      .addClass("vanish");
    $old.one("transitionend", function () {
      $old
        .addClass("hide")
        .removeClass("vanish");
      $section.removeClass("vanish");
    })
  };

  Move.goBack = goBack = function(event) {
    console.log("in go back");
    var $section, $prev;

    event.preventDefault();
    $prev = Move.$back;
    delete Move.$back;
    $section = $(event.currentTarget).parent();

    $section.addClass("vanish");
    $prev.
      addClass("vanish")
      .removeClass("hide");
    $section.one("transitionend", function () {
      $section
        .addClass("hide")
        .removeClass("vanish");
      $prev.removeClass("vanish");
    })
  };

}());

$(function () {
  $("nav a").on("click", Move.slide);
  $("a.project-link").on("click", Move.fade);
  $("a#back-link").on("click", Move.goBack);
});
