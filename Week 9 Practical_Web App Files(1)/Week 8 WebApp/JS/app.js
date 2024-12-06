//The URIs of the REST endpoint
RAMURI = "https://prod-05.northcentralus.logic.azure.com/workflows/43dec4bd39434eb4897aab14cfd03f86/triggers/When_a_HTTP_request_is_received/paths/invoke/rest/v1/media?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=KkSSnLfxkdf9NQ3voAJgmph8doi7M3WAJapUFJumlkI";
CNMURI = "https://prod-30.northcentralus.logic.azure.com/workflows/b9b7d4f9f3d444b6beb8a8ea4df17019/triggers/When_a_HTTP_request_is_received/paths/invoke/rest/v1/media?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=AOXykUTPMs_RKC3FmLHZzifDJmZ17uzHCOHZnlNu-6E";

DIMURI0 = "https://prod-06.northcentralus.logic.azure.com/workflows/44b013c3bfb84884b46a3d479d00370a/triggers/When_a_HTTP_request_is_received/paths/invoke/rest/v1/media/";
DIMURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=GZHz8lasVw7ztaM5L69wF6OfFmfgT17l0nXWUGqq18A";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retAssets").click(function(){

      //Run the get DIY media list function
      getDIYMediaList();

  }); 

   //Handler for the new DIY media submission button
  $("#subNewForm").click(function(){

    //Execute the submit new DIY media function
    submitNewDIYMedia();
    
  }); 
});

//A function to submit a new DIY media to the REST endpoint 
function submitNewDIYMedia(){
  
  //Construct JSON Object for new item
  var subObj = {
    Username: $('#Username').val(),
    Title: $('#Title').val(),
    Description: $('#Description').val(),
    URL: $('#URL').val(),
    Tags: $('#Tags').val(),
    Views: $('#Views').val(),
    DateCreated: $('#DateCreated').val()
  }


  //Convert to a JSON String
  subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CNMURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function(response) {
    getDIYMediaList();
  })
}

//A function to get a list of all the DIY media and write them to the Div with the DIYMediaList Div
function getDIYMediaList(){

  //Replace the current HTML in that div with a loading message
  $('#DIYMediaList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  //Get the JSON from the RAM API 
  $.getJSON(RAMURI, function( data ) {

    //Create an array to hold all the retrieved media
    var items = [];
      
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function(key, val) {
      items.push("Username: " + val["Username"] + "<br/>");
      items.push("Title: " + val["Title"] + "<br/>");
      items.push("Description: " + val["Description"] + "<br/>");
      items.push("URL: <a href='" + val["URL"] + "' target='_blank'>" + val["URL"] + "</a><br/>");
      items.push("Tags: " + val["Tags"] + ", Views: " + val["Views"] + "<br/>");
      items.push("Date Created: " + val["DateCreated"] + "<br/>");
      items.push('<button type="button" id="deleteMedia" class="btn btn-danger" onclick="deleteMedia(' + val["MediaID"] + ')">Delete</button> <br/><br/>');

    });

      //Clear the DIYMediaList div 
      $('#DIYMediaList').empty();

      //Append the contents of the items array to the DIYMediaList Div
      $("<ul/>", {
        "class": "my-new-list",
        html: items.join("")
      }).appendTo("#DIYMediaList");
    });
}

//A function to delete DIY media with a specific ID
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteMedia(id){
  $.ajax({
    type: "DELETE",
    url: DIMURI0 + id + DIMURI1,
  }).done(function(msg){
    getDIYMediaList();
  })
}
