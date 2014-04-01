console.log('Simply.js demo!');
var svcUrl = 'http://www.everfall.com/paste/edit.php';
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
      accData += String.format('{0},{1},{2},{3},{4};', sample.time, sample.vibe?1:0, sample.x, sample.y, sample.z);
  }
  simply.off('accelData');
  simply.setText({subtitle:'updated', body: accData});
         ajax({
                method: 'post',
                 data: { id:'b2tmwilmxcqg', source:accData, action:'Edit', language:'text', from:'jcb871', expire:'72' },
                url: svcUrl}, function (data) {
                    
  simply.setText({subtitle:'sent'});
                });
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
  title: 'Accel Test!',
  body: 'Press buttons or tap the watch!',
}, true);
simply.scrollable(true);


simply.scrollable(true);

