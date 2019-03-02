<template>
    <fieldset>
        <legend>Coordinate</legend>
        <label for="latitude">Latitude</label> 
        <input placeholder="Latitude" id="Latitude" :value="position.latitude" :readonly=isReadonly v-on:keyup="onChangeLatitude" />
        <label for="longitude">Longitude</label>
        <input placeholder="Longitude" id="Longitude" :value="position.longitude" :readonly=isReadonly v-on:keyup="onChangeLongitude" />
        <a href="#" id="lnkReset" v-on:click=onReset>reset</a>
    </fieldset>
</template>

<script lang="ts">
import { CoordinateItem } from '../interfaces';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CoordinateViewerComponent extends Vue {

  @Prop() private position!: CoordinateItem;
  @Prop() private isReadonly!: boolean;

  private internalPosition: CoordinateItem = this.position;

  public onChangeLatitude(event: any) {
    if ( this.isReadonly === true ) {
      return false;
    }
    this.internalPosition = {
      latitude: event.target.value,
      longitude: this.position.longitude,
    };
    this.$emit('onChangeCoord', this.internalPosition);
  }

  public onChangeLongitude(event: any) {
    if ( this.isReadonly === true ) {
      return false;
    }
    this.internalPosition = {
      latitude: this.position.latitude,
      longitude: event.target.value,
    };
    this.$emit('onChangeCoord', this.internalPosition);
  }

  public onReset(event: any) {
    this.$emit('onReset');
    event.preventDefault();
  }
}
</script>

<style>
input,
label {
  margin-right: 10px;
}

input[type=radio] {
  margin: 0;
}
</style>
