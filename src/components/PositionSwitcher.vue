<template>
    <fieldset>
        <legend>Get position</legend>
        <label for="drag">Drag marker <input type="radio" name="radioModes[]" id="drag"></label>
        <label for="changeByText">Edit coordinate <input type="radio" name="radioModes[]" id="changeByText"></label>
    </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PositionSwitcherComponent extends Vue {
    private latitude: string = '';
    private longitude: string = '';
}
</script>
