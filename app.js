'use strict';

$(function(){

  //Submit Button
  $('#search-form').submit(function(e){
    e.preventDefault();
    const searchTerm = $('#user-input').val();
    getRequest(searchTerm);
  });
});


function makeTubeList(results) {
  let html = '';
  $.each(results, function(index, result) {

    let title = result.snippet.title,
      defaultThumb = result.snippet.thumbnails.default,
      thumbURL = '',
      url = 'https://www.youtube.com/watch?v='+result.id.videoId;
      
      
    //if (thumbnail object has no width or height properties) {
      // do something
    //}

    if (!defaultThumb.hasOwnProperty('height')){
      thumbURL = 'http://fillmurray.com/200/200';
    } else {
      thumbURL = defaultThumb.url;
    }

    // if no thumbnail, replace with http://fillmurray.com/200/200

    //Replace html into body in Div with the class '.row'
    html = html + (
      `<div class="tubebox col-xs-12 col-md-4 col-lg-3">
						<a href="${url}" class="thumbnail">
            <img src="${thumbURL}"/>
							<div class="caption">
								<h3 class="tube-title">${title}</h3>
							</div>
						</a>
          </div>`
    ); 

  });
  return html;  
}
function renderList(html) {
  $('.results-area>.row').html(html);
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
    const listHTML = makeTubeList(tubes);
    renderList(listHTML);
  });
}