<template>
  <div id="app">
    <header>
      <Form>
        <CoordinateViewer v-bind:position=position 
            v-bind:isReadonly=isReadonly
            @onChangeCoord=onChangeCoord
            @onReset=onReset />
        <PositionSwitcher @onChangeMode=onChangeMode 
            @onGetPositionByBrowser=onGetPositionByBrowser />
      </Form>
    </header>
    <main>
      <MapViewer v-bind:position=position 
          v-bind:zoom=zoom
          v-bind:isMarkerDraggable=isMarkerDraggable
          @onMainMarkerGetLocation=checkMarkerPosition 
          @onZoomEndMap=onZoomEndMap />
    </main>
  </div>
</template>

<script lang="ts">
import { CoordinateItem } from './interfaces';
import { Component, Vue } from 'vue-property-decorator';
import MapViewer from './components/MapViewer.vue';
import CoordinateViewer from './components/CoordinateViewer.vue';
import PositionSwitcher from './components/PositionSwitcher.vue';

@Component({
  components: {
    MapViewer,
    CoordinateViewer,
    PositionSwitcher,
  },
})
export default class App extends Vue {

  private readonly defaultPosition: CoordinateItem = {
    latitude: 40,
    longitude: -74.5,
  };
  private position: CoordinateItem = this.defaultPosition;
  private readonly defaultZoom: number = 9;
  private zoom: number = this.defaultZoom;
  private isMarkerDraggable: boolean = true;
  private isReadonly: boolean = true;

  public data(): any {
    return {
      isMarkerDraggable: true,
      isReadonly: true,
    };
  }

  public checkMarkerPosition(marker: any) {
    const position = marker.getLatLng();
    this.position = {
      latitude: position.lat,
      longitude: position.lng,
    };
  }

  public onZoomEndMap(currentZoom: number) {
    this.zoom = currentZoom;
  }

  public onChangeMode(mode: string) {
    this.isMarkerDraggable = true;
    this.isReadonly = true;

    if (mode === 'changeByText') {
      this.isMarkerDraggable = false;
      this.isReadonly = false;
    }
  }

  public onGetPositionByBrowser(coordinate: CoordinateItem) {
    if (typeof coordinate !== 'undefined') {
      this.position = coordinate;
      return;
    }
    console.log('Please enable your geolocation feature');
  }

  public onChangeCoord(position: CoordinateItem) {
    this.position = position;
  }

  public onReset() {
    this.position = this.defaultPosition;
    this.zoom = this.defaultZoom;
  }
}
</script>

<style lang="scss">
body, app {
  margin: 0;
  padding: 0;
}

form {
  background: #fff;
  padding: 10px;
}
</style>
