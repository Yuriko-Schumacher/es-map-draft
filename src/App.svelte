<script>
  import { csv, json } from 'd3';

  import MapContainer from './MapContainer.svelte';

  export let datasets = [];
  let districtD = [];
  let timelineD = []
  let mapD = [];

  let promise = getData();

  async function getData() {
    districtD = await csv("data/districts.csv");
    timelineD = districtD;
    mapD = await json("data/us-states.geo.json");
    datasets = [districtD, timelineD, mapD];
  }


</script>

<main>
  {#await promise then dataset}
    <MapContainer dataset={datasets}/>
  {/await}
</main>

<style>
</style>