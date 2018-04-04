import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { LatLngLiteral } from '@agm/core';
import { Polygon, LatLng, Marker } from '@agm/core/services/google-maps-types';

declare var google: any;
declare var $: any;

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
  zoom = 12;

  drawing = false;
  polygonOk = false;
  polygonPoints: LatLngLiteral[];
  polygonList: Polygon[];
  markerList: Marker[];

  constructor() { }

  ngOnInit() {
    this.polygonPoints = [];
    this.polygonList = [];
    this.markerList = [];
  }

  ngAfterViewInit(): void {
    setTimeout(this.initMap.bind(this), 0);
  }

  async initMap() {
    const nativeMap = this.gmap._mapsWrapper.getNativeMap()
      .then(
        map => {
          this.googleMap = map;
          console.log(google);
        });
  }

  choosePoints(e: any): void {
    if (this.drawing) {
      const lat = e.coords.lat;
      const lng = e.coords.lng;

      this.polygonPoints.push(e.coords);

      const marker: Marker = new google.maps.Marker({
        position: e.coords
      });

      this.markerList.push(marker);

      marker.setMap(this.googleMap);
    }
  }

  removeAllMarkers(): void {
    this.markerList.forEach(
      mkr => {
        mkr.setMap(null);
      }
    );

    this.markerList = [];
  }

  removeOnePolygon(index: number): void {
    this.polygonList[index].setMap(null);
  }

  startDrawing(): void {
    this.drawing = true;
  }

  stopDrawing(): void {
    this.drawing = false;
    this.polygonPoints = [];
  }

  finishPolygonPoints(): void {
    if (this.polygonPoints[this.polygonPoints.length - 1] !== this.polygonPoints[0]) {
      this.polygonPoints.push(this.polygonPoints[0]);
    }
  }

  buildPolygon(): void {
    this.finishPolygonPoints();
    this.polygonOk = true;
    const polygon: Polygon = new google.maps.Polygon({
      paths: this.polygonPoints,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      editable: true,
      draggable: true
    });
    polygon.setMap(this.googleMap);

    this.polygonList.push(polygon);
  }

  confirmPolygon(): void {
    this.polygonOk = false;
    this.removeAllMarkers();
    this.stopDrawing();
  }

  cancelPolygon(): void {
    if (this.polygonOk) {
      this.removeOnePolygon(this.polygonList.length - 1);
      this.polygonOk = false;
    }
    this.removeAllMarkers();
    this.stopDrawing();
  }

}
