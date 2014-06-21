/* jshint unused:false, camelcase:false */
/* global google:true */

(function(){
  'use strict';

  $(document).ready(init);

  let map;


  function init(){
    initMap(36.1667, -86.7833, 12);
    addMarkers();
  }

  function initMap(lat, lng, zoom){
    let styles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#acbcc9'}]},{'featureType':'landscape','stylers':[{'color':'#f2e5d4'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#c5c6c6'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#e4d7c6'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#fbfaf7'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#c5dac6'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}];
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};  //{is used when adding multiple statements}
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }


  function addMarkers(){
      var wells = $('#searchResults').find('.well-sm');
      wells.each(function(){
        var name = $(this).find('.name').text();
        var zipcode = $(this).attr('data-zipcode');
        var lat = $(this).attr('data-lat');
        var long = $(this).attr('data-long');
        var point = new google.maps.LatLng(parseFloat(lat),parseFloat(long));
        var marker = new google.maps.Marker({
          position: point,
          map: map
        });

        var infoWindow = new google.maps.InfoWindow();
        var html = '<h4>'+name+'</h4>'+'<p>'+zipcode+'</p>';
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });
      });
    }

})();







//
//   function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
//   $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
// }
