/**
 * option.js
 **/

$("#options_width").attr("value", osujs.settings.width);
$("#options_height").attr("value", osujs.settings.height);
$("#options_offset").attr("value", osujs.settings.offset);
$("#options_key_x").attr("value", String.fromCharCode(osujs.settings.key_x));
$("#options_key_z").attr("value", String.fromCharCode(osujs.settings.key_z));

//option tab behaviour
$("#options_width").bind("input", function (e) {
  osujs.settings.set("width", parseInt($(this).val(), 10));
});
$("#options_height").bind("input", function (e) {
  osujs.settings.set("height", parseInt($(this).val(), 10));
});
$("#options_offset").bind("input", function (e) {
  osujs.settings.set("offset", parseInt($(this).val(), 10));
});
$("#options_key_x").bind("keydown", function (e) {
  this.value = String.fromCharCode(e.keyCode);
  osujs.settings.set("key_x", e.keyCode);
});
$("#options_key_z").bind("keydown", function (e) {
  this.value = String.fromCharCode(e.keyCode);
  osujs.settings.set("key_z", e.keyCode);
});
