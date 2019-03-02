<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { CoordinateItem } from '../interfaces';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

declare const L: any;

@Component
export default class MapViewerComponent extends Vue {

  @Prop() private position!: CoordinateItem;
  @Prop() private zoom!: number;
  @Prop() private isMarkerDraggable: boolean =  true;

  private map: any;
  private marker: any;
  private token: string = 'pk.eyJ1IjoiYW5kcnUyNTUiLCJhIjoiY2pwdzR0ZGRiMHlvOTQ4bnR2OG9lbTNhNSJ9.isi3uGKrTkISJMlnS2T1bw';

  public beforeMount() {
    const styleElement = document.createElement('link');
    styleElement.setAttribute('rel', 'stylesheet');
    styleElement.setAttribute('href', 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css');
    document.head.appendChild(styleElement);
  }

  public mounted() {
    this.loadMapboxLib().then(() => {
      const coord = [this.position.latitude, this.position.longitude];
      L.mapbox.accessToken = this.token;
      this.map = L.mapbox.map('map', 'mapbox.streets');
      this.marker = new L.marker( new L.LatLng(this.position.latitude, this.position.longitude), {
        draggable: this.isMarkerDraggable,
      });
      this.map.setView(coord, this.zoom);
      this.marker.setLatLng(coord).addTo(this.map);
      this.marker.on('dragend', this.onDragEndMarker);
      this.map.on('zoomend', this.onZoomEndMap);
      this.$emit('onMainMarkerGetLocation', this.marker);
    });
  }

  @Watch('position')
  public onChangePosition() {
    const coord = [this.position.latitude, this.position.longitude];
    this.map.setView(coord, this.zoom);
    this.marker.setLatLng(coord);
  }

  @Watch('isMarkerDraggable')
  public onChangeDraggableMode() {
    this.marker.dragging.disable();
    if ( this.isMarkerDraggable ) {
      this.marker.dragging.enable();
    }
  }

  private onDragEndMarker() {
    this.$emit('onMainMarkerGetLocation', this.marker);
  }

  private onZoomEndMap() {
    this.$emit('onZoomEndMap', this.map.getZoom());
  }


  private loadMapboxLib(): Promise<() => void> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('src', 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js');
      document.head.appendChild(scriptElement);
      scriptElement.onload = () => {
        resolve();
      };
      scriptElement.onerror = () => {
        reject();
      };
    });
  }
}
</script>

<style>
  #map {
    width: 100%;
    height: 500px;
    background-color: #ddd;
  }
</style>