(function($){
  // start once the DOM is ready
  $(function(){

    window.rowId = 0;
    
    // Backbone Models
    window.ChartRow = Backbone.Model.extend({
      initialize: function(attributes){
        this.set({
          rowId: rowId++,
          shortUrlBase: attributes.shortUrl,
          midUrlBase: attributes.midUrl,
          longUrlBase: attributes.longUrl,
          shortUrl: attributes.shortUrl,
          midUrl: attributes.midUrl,
          longUrl: attributes.longUrl,
          descHeader: attributes.descHeader,
          descText: attributes.descText 
        });
      },

      refresh: function(){
        var date = new Date();
        this.set({shortUrl: this.get("shortUrlBase") + "?v=" + date.getTime()});
        this.set({midUrl: this.get("midUrlBase") + "?v=" + date.getTime()});
        this.set({longUrl: this.get("longUrlBase") + "?v=" + date.getTime()});
      }
    });
    
    window.ChartList = Backbone.Collection.extend({
      model: ChartRow
    });

    window.Charts = new ChartList;
     
    // Backbone Views
    window.ChartRowView = Backbone.View.extend({
      tagName: "div",

      className: "chart-row",

      template: _.template($("#chartrow-template").html()),

      events:{},

      modelChanged: function(chartrow){
        var row = $("#row-" + chartrow.get("rowId"));
        var shrt = row.children(".chart-short");
        var lng = row.children(".chart-long");
        var md = row.children(".chart-mid");
        shrt.children("a").attr("href", chartrow.get("shortUrl"));
        lng.children("a").attr("href", chartrow.get("longUrl"));
        md.children("a").attr("href", chartrow.get("midUrl"));
        shrt.children("a").children("img").attr("src", chartrow.get("shortUrl"));
        lng.children("a").children("img").attr("src", chartrow.get("longUrl"));
        md.children("a").children("img").attr("src", chartrow.get("midUrl"));
      },

      initialize: function(attributes){
        this.model.bind("change", this.modelChanged);
      },

      render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }
    });

    window.AppView = Backbone.View.extend({
      el: $("#vadigui"),
      tid: null,

      addChart: function(chartrow){
        var view = new ChartRowView({ model: chartrow });
        this.$("#charts").append(view.render().el);
        $("a.lightbox").lightBox({
          imageLoading:	"/static/img/lightbox-ico-loading.gif",
          imageBtnPrev:	"/static/img/lightbox-btn-prev.gif",	 
          imageBtnNext: "/static/img/lightbox-btn-next.gif",	 
          imageBtnClose: "/static/img/lightbox-btn-close.gif",
          imageBlank:		 "/static/img/lightbox-blank.gif"
        });
      },

      addAllCharts: function(){
        Charts.each(this.addChart);
      },

      refreshAllCharts: function(){
        Charts.each(function(chartrow){
          chartrow.refresh();
        });
      },

    });

    // Create App
    window.App = new AppView;
    function autoRefresh(){
      window.setTimeout(autoRefresh, 10000);
      App.refreshAllCharts();
    };
    autoRefresh();

    // DEBUG
    // create some basic charts
    var bytesChart = new ChartRow({ 
      shortUrl: "/charts/Bytes-Short.png",  
      midUrl: "/charts/Bytes-Mid.png",  
      longUrl: "/charts/Bytes-Long.png",  
      descHeader: "Tranfered Bytes",
      descText: "All bytes transfered"
    });
    Charts.add(bytesChart);
    
    var bytesChart = new ChartRow({ 
      shortUrl: "/charts/Packets-Short.png",  
      midUrl: "/charts/Packets-Mid.png",  
      longUrl: "/charts/Packets-Long.png",  
      descHeader: "Tranfered Packets",
      descText: "All packets tranfered"
    });
    Charts.add(bytesChart);

    

    App.addAllCharts();

  });
})(jQuery);
