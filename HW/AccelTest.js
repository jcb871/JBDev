  var svcUrl = 'http://f00l.de/pastebin/api/create';
//var count = 0;
simply.on('singleClick', function(e) {
  //console.log(util2.format('single clicked $button!', e));
  if(e.button == 'select')
  { 
    simply.subtitle('Loading.'+svcUrl);
    simply.on('accelData',onAccelData);
  }  
});

 function onAccelData(e) {
  simply.subtitle('Loading...');
  //console.log(util2.format('Got $samples samples.', e));
  simply.off('accelData',onAccelData);
  var accData = '';
  for(var k=0;k<e.samples;k++)
  {
      var sample = e.accels[k];
      accData += String.format('{0},{1},{2},{3},{4}\n', sample.time, sample.vibe?1:0, sample.x, sample.y, sample.z);
  }
//count++
  simply.setText({subtitle:'sending...', body: accData});
         ajax({
                method: 'post',
                data: {name:'jcb871', title:'JAccel Data', text: 'accData is fetched', expire:30},
                 url: svcUrl}, function (data) {  
  simply.setText({subtitle:'sent '+ data});
                }
              );
                
}

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'? args[number] : match;
    });
  };
}

simply.setText({
  title: 'Accel Tester !',
  body: 'Press buttons or tap the watch!',
}, true);
simply.scrollable(true);

