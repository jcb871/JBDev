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
  if(e.button == 'select')
  {
    isFromOffice = !isFromOffice;
  }
  direction = isFromOffice ? 'To Home' : 'To Office';
  simply.title(direction);
  getNextMetro();    
});

simply.on('accelTap', function(e) {
  console.log(util2.format('tapped accel axis $axis $direction!', e));
   getNextMetro();
  });

function getNextMetro()
{  
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
}

function updateTripSheet(trip) {
            if (!trip.JBDest)
                return;
            var isRealTime = trip.IsRealTime ? 'RT' : 'Sched';
            var arrival = new Date(parseInt(trip.ArrivalTime.substr(6)));
            var arrivalTime = (Math.floor((arrival - new Date()) / 60000)) > 0 ? Math.floor((arrival - new Date()) / 60000) : 'Now';

            tripInfo += 'Arrives in :' + arrivalTime + ' Mins ' + isRealTime; 
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
  body: 'Press any button or tap the watch!',
}, true);
