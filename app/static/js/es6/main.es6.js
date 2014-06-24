/* jshint unused:false */


(function(){
  'use strict';

  $(document).ready(init);



  function init(){
    getDashboard();
    $('#messages').click(getMessages);
    $('#search').click(getSearch);
    $('#tasks').click(getTasks);
    $('.content-menu-box').on('click', '#dashboard', getDashboard);
    $('#content-container').on('click', '#new-task', newTask);


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

  function newTask(){
    ajax('/tasks/new', 'GET', null, res=>{
    $('#content-container').empty().append(res);
    });
  }


  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}



})();
