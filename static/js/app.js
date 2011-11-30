(function($){
  // start once the DOM is ready
  $(function(){
    
    // Backbone Models
    window.ChartRow = Backbone.Model.extend({});
    
    window.ChartList = Backbone.Collection.extend({
      model: ChartRow
    });

    window.Charts = new ChartList;
     
    // Backbone Views
    window.ChartRowView = Backbone.View.extend({
      tagName: "div",

      className: "chart-row",

      template: _.template($('#chartrow-template').html()),

      events:{},

      render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }
    });

    window.AppView = Backbone.View.extend({
      el: $("#vadigui"),

      addChart: function(chartrow){
        var view = new ChartRowView({ model: chartrow });
        this.$("#charts").append(view.render().el);
        $('a.lightbox').lightBox({
          imageLoading:	'/static/img/lightbox-ico-loading.gif',
          imageBtnPrev:	'/static/img/lightbox-btn-prev.gif',	 
          imageBtnNext: '/static/img/lightbox-btn-next.gif',	 
          imageBtnClose: '/static/img/lightbox-btn-close.gif',
          imageBlank:		 '/static/img/lightbox-blank.gif'
        });
      },

      addAllCharts: function(){
        Charts.each(this.addChart);
      }
    });

    // Create App
    window.App = new AppView;

    // DEBUG
    // create some basic charts
    var bytesChart = new ChartRow;
    bytesChart.set({ 
      shortUrl: "/charts/Bytes-Short.png",  
      midUrl: "/charts/Bytes-Mid.png",  
      longUrl: "/charts/Bytes-Long.png",  
      descHeader: "Tranfered Bytes",
      descText: "All bytes transfered"
    })
    Charts.add(bytesChart);
    
    var bytesChart = new ChartRow;
    bytesChart.set({ 
      shortUrl: "/charts/Packets-Short.png",  
      midUrl: "/charts/Packets-Mid.png",  
      longUrl: "/charts/Packets-Long.png",  
      descHeader: "Tranfered Packets",
      descText: "All packets tranfered"
    })
    Charts.add(bytesChart);

    App.addAllCharts();

  });
})(jQuery);
