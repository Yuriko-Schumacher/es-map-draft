<script>
  // import * as d3 from 'd3';
  import { onMount } from 'svelte';

  import Title from './Title.svelte';
  import Map from './Map.svelte';
  import Credit from './Credit.svelte'

  export let dataset;
  // export let districtsD;
  // export let timelineD;

  let districtsD = dataset[0]
  let mapD = dataset[1]

  districtsD.map(d => {
    d.lat = +d.lat;
    d.long = +d.long;
    d.total = d.total != "NA" ? +d.total : "NA";
    d.hispanic = +d.hispanic;
    d.caucasian = +d.caucasian;
    d.black = +d.black;
    d.asian = +d.asian;
    d.other = +d.other;
    d.sum = +d.sum;
  })
</script>

<div>
  <Title />
  <Map districtData={districtsD} mapData={mapD}/>
  <Credit />
</div>

<style>
  div {
    margin: 0 auto;
    max-width: 900px;
  }
</style>
