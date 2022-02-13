<script>
  import { getContext } from 'svelte';
  import { geoAlbersUsa, geoPath } from 'd3-geo';
  import { select } from 'd3'

  import Popup from './Popup.svelte';

  export let data;
  console.log(data)

  const { open } = getContext('simple-modal');
  console.log(open)

  let projection = geoAlbersUsa()
  let path = geoPath(projection) 
  
  function showDistrictDetails() {
    console.log(select(this).attr("id"))
    open(Popup, { message: "The details will be shown here." });
  }
</script>

{#each data as d}
  <circle 
    on:click={showDistrictDetails}
    cx={projection([d.long, d.lat])[0]}
    cy={projection([d.long, d.lat])[1]}
    r=5
    fill="#C71B1B"
    id={d.id}
  ></circle>
{/each}

<style>
  circle {
    cursor: pointer;
  }
</style>