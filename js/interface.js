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
  $(".dropdown-menu li > a").click(function(){
    $(".dropdown-toggle").text(this.innerHTML);
  });

  // search
  $("#searchButton").click(function(){
    var searchKey = $("#searchBar").val();
    //var genre = $("#genre").text();
    var startResult = 0;
    var endResult = 2;

    var searchUrl = "http://localhost:6064/search?";
    var params = {
      "query": searchKey,
      "from": startResult,
      "to": endResult,
      //"genre": genre
    }

    var searchQuery = searchUrl + $.param(params);
    alert(searchQuery);

    $.get(searchQuery, function(resp, status) {
      $(".panel-body").empty();
      for (var i = 0; i < resp.length; i++){
        $('.panel-body')
        .append("<a id='title' href='" + resp[i].url + "' target='_blank'>" + resp[i].title + "</a>")
        .append("<p id='url'>" + resp[i].url + "</p>")
        .append("<p id='snippet'>" + resp[i].snippet + "</p>")
        .append("<p id='price'>Price: $" + resp[i].price + "</p>");
      }
      //composeCarousel(resp);      // Lifen added this line, to call a function,   part 2-1
    }, "json");


    //composeCarousel(null);    // just for tem test,  part 1-1
  });

  // advanced search
  $("#advancedSearchButton").click(function(){
    var genre = $('#genreAdvanced').text();
    var title = $("#title-field").val();
    var isbn = $("#isbn-field").val();
    var author = $("#author-field").val();
    var minPrice = $("#min-price-field").val();
    var maxPrice = $("#max-price-field").val();
    var startResult = 0;
    var endResult = 9;

    var searchUrl = "http://localhost:6064/search?";
    var params = {
      "genre": genre,
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
    alert(advancedSearchQuery);

    console.log("request" + advancedSearchQuery);

    $.get(advancedSearchQuery, function(resp, status) {
      $(".advanced-panel-body").empty();
      for (var i = 0; i < resp.length; i++){
        $('.advanced-panel-body')
        .append("<a id='title' href='" + resp[i].url + "' target='_blank'>" + resp[i].title + "</a>")
        .append("<p id='url'>" + resp[i].url + "</p>")
        .append("<p id='snippet'>" + resp[i].snippet + "</p>")
        .append("<p id='price'>Price: $" + resp[i].price + "</p>");
      }
    }, "json");
  });
});


// Lifen added below
function composeCarousel(respArray){
  $(".list_carousel").empty();
  $(".list_carousel").append("<ul id='foo2' class='update'>");

  // part2-2
  /*for (var i = 0; i < bookPicList.length; i++){     // for real data
      $("#foo2")
      .append("<li>")
      .append("<img src='"+ respArray[i].imgUrl + "' alt='fail' width='100' height='100' />")
      .append("<div class='belowline'>")
      .append("<span class='titleLeft'>"+ respArray[i].title +"</span>")
      .append("<span class='priceRight'>" + respArray[i].price + "</span>")
      .append("</div>")
      .append("</li>");
  }*/

  // part1-2
  /*var bookPicList = ["novel1.jpg", "novel2.jpg", "novel3.jpg", "novel4.jpg", "novel5.jpg", "novel6.jpg", "novel7.jpg", "novel8.jpg", "novel9.jpg", "novel10.jpg"];
  for (var j = 1; j < bookPicList.length; j++){
      $("#foo2").append("<li><img src='img/"+bookPicList[j]+ "' alt='fail' width='100' height='100' /><div class='belowline'><span class='textLeft'>The help</span><span class='textRight'>$10</span></div></li>");
  }  // end

  $(".list_carousel").append("</ul>");
  $(".list_carousel").append("<div class='clearfix'></div>");
  $(".list_carousel").append("<a id='prev2' class='prev' href='#'>&nbsp;&nbsp;&nbsp;</a> <a id='next2' class='next' href='#'>&nbsp;&nbsp;&nbsp;</a>");*/

  $('#foo2').carouFredSel({
    auto: true,
    prev: '#prev2',
    next: '#next2',
    pagination: "#pager2",
    mousewheel: true,
    swipe: {
      onMouse: true,
      onTouch: true
    }
  });

}
