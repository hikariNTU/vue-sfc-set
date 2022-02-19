const getSfcText = (name: string) => 
`<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '${name}',
  setup() {
    return {};
  },
});
</script>

<style>
</style>
`;

export {getSfcText};