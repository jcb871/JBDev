var request_url = 'http://192.168.56.1:8080/press_177';
simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  simply.subtitle('about to start ajaxing...!');
  if(e.button == 'select')
  {
  simply.subtitle('now ajaxing...!');
  var req = new XMLHttpRequest();
	req.open('GET', request_url, true);
	req.onload = function(e) {
		if (req.readyState == 4) {
			// 200 - HTTP OK
			if(req.status == 200) {
				console.log(req.responseText);
				simply.subtitle("Server success");
				simply.body("Response:"+req.responseText);
			} else {
				console.log("Request returned error code " + req.status.toString());
				simply.body("Server error:"+req.status.toString());
			}
		}
	};
	req.send(null);
  /*
  ajax({ method: 'get', url: svcUrl}, 
        function (data) {
          simply.vibe();
          simply.body('sent ' + data);
        }
      );*/
  }

});
/*
simply.on('longClick', function(e) {
  console.log(util2.format('long clicked $button!', e));
  simply.vibe();
  simply.scrollable(e.button !== 'select');
});

simply.on('accelTap', function(e) {
  console.log(util2.format('tapped accel axis $axis $direction!', e));
  simply.subtitle('Tapped ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});*/

simply.setText({ title: 'Simply stream it!',  body: 'This is Streamer. Press button'}, true);
