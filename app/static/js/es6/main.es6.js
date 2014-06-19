/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);


  function init(){
    $('#messages').click(getMessages);
    $('#dashboard').click(getDashboard);
    getDashboard();
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


  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}



})();
