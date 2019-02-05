<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

declare const L: any;

@Component
export default class MapViewerComponent extends Vue {

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
      const defaultCoord = [40, -74.50];
      L.mapbox.accessToken = this.token;
      const map = L.mapbox.map('map', 'mapbox.streets');
      this.marker = new L.marker( new L.LatLng(defaultCoord[0], defaultCoord[1]), {
        draggable: true,
      });
      map.setView(defaultCoord, 9);
      this.marker.setLatLng(defaultCoord).addTo(map);
      this.marker.on('dragend', this.onDragEndMarker);
      this.$emit('onMainMarkerGetLocation', this.marker);
    });
  }

  private onDragEndMarker() {
    this.$emit('onMainMarkerGetLocation', this.marker);
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