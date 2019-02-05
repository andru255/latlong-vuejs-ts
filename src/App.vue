<template>
  <div id="app">
    <header>
      <Form>
        <CoordinateViewer v-bind:latitude=latitude v-bind:longitude=longitude />
        <PositionSwitcher/>
      </Form>
    </header>
    <main>
      <MapViewer @onMainMarkerGetLocation=checkMarkerPosition />
    </main>
  </div>
</template>

<script lang="ts">
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

  private latitude!: string;
  private longitude!: string;

  public data(): any {
    return {
      latitude: '',
      longitude: '',
    };
  }

  public checkMarkerPosition(marker: any) {
      const position = marker.getLatLng();
      this.latitude = position.lat;
      this.longitude = position.lng;
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
