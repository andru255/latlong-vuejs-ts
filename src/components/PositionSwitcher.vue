<template>
    <fieldset>
        <legend>Get position</legend>
        <label for="drag">
            Drag marker 
            <input type="radio" v-model="editMode" id="drag" value="draggable" selected>
        </label>
        <label for="changeByText">
            Edit coordinate 
            <input type="radio" v-model="editMode" id="changeByText" value="changeByText">
        </label>
    </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class PositionSwitcherComponent extends Vue {
    private editMode!: string;

    public data(): any {
        return {
            editMode: 'draggable',
        };
    }

    @Watch('editMode')
    private onChangeMode() {
        this.$emit('onChangeMode', this.editMode);
    }
}
</script>