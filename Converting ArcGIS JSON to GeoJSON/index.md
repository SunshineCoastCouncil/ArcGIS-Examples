# ArcGIS Examples: Converting ArcGIC JSON to GeoJSON

### Caveats

This example might not work for JSON data retrieved without specifying 4326 as
the output spatial reference. Refer to [Getting data out, the easy way](../Getting%20data%20out%2C%20the%20easy%20way%2Findex.md)
for more information.

We also assume a basic understanding of what a command prompt is and how to use 
one.

### Getting Ready

To convert our data we will use the free tool ogr2ogr from the Geospatial Data
Abstraction Library (GDAL).

##### Linux

On Linux you should be able to install it using your distribution's package
manager (gdal-bin on Debian). Otherwise you might need to compile it from
source which is outside the scope of this example. Refer to the 
[GDAL homepage](http://www.gdal.org/) for more information.

##### Windows

For convenience we've included the copy of GDAL used for this example
[gdal-201-1800-core.msi](gdal-201-1800-core.msi). Once you have installed it
you should have a GDAL command prompt start menu item.

To be able to use the ogr2ogr command you will need to launch the GDAL command 
prompt.

To download an alternative version please visit the [GDAL homepage](http://www.gdal.org/).

##### MacOSX

There are compiled binaries available for MacOSX too. Please refer to the
[GDAL homepage](http://www.gdal.org) for more information.


### The Process

You will need some data to convert. Included for your convenience is 
[beaches.json](beaches.json). This file contains a list of patrolled beaches on
the Sunshine Coast (at a point in time, we don't keep it up to date).

Once you have saved beaches.json somewhere you will want to fire up a 
command prompt. Change to the directory where you have saved the file to.
The change directory command should be ```cd``` followed by the directory.

On Linux the command might look like this ```cd "/home/username/Downloads"```

On Windows the command might look like this ```cd "C:\Users\username\Downloads"```

Once you are in the right directory run the command  
```ogr2ogr -f GeoJSON geojson-beaches.json beaches.json OGRGeoJSON```

You should now have a file named geojson-beaches.json, that's it. Simples.