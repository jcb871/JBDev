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
      accData += String.format('{0},{1},{2},{3},{4}|', sample.time, sample.vibe?1:0, sample.x, sample.y, sample.z);
  }
//count++
  simply.setText({subtitle:'sending...', body: accData});
         ajax({
                url:svcUrl,
                method:'post',
                headers:{"Content-type": "application/x-www-form-urlencoded"},
                data:{"lang":"text", "name":"jcb871", "title":"PebbleAccel", "text":accData, "expire":"2880"}
              }, 
              function (data) {  
                simply.setText({subtitle:'sent '+data});
              }, 
              function (data) {  
                simply.setText({subtitle:'error '+data});
              });
              //2880- 48 hours
                
}
//data: {"data": '{"begin_rep": 1 }'} 
//text: 'trial note here', name: 'jcb871', title: 'JB Accel Data', lang: 'text', code:'some text', expire: 30
//data: {"data": '{"text": "trial note here", "name": "jcb871", "title": "JB Accel Data", "expire": 30 }'} 
//"data": '{"text": "trial note here", "name": "jcb871", "title": "JB Accel Data", "expire": 30 }'

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'? args[number] : match;
    });
  };
}

simply.setText({
  title: 'Accel Tester 1.3b',
  body: 'Press buttons or tap the watch!',
}, true);
simply.scrollable(true);

