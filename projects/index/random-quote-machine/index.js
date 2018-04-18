function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "pwidTB6qjdmshKxEsKUy94pIKETCp1wkNtljsnENRbqlVLGeRC",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
    success: function(data) {
      if (typeof data === 'string') {
      data = $.parseJSON(data); 
      }
      currentQuote = data.quote;
      currentAuthor = data.author;
      $(".QuoteText span em").text(currentQuote);
      $(".QuoteAuthor span").text("- " + currentAuthor);
    },
    error: function(){
      alert("API loading err");
    }

  });

   	var bgColors = ['#de3163', '#c71585', '#ff7f00' , '#808000', '#8c92ac', '#008000', '#ff0090'];
    var _bdColor = Math.floor(Math.random()*bgColors.length);
    $("html,body,.buttonStyle").animate({
    	backgroundColor: bgColors[_bdColor]
    	},1000);
    $(".QuoteText,.QuoteAuthor").animate({
    	color: bgColors[_bdColor]
    	},1000);
}

$(function(){
  $("#getNewQuote").on("click",function(){
   	getQuote();
   });
   getQuote();

});