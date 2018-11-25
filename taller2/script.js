function addNew(user, contenido, link, dateTime) {

  var user = $("<h5/>", {
    "class":"user",
    html: user.slice(2,-1)+", dijo:"
  })

  var p = $("<p/>",{
    "class": "text",
    html: contenido
  })

  var link= $("<a/>",{
    "href": link,
    html: link 
  })

  var dateTime= $("<p/>",{
    "class": "date",
    html: dateTime.slice(0,-6)
  })

  var div = $( "<div/>", {
    "class": "innerTweet col-sx-12 col-sm-12 col-md-12 col-lg-11"
  })

  var img =$("<img/>",{
    "class":"img-fluid imgTweet",
    "src":"logo.png"
  })

  var divImg = $("<div/>",{
    "class":"divImg col-sx-12 col-sm-12 col-md-12 col-lg-1"

  })
 
  var div2 = $("<div/>",{
    "class":"tweet row"

  })


  img.appendTo(divImg)
  user.appendTo(div)
  p.appendTo(div)
  link.appendTo(div)
  dateTime.appendTo(div)
  divImg.appendTo(div2)
  div.appendTo(div2)
  div2.appendTo("#noticias");



}


function mensaje(term){
  document.getElementById("textoBusqueda").classList.add("mensaje");
  document.getElementById("mensajeBusca").innerHTML=term;
  document.getElementById("bloqueNoticias").classList.add("news");
}

function loadNewsXml(term) {
  $.ajax({
      type: "GET",
      url: "http://twitrss.me/twitter_search_to_rss/?term="+term,
      dataType: "xml",
      success: function(xml){
          mensaje(term);
          $(xml).find('item').each(function(){
            var user = $(this).find('dc\\:creator').text();
            var contenido = $(this).find('description').text();
            var link= $(this).find('link').text();
            var dateTime=$(this).find('pubDate').text();
            addNew(user, contenido,link,dateTime)


          });
      },
      error: function() {
        alert("Error al procesar el xml");
      }
  });
}

function borrarNoticias(){
  var myNode = document.getElementById("noticias");
  myNode.innerHTML = '';  
  
}

$(document).ready(function(){

  $("button").click(function(e){
    var texto = $('input#inputSearch').val();
    var myNode = document.getElementById("noticias");
    if(texto!=0){
      borrarNoticias();
      loadNewsXml(texto);

    }

    
    

    return false;
    
  })
});