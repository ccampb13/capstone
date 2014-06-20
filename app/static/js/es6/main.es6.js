/* jshint unused:false */


(function(){
  'use strict';

  $(document).ready(init);



  function init(){
    getDashboard();
    $('.content-menu-box').on('click', '#messages', getMessages);
    $('#dashboard').click(getDashboard);
    $('#search').click(getSearch);
    $('#tasks').click(getTasks);

  }

  function getMessages(e){

    ajax('/messages', 'GET', null, res=>{
    console.log('RESSSSS');
    console.log(res);
    $('#content-container').empty().append(res);
    console.log(res);
    });

    e.preventDefault();
  }

  function getDashboard(){

    ajax('/dashboard', 'GET', null, res=>{
    console.log('RESSSSS');
    console.log(res);
    $('#content-container').empty().append(res);
    console.log(res);
  });

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
