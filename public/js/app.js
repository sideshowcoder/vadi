(function($){
  
  // Timeout
  var delay = 1000; 
  
  // Graph URLs
  var graphs = {
    Sources: '/analyse/basic/srcs',
    Destinations: '/analyse/basic/dsts',
    Nodes: '/analyse/basic/nodes',
    Bytes: '/analyse/basic/bytes',
    Packets: '/analyse/basic/packets'
  };
  
  // Load graphs
  function setupGraphs(){
    for(var name in graphs) {
      var html = '<h2>' + name + '</h2>';
      html += '<img class="graph" src="' + graphs[name] + '" />';
      $('#content').append(html);
    }      
  }
  // Update Graphs
  function reloadGraphs(){
    $('.graph').each(function(){
      var d = new Date();
      var src = $(this).attr('src');
      $(this).attr("src", src + '?' + d.getTime());
    });
  }
  
  // Analyse
  function startAnalyse(){
    $.post('/analyse/start', function(data) {
      $('#status').html(data);
      $('#progress').show();
      $('#progress').progressbar({ disabled: false });
      window.setTimeout(checkStatus, delay);
    });
  }
  
  function checkStatus(){
    $.get('/analyse/stat', function(data) {
      if(data !== '100') {
        $('#progress').progressbar({ value: parseInt(data, 10) });
        window.setTimeout(checkStatus, delay);
      } else {
        $('#progress').progressbar({ disabled: true});
        $('#status').html('');        
        $('#progress').hide();
        reloadGraphs();
      }
    });
  }
  
  $(document).ready(function(){
    setupGraphs();
    $('#progress').progressbar({ value: 0 });
    $('#progress').progressbar({ disabled: true });
    $('#progress').hide();
    $('#analysebtn').click(startAnalyse);
  });
  
})(jQuery);