

$.Fader = function (el) {
  this.$el = $(el);
  this.$el.on("click", "a.project-link", this.fade.bind(this));
  this.$el.on("click", "a.back-link", this.goBack.bind(this));
};

$.fn.fader = function () {
  return this.each( function () {
    new $.Fader(this);
  });
};

$.Fader.prototype.fade = function (event) {
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

$.Fader.prototype.goBack = function(event) {
  var $section, $prev;

  event.preventDefault();
  $prev = $(".project-index");
  $section = $(event.currentTarget).parents('.project');

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
    $prev
      .removeClass("vanish")
      .addClass("show");
  })
};
