'use strict';

$(function(){

  //Submit Button
  $('#search-form').submit(function(e){
    e.preventDefault();
    const searchTerm = $('#user-input').val();
    getRequest(searchTerm);
  });
});


function makeTubeList(tubes) {
  $.each(tubes, function(index, value) {
    const title = tubes[index].snippet.title,
      thumb = tubes[index].snippet.thumbnails.high.url,
      url = 'https://www.youtube.com/watch?v='+tubes[index].id.videoId,
      html = '';

    //Append html into body in Div with the class '.row'
    const element = $(`<div class="tubebox col-xs-12 col-md-4 col-lg-3">\
						<a href="${url}" class="thumbnail">\
							<img src="${thumb}"/>\
							<div class="caption">\
								<h3 class="tube-title">${title}</h3>\
							</div>\
						</a>\
          </div>`);
          
    $('.results-area>.row').append(element);
  });
}


//Setting up API Key and Search as a string
function getRequest(searchTerm) {
  const params = {
    part: 'snippet',
    key: 'AIzaSyCPNkKGoFSdqh771mSPjUEUeE8GkoxKMXY',
    q: searchTerm
  };
  const endpoint = 'https://www.googleapis.com/youtube/v3/search';

  //Get JSON request
  $.getJSON(endpoint, params, function(data){
    const tubes = data.items;
    makeTubeList(tubes);
  });
}