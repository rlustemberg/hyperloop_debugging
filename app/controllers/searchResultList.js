// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const {args} = $;

(function constructor() {
  Alloy.Collections.gif.reset([]);
  Alloy.Collections.gif.reset(args.mediaArray);
})();
function cleanup() {
  Alloy.Collections.gif.reset([]);
  $.off();
  $.destroy();
  try {
    $.window.removeAllChildren();
  } catch (e) {
    console.log('already dealloc', e);
  }
}
