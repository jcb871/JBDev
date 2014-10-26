var svcUrl = 'http://192.168.56.1:8080/press_177';
simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  simply.subtitle('about to start ajaxing...!');
  if(e.button == 'select')
  {
  simply.subtitle('now ajaxing...!');
  ajax({ method: 'get', url: svcUrl}, 
        function (data) {
          simply.vibe();
          simply.body('sent ' + data);
        }
      );
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
