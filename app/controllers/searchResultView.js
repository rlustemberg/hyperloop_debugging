// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const {args} = $;
(function constructor() {
  $.gifImage.image = args.gifUrl;
  $.title.text = args.title;
})();
