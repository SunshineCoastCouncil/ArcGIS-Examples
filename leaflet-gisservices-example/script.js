window.onload = function () {

    var queryUrl = 'http://gisservices.scc.qld.gov.au/arcgis/rest/services/Society/Society_SCRC/MapServer/6/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson';

    // Initialise the leaflet map and set a view
    var map = L.map('map').setView([-26.679030, 152.955026], 10);

    // We're using the ArcGIS tile layer
    L.tileLayer(
        'http://gisservices.scc.qld.gov.au/arcgis/rest/services/ImageryBaseMapsEarthCover/StreetMap_SCRC/MapServer/tile/{z}/{y}/{x}',
        {
            attribution: '\&copy; <a href=\'http://www.sunshinecoast.qld.gov.au\'>Sunshine Coast Council<\/a>',
            maxZoom: 20,
            opacity: 1
        }).addTo(map);

    // Add a control to display the name of the patrolled beach
    var info = L.control();
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'feature-info');
        this.update();
        return this._div;
    };
    info.update = function (props, isLoading) {
        this._div.innerHTML = props && props.Description
            ? props.Description
            : 'Hover over a patrolled beach for details';
    };
    info.addTo(map);
    
    // Get the data. Sample data here is from data.js file
    $.get(queryUrl, function (dataStr) {
        var data = JSON.parse(dataStr);
        var geoJson = [];
        for (var i = 0; i < data.features.length; i++) {
            geoJson.push(Terraformer.ArcGIS.parse(data.features[i]));
        }

        // Load the GeoJSON onto the map
        L.geoJson([], {
            onEachFeature: function (feature, layer) {
                layer.on({
                    mouseover: function (e) {
                        var layer = e.target;
                        info.update(layer.feature.properties);
                    },
                    mouseout: function (e) {
                        info.update();
                    }
                });
            }
        }).addTo(map)
        .addData(geoJson)
        .bringToFront();
    });

}