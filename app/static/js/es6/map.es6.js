/* jshint unused:false, camelcase:false */
/* global google:true */

(function(){
  'use strict';

  $(document).ready(init);

  let map;


  function init(){
    initMap(36.1667, -86.7833, 11);
    $('#add').click(add);
  }

   function add(){
    let zip = $('#zip').val().trim();
    searchMap(zip);
  }

  function initMap(lat, lng, zoom){
    let styles = [{'stylers':[{'hue':'#dd0d0d'}]},{'featureType':'road','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'geometry','stylers':[{'lightness':100},{'visibility':'simplified'}]}];
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};  //{is used when adding multiple statements}
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function searchMap(zip){
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({address:zip},(results, status)=>{  // ()=> creates an anonymous function with results and status being the paramaters
      let name = results[0].formatted_address;
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();
      addMarker(lat, lng, name);
    });
  }

  function addMarker(lat, lng, name, icon){
    let latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title:name, icon:icon}); //icon adds the flag
  }
})();





//
//   function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
//   $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
// }
