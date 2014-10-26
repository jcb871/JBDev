var request_url = 'http://192.168.1.117:8080/accel';

function sendData(data)
{
 var req = new XMLHttpRequest();
 var params = "?data=" + encodeURIComponent(data);
 var svcUrl = request_url+params;
	req.open('GET', svcUrl, true);
	req.onload = function(e) {
		if (req.readyState == 4) {
			// 200 - HTTP OK
			if(req.status == 200) {
				//console.log(req.responseText);
				//simply.subtitle("Server success");
				//simply.body("Response:"+req.responseText);
			} else {
				//console.log("Request returned error code " + req.status.toString());
				simply.body("Server error:"+req.status.toString());
			}
		}
	};
	req.send();
}

var onAccelData = function(e) {
  var data = JSON.stringify(e.accel);
  simply.body('data: ' + data);
  sendData(data);
};
 
// Press up to begin accelData streaming
// Pressing up multiple times will register the handler more than once so be careful. 
simply.on('singleClick', 'up', function(e) {
  simply.on('accelData', onAccelData);
});
 
// Press down until all accelData handlers are removed and you can accelPeek again
simply.on('singleClick', 'down', function(e) {
  simply.off('accelData', onAccelData);
});

 // Press select to accelPeek
simply.on('singleClick', 'select', function(e) {
  if (simply.accelConfig().subscribe) {
    // accelData and accelPeek can't happen simultaneously
    return;
  }
  simply.accelPeek(function(e) {
  	var data = JSON.stringify(e.accel);
  	simply.body('peek: ' + data);
  	sendData(data);
  });
});

simply.setText({ title: 'Simply stream it!',  body: 'This is Streamer. Press button'}, true);
