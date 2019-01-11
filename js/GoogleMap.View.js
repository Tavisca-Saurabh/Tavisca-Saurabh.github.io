var MapView = Backbone.View.extend({
    initialize: function () {
        //console.log("initialize Map");
        google.maps.event.addDomListener(window, 'load', this.render);
    },
    render: function () {
        //console.log("render");
        initializeMap();
    }
});

var MapView = new MapView();