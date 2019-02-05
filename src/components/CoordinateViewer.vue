<template>
    <fieldset>
        <legend>Coordinate</legend>
        <label for="latitude">Latitude</label> 
        <input placeholder="Latitude" id="Latitude" :value=latitude readonly/>
        <label for="longitude">Longitude</label>
        <input placeholder="Longitude" id="Longitude" :value=longitude readonly/>
        <a href="#" id="lnkReset">reset</a>
    </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CoordinateViewerComponent extends Vue {
    @Prop() private latitude!: string;
    @Prop() private longitude!: string;
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
