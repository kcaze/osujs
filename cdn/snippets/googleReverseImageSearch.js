/*
 * JavaScript Google Reverse Image Search 1.0
 *
 * Copyright 2014, Herman Chau
 *
 */

// Given an imageBlob, reverse google image searches the blob and calls callback with the appropriate URL
function googleReverseImageSearch(imageBlob, callback) {
  var xhr = new XMLHttpRequest();
  var fd = new FormData();

  fd.append("encoded_image", imageBlob, "");

  xhr.open("POST", "http://images.google.com/searchbyimage/upload");
  xhr.send(fd);

  //need to assign callback to xhr
}
