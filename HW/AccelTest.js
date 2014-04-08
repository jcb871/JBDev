var svcUrl = 'http://paste.ubuntu.com/';
simply.on('singleClick', function(e) {
  //console.log(util2.format('single clicked $button!', e));
  if(e.button == 'select')
  {   simply.subtitle('Loading...');
    simply.on('accelData', function(e) {

  //console.log(util2.format('Got $samples samples.', e));
  var accData = '';
  for(var k=0;k<e.samples;k++)
  {
      var sample = e.accels[k];
      accData += String.format('{0},{1},{2},{3},{4};', sample.time, sample.vibe?1:0, sample.x, sample.y, sample.z);
  }
  simply.setText({subtitle:'updated', body: accData});/*
         ajax({
                method: 'post',
                data: {poster:'jcb871', content: accData, syntax:'text'},
                url: svcUrl}, function (data) {
                    
  simply.setText({subtitle:'sent'});
                });*/
   });
   
  simply.off('accelData');
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
  title: 'Accel Tester!',
  body: 'Press buttons or tap the watch!',
}, true);
simply.scrollable(true);

