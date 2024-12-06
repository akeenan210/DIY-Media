//The URIs of the REST endpoint
IUPSURI = "https://prod-08.northcentralus.logic.azure.com:443/workflows/1fa3d4d4223245c48a458c6efdb20804/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=8E6v7jamblhq8wf8oM72fyV1C3psNKlRnGr8fwtpuCM";
// RIMURI = "https://prod-20.northcentralus.logic.azure.com/workflows/d1e78f122ae5497e91986684a62f5816/triggers/When_a_HTTP_request_is_received/paths/invoke/rest/v1/media/?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=X4wK8SpJQLfCFtmZ9sl61AuV8cI0dZxTlcZgXr3dZHs";
// RAMURI = "https://prod-05.northcentralus.logic.azure.com/workflows/43dec4bd39434eb4897aab14cfd03f86/triggers/When_a_HTTP_request_is_received/paths/invoke/rest/v1/media?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=KkSSnLfxkdf9NQ3voAJgmph8doi7M3WAJapUFJumlkI";
DIYMEDIARetrieveALLIMAGES = "https://prod-14.northcentralus.logic.azure.com:443/workflows/897b5e170174426782f70f5eb52996b1/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=mvRk041piW8XJDtOavhuaDNubUU_31RESXAlSoBmsDo";

BLOB_ACCOUNT = "https://diymediablobstorage.blob.core.windows.net";

// Handlers for button clicks
$(document).ready(function () {


  $("#retImages").click(function () {

    // Run the get DIY media list function
    getImages();

    console.log("getImages function triggered.");

  });

  // Handler for the new DIY media submission button
  $("#subNewForm").click(function () {

    // Execute the submit new DIY media function
    submitNewDIYMedia();

  });
});

// A function to submit a new DIY media to the REST endpoint 
function submitNewDIYMedia() {

  // Create a form data object
  submitData = new FormData();

  // Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $("#UpFile")[0].files[0]);

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: IUPSURI,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {
    }
  });
}

// A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span></div>');

  $.getJSON(DIYMEDIARetrieveALLIMAGES, function (data) {

    // Create array to hold all the retrieved media
    // Note - check that this app.js and the other app.js need the GET endpoints switched (RAMURI and RIMURI)
    var items = [];

    // Iterate through the returned records and build HTML, incorporating the key values of the records in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      items.push("<img src='" + BLOB_ACCOUNT + val["filePath"] + "' width='400'/> <br/> ")
      items.push("File : " + val["fileName"] + "<br />");
      items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br/> ");
      items.push("<hr />");
    });

    // Clear the DIYMediaList div
    $('#ImageList').empty();

    // Append the contents of the items array to the ImageList div
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
      }).appendTo( "#ImageList" );
    });
}

