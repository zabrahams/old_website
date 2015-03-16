$.Slider = function (el) {
  this.sliding = false;
  this.$el = $(el);
  this.$el.on('click', 'a', this.slide.bind(this));
};

$.fn.slider = function () {
  return this.each(function () {
    new $.Slider(this);
  });
};

$.Slider.prototype.slide = function (event) {
  var $anchor, pageName, $old, $section, slider;

  slider = this;

  if (this.sliding === false) {
    event.preventDefault();
    $anchor = $(event.currentTarget);
    pageName = $anchor.data("page");
    $section = $("." + pageName);
    $old = $('.in');

    if (!$section.is($old)) {
      slider.sliding = true;
      $old
        .addClass("out")
        .removeClass("in");

      $section
        .addClass("in")
        .removeClass("reset")

      window.setTimeout(function (){
        slider.sliding = false;
      }, 500);

      $section.one("transitionend", function () {
        $old
          .removeClass("out")
          .addClass("reset");
      });
    }
  }
};
