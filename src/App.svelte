<script>
  import { csv, json } from 'd3';

  import MapContainer from './MapContainer.svelte';

  export let datasets = [];
  let districtD = [];
  let mapD = [];

  let promise = getData();

  async function getData() {
    districtD = await csv("data/districts.csv");
    mapD = await json("data/us-states.geo.json");
    datasets = [districtD, mapD];
  }


</script>

<main>
  {#await promise then dataset}
    <MapContainer dataset={datasets}/>
  {/await}
</main>

<style>
</style>