console.log('Simply.js demo!');
var isFromOffice = true;
var tripInfo;
var urlBPOffice = 'http://services.commuterapi.com/TransitODataService.svc/GeoAreas(\'29.7838277%7C-95.6352798%7C0.2\')/NextArrivals?%24expand=Stop&%24select=IsRealTime%2CDestinationName%2CStopName%2CArrivalTime%2CRouteName&key=65CFF0BB-8CCB-4FB2-BDB7-70B8E48DDDC6&%24format=json';
var urlPKWY = 'http://services.commuterapi.com/TransitODataService.svc/GeoAreas(\'9.7838277%7C-5.6352798%7C0.2\')/NextArrivals?%24expand=Stop&%24select=IsRealTime%2CDestinationName%2CStopName%2CArrivalTime%2CRouteName&key=65CFF0BB-8CCB-4FB2-BDB7-70B8E48DDDC6&%24format=json';
var svcUrl = isFromOffice ? urlBPOffice : urlPKWY;
var txtNextTrip;
var isNextTrip;
var direction = isFromOffice ? 'To Home' : 'To Office';
simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  isFromOffice = !isFromOffice;
  direction = isFromOffice ? 'To Home' : 'To Office';
  simply.title(direction);
});

simply.on('accelTap', function(e) {
  console.log(util2.format('tapped accel axis $axis $direction!', e));
  /*
  navigator.geolocation.getCurrentPosition(function(pos) {
  var coords = pos.coords;
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?' +
      'lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=metric';
  ajax({ url: weatherUrl, type: 'json' }, function(data) {
    simply.text({ title: data.name, subtitle: data.main.temp });
  });
});
  */
  simply.subtitle('Loading Trip Info...');
   ajax({
                type: 'json',
                url: svcUrl}, function (data) {
                    simply.subtitle('Reading Trip Info...');
                    isNextTrip = true;
                    for (var k = 0; k < data.d.results.length; k++) {
                        var trip = data.d.results[k];

                        if (trip.RouteName != '075')
                            continue;
                        if (trip.DestinationName == 'SOUTHBOUND to MISSION BEND PR' && isFromOffice) {
                            trip.JBDest = 'To Home';
                        }
                        else if (trip.DestinationName == 'NORTHBOUND to ADDICKS PR' && !isFromOffice) {
                            trip.JBDest = 'To Office';
                        }
                        else {
                            continue;
                        }
                      tripInfo = '';
                      txtNextTrip = updateTripSheet(trip);
                    }                  
                    simply.body(txtNextTrip );
                });
  });

function updateTripSheet(trip) {
            if (!trip.JBDest)
                return;
            var isRealTime = trip.IsRealTime ? 'Real Time' : 'Scheduled';
            var arrival = new Date(parseInt(trip.ArrivalTime.substr(6)));
            var arrivalTime = (Math.floor((arrival - new Date()) / 60000)) > 0 ? Math.floor((arrival - new Date()) / 60000) : 'Now';

            //tripsDiv.append('Bus: ' + trip.RouteName + ' ' + trip.JBDest + ' ' + trip.StopName + '<br />');
            tripInfo = 'Arrives in :' + arrivalTime + ' Mins ' + isRealTime; 
            if(isNextTrip)
            {
              isNextTrip = false;
              simply.subtitle(tripInfo);
              tripInfo = '' ;
            }
            tripInfo += '\nArrival: ' + arrival.toLocaleTimeString() ;
            
            return tripInfo;
        }

simply.setText({
  title: 'JB Metro Trip',
  body: 'Press select or tap the watch!',
}, true);
