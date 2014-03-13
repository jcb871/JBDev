console.log('Simply.js demo!');

simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  if(e.button == 'select')
  { 
    simply.on('accelData', function(e) {
  simply.subtitle('Loading...');
  console.log(util2.format('Got $samples samples.', e));
  var accData = '';
  for(var k=0;k<e.samples;k++)
  {
      var sample = e.accels[k];
      accData += String.format('({0},y:{1},z:{2})\n', sample.x, sample.y, sample.z);
  }
  simply.setText({subtitle:'updated', body: accData});
  simply.off('accelData');
   });
  }  
});

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'? args[number] : match;
    });
  };
}

simply.setText({
  title: 'Accel Demo!',
  body: 'Press buttons or tap the watch!',
}, true);
simply.scrollable(true);

