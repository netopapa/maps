import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LatLngLiteral } from '@agm/core';
import { Polygon, LatLng } from '@agm/core/services/google-maps-types';

declare var google: any;

@Component({
  selector: 'app-map-draw',
  templateUrl: './map-draw.component.html',
  styleUrls: ['./map-draw.component.css']
})
export class MapDrawComponent implements OnInit, AfterViewInit {

  @ViewChild('gmap') gmap;
  googleMap: any;

  lat = -3.0625460173810484;
  lng = -59.99530792236328;
  zoom = 13;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(this.initMap.bind(this), 0);
  }

  async initMap() {
    const nativeMap = this.gmap._mapsWrapper.getNativeMap()
      .then(
        map => {
          this.googleMap = map;
        });
  }

  setStartCords(e: any): void {
    const lat = e.coords.lat;
    const lng = e.coords.lng;

    // Define the LatLng coordinates for the polygon's path.
    const triangleCoords: LatLngLiteral[] = [
      { lat: lat - 0.01, lng: lng - 0.01 },
      { lat: lat - 0.01, lng: lng + 0.01 },
      { lat: lat + 0.01, lng: lng + 0.01 },
      { lat: lat + 0.01, lng: lng - 0.01 },
      { lat: lat - 0.01, lng: lng - 0.01 }
    ];

    // Construct the polygon.
    const defaultPolygon: Polygon = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      editable: true,
      draggable: true
    });

    defaultPolygon.setMap(this.googleMap);
  }

}
