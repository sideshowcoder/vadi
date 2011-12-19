(function($){
  // start once the DOM is ready
  $(function(){
    
    // Backbone Models
    window.rowId = 0;

    window.Chart = Backbone.Model.extend({

      initialize: function(attributes){
        this.set({
          rowId: rowId++,
          chartUrlBase: attributes.chartUrl,
          chartUrl: attributes.chartUrl,
          descHeader: attributes.descHeader,
          descText: attributes.descText 
        });
      },

      refresh: function(){
        var date = new Date();
        this.set({chartUrl: this.get("chartUrlBase") + "?v=" + date.getTime()});
      }
    });
    
    window.ChartList = Backbone.Collection.extend({
      model: Chart
    });
 
    // Backbone Views
    window.Charts = new ChartList;
    
    window.ChartView = Backbone.View.extend({
      chart: null,

      tagName: "div",

      className: "chart",

      template: _.template($("#chart-template").html()),

      events:{},

      modelChanged: function(){
        if(this.chart === null || this.chart === undefined ) { return };
        var chart = $("#row-" + this.chart.get("rowId"));
        chart.children("image").children("a").attr("href", this.chart.get("chartUrl"));
        chart.children("image").children("a").children("img").attr("src", this.chart.get("chartUrl"));
      },

      initialize: function(attributes){
        this.model.bind("change", this.modelChanged);
      },

      render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }

    });

    Charts.bind("add", function(chart){
      var view = new ChartView({ model: chart });
      // Associate view and Model
      chart.set({view: view});
      view.chart = chart;
      $("#charts").append(view.render().el);
      $("a.lightbox").lightBox({
        imageLoading:	"/static/img/lightbox-ico-loading.gif",
        imageBtnPrev:	"/static/img/lightbox-btn-prev.gif",	 
        imageBtnNext: "/static/img/lightbox-btn-next.gif",	 
        imageBtnClose: "/static/img/lightbox-btn-close.gif",
        imageBlank:		 "/static/img/lightbox-blank.gif"
      });
    });

    Charts.bind("remove", function(chart){
      if(typeof chart.get("view").remove ===  "function"){
        chart.get("view").remove();
      }
    });
        

    window.AppView = Backbone.View.extend({

      clearCharts: function(){
        for(var i = Charts.length-1; Charts.remove(Charts.at(i)), i >= 0 ; --i);;
      },

      refreshCharts: function(){
        Charts.each(function(chart){
          chart.refresh();
        });
      }

    });
    
    window.App = new AppView;

    // Interface
    window.gui = {
      openDashboard: function(){
        App.clearCharts();
        var packets = new Chart({
          chartUrl: "charts/Packets-Short.png",
          descHeader: "Packets",
          descText: "Packtes transfered in the Network"
        });
        var bytes = new Chart({
          chartUrl: "charts/Bytes-Short.png",
          descHeader: "Bytes",
          descText: "Bytes transfered in the Network"
        });
        Charts.add([bytes, packets]);
      },
      refresh: function(){
        App.refreshCharts();
      },
      clear: function(){
        App.clearCharts();
      }
    };

    // Bind Interface Controls
    $("#dashboard").click(gui.openDashboard);
    $("#refresh-btn").click(gui.refresh);
    $("#clear-reports").click(gui.clear);


  });
})(jQuery);
