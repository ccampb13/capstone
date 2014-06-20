/* jshint unused:false */
/* global google:true */

(function(){
  'use strict';

  $(document).ready(init);

  let map;


  function init(){
    initMap(36.1667, -86.7833, 11);
    // $('#add').click(searchMap);
    $('#messages').click(getMessages);
    $('#dashboard').click(getDashboard);
    $('#search').click(getSearch);
    $('#tasks').click(getTasks);
    getDashboard();
  }

  //  function add(){
  //   let zip = $('#zip').val().trim();
  //   searchMap(zip);
  // }

  function initMap(lat, lng, zoom){
    let styles = [{'stylers':[{'hue':'#dd0d0d'}]},{'featureType':'road','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'geometry','stylers':[{'lightness':100},{'visibility':'simplified'}]}];
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};  //{is used when adding multiple statements}
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }


  function getMessages(e){
    // var age = $('#age').serialize();

    ajax('/messages', 'GET', null, res=>{
    console.log('RESSSSS');
    console.log(res);
    $('#content-container').empty().append(res);
    console.log(res);
    });

    e.preventDefault();
  }

  function getDashboard(e){
    // var age = $('#age').serialize();

    ajax('/dashboard', 'GET', null, res=>{
    console.log('RESSSSS');
    console.log(res);
    $('#content-container').empty().append(res);
    console.log(res);
  });

    e.preventDefault();
  }

  function getSearch(e){
    // var age = $('#age').serialize();

    ajax('/search', 'GET', null, res=>{
    console.log('RESSSSS');
    console.log(res);
    $('#content-container').empty().append(res);
    console.log(res);
  });

    e.preventDefault();
  }

  function getTasks(e){
    // var age = $('#age').serialize();

    ajax('/tasks', 'GET', null, res=>{
    console.log('RESSSSS');
    console.log(res);
    $('#content-container').empty().append(res);
    console.log(res);
  });

    e.preventDefault();
  }



  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}



})();
