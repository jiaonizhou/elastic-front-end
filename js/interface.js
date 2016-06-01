/**
window.onload = function(){
  for (var i = 0; i < searchResults.length; i++){
    $('.panel-body')
    .append("<a id='title' href='" + searchResults[i].url + "' target='_blank'>" + searchResults[i].title + "</a>")
    .append("<p id='url'>" + searchResults[i].url + "</p>")
    .append("<p id='snippet'>" + searchResults[i].description + "</p>")
    .append("<p id='price'>Price: $" + searchResults[i].price + "</p>");
  }
}
**/

$(document).ready(function(){

  // basic search
    $("#basicSearchButton").click(function(){
    var searchKey = $("#searchBar").val();
    var startResult = 0;
    var endResult = 99;

    var searchUrl = "http://localhost:6064/search?";
    var params = {
      "query": searchKey,
      "from": startResult,
      "to": endResult
    }

    var searchQuery = searchUrl + $.param(params);
    //alert(searchQuery);

    $.get(searchQuery, function(resp, status) {
      $(".basic-panel-body").empty();
      for (var i = 0; i < resp.length; i++){
        $('.basic-panel-body')
        .append("<a id='title' class='logClick' href='" + resp[i].url + "' target='_blank'>" + resp[i].title + "</a>")
        .append("<p id='price'>Price: $" + resp[i].price + "</p>")
        .append("<p id='url'>" + resp[i].url + "</p>")
        .append("<p id='snippet'>" + resp[i].snippet + "</p>");
      }
      //Lifen added, to add click logging
      $(".logClick").click(function () {
          var Value = "<span style='color:blue'>Click book: " + $(this).text() + "</span></br><span style='font-size:8px'>" + $(this).attr("href") + "</span>";
          updateLog(Value);
      });
    }, "json");

    // Lifen added, to add query logging
    var logContent = "<span style='color:red'>Query: " + searchKey + "</span>";
    updateLog(logContent);
  });

  $(".dropdown-menu li > a").click(function(){
    $("#genre").text(this.innerHTML);
  });

  // search
  $("#searchButton").click(function(){
    var searchKey = $("#searchBar").val();
    var genre = $("#genre").text();
    var startResult = 0;
    var endResult = 99;

    var searchUrl = "http://localhost:6064/search?";
    var params = {
      "query": searchKey,
      "from": startResult,
      "to": endResult,
      "base": 2,
      "genre": genre
    }

    var searchQuery = searchUrl + $.param(params);
    //alert(searchQuery);

    $.get(searchQuery, function(resp, status) {
      $(".panel-body").empty();
      for (var i = 0; i < resp.length; i++){
        $('.panel-body')
        .append("<a id='title' class='logClick' href='" + resp[i].url + "' target='_blank'>" + resp[i].title + "</a>")
        .append("<p id='price'>Price: $" + resp[i].price + "</p>")
        .append("<p id='url'>" + resp[i].url + "</p>")
        .append("<p id='snippet'>" + resp[i].snippet + "</p>");
      }

      //Lifen added, to add click logging
      $(".logClick").click(function () {
          var Value = "<span style='color:blue'>Click book: " + $(this).text() + "</span></br><span style='font-size:8px'>" + $(this).attr("href") + "</span>";
          updateLog(Value);
      });

      // Lifen add call to carousel funciton
      composeCarousel(resp);
    }, "json");

    // Lifen added, to add query logging
    var logContent = "<span style='color:red'>Query: " + searchKey + "</span>";
    updateLog(logContent);
  });

  // advanced search
  $("#advancedSearchButton").click(function(){
    var title = $("#title-field").val();
    var isbn = $("#isbn-field").val();
    var author = $("#author-field").val();
    var minPrice = $("#min-price-field").val();
    var maxPrice = $("#max-price-field").val();
    var startResult = 0;
    var endResult = 99;

    var searchUrl = "http://localhost:6064/search?";
    var params = {
      "title": title,
      "isbn": isbn,
      "author": author,
      "minPrice": minPrice,
      "maxPrice": maxPrice,
      "from": startResult,
      "to": endResult,
      "adv": 1
    }

    var advancedSearchQuery = searchUrl + $.param(params);
    //alert(advancedSearchQuery);

    $.get(advancedSearchQuery, function(resp, status) {
      $(".advanced-panel-body").empty();
      for (var i = 0; i < resp.length; i++){
        $('.advanced-panel-body')
        .append("<a id='title' class='logClick' href='" + resp[i].url + "' target='_blank'>" + resp[i].title + "</a>")
        .append("<p id='price'>Price: $" + resp[i].price + "</p>")
        .append("<p id='url'>" + resp[i].url + "</p>")
        .append("<p id='snippet'>" + resp[i].snippet + "</p>");
      }
      //Lifen added, to add click logging
      $(".logClick").click(function () {
          var Value = "<span style='color:blue'>Click book: " + $(this).text() + "</span></br><span style='font-size:8px'>" + $(this).attr("href") + "</span>";
          updateLog(Value);
      });
      composeCarousel(resp);      // Lifen added this line, to call a function
    }, "json");
    // Lifen added, to add query logging
    var logContent = "<span style='color:red'>Query: " + "title= " + title + ", isbn=" + isbn +", author= "+author + "</span>";
    updateLog(logContent);
  });


  //Lifen added, togging logging part
  $(".log").click(function(){
     $("#loggingArea").slideToggle("slow");
  });

});


// Lifen added below
function composeCarousel(respArray){
  $(".list_carousel").empty();
  $(".list_carousel").append("<ul id='foo2' class='update'>");

  for (var i = 0; i < respArray.length; i++){
      $("#foo2")
      .append("<li><a class='logClick2' href='" + respArray[i].url + "' target='_blank'><img src='"+ respArray[i].imgUrl + "' alt='fail' width='100' height='100' /></a><div class='belowline'><span class='titleLeft'>"+ respArray[i].title +"</span></br><span class='priceRight'>$" + respArray[i].price + "</span></div></li>");
  }

  $(".list_carousel").append("</ul>");
  $(".list_carousel").append("<div class='clearfix'></div>");
  $(".list_carousel").append("<a id='prev2' class='prev' href='#'>&nbsp;&nbsp;&nbsp;</a> <a id='next2' class='next' href='#'>&nbsp;&nbsp;&nbsp;</a>");
  $(".list_carousel").append("<div id='pager2' class='pager'></div>")    // show the page numbers

  $('#foo2').carouFredSel({
    auto: false,
    prev: '#prev2',
    next: '#next2',
    pagination: "#pager2",
    mousewheel: false,
    swipe: {
      onMouse: true,
      onTouch: true
    }
  });

  $(".logClick2").click(function () {
      var Value = "<span style='color:green'>Click book: " + $(this).next().children(".titleLeft").html() + "</span></br><span style='font-size:8px'>" + $(this).attr("href") + "</span>";
      updateLog(Value);
  });

}

function updateLog(content){
  //alert(document.getElementById("loggingArea").innerHTML);
  //alert(content);
  document.getElementById("loggingArea").innerHTML += ("Time: " + (new Date()) + ",  &nbsp;&nbsp;" + content + "<br/>");
}
