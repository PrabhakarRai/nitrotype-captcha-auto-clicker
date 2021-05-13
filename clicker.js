"use strict"

let minInterval = 25;
chrome.storage.sync.get("sleepTime", ({ sleepTime }) => {
  minInterval = sleepTime;
});

var sid = setInterval(function () {
  console.log('minInterval', minInterval);
  console.log('trying');
  if (
    window.location.href
      .match(/https:\/\/www.google.com\/recaptcha\/api\d\/anchor/) &&
    $("#recaptcha-anchor div.recaptcha-checkbox-checkmark")
      .length &&
    $("#recaptcha-anchor div.recaptcha-checkbox-checkmark")
      .is(':visible') &&
    isScrolledIntoView($("#recaptcha-anchor div.recaptcha-checkbox-checkmark")
      .get(0))
  ) {
    var execute = true;
    console.log('first if passed');
    if (localStorage.getItem('accesstime')) {
      console.log('second if passed');
      let timeNow = new Date().getTime();
      let timeLastExecuted = localStorage.getItem('accesstime') | 0;
      let minIntervalMs = minInterval * 60 * 1000;
      if (timeNow - timeLastExecuted < minIntervalMs) {
        console.log('time is less from prev click');
        execute = false;
      }
    }

    if (execute) {
      console.log('clicked');
      $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").click();
      localStorage.setItem('accesstime', new Date().getTime());
    }
    clearInterval(sid);
    location.href = 'https://www.nitrotype.com/race';
  }
}, 10000);