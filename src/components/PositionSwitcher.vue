<template>
    <fieldset>
        <legend>Get position</legend>
        <label for="drag">
            Drag marker 
            <input type="radio" v-model="editMode" id="drag" value="draggable" selected>
        </label>
        |
        <label for="changeByText">
            Edit coordinate 
            <input type="radio" v-model="editMode" id="changeByText" value="changeByText">
        </label>
        <span v-show="browserGeolocationAvailable">
        |
        </span>
        <a href="#" v-on:click=onGetPositionByBrowser v-show="browserGeolocationAvailable">By browser</a>
    </fieldset>
</template>

<script lang="ts">
import { CoordinateItem } from '../interfaces';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class PositionSwitcherComponent extends Vue {
    private editMode!: string;
    private browserGeolocationAvailable!: boolean;

    public data(): any {
      return {
        editMode: 'draggable',
        browserGeolocationAvailable: false,
      };
    }

    public mounted() {
      if ('geolocation' in navigator) {
        this.browserGeolocationAvailable = true;
      }
    }

    public onGetPositionByBrowser(event: any) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        const coordinate: CoordinateItem =  {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        this.$emit('onGetPositionByBrowser', coordinate);
      }, () => {
        this.$emit('onGetPositionByBrowser', undefined);
      });
      event.preventDefault();
    }

    @Watch('editMode')
    private onChangeMode() {
      this.$emit('onChangeMode', this.editMode);
    }
}
</script>