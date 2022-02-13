<script>
  import { getContext } from 'svelte';
  import { select } from 'd3'

  import Popup from './Popup.svelte';

  export let width;
  export let data;
  export let projection;
  console.log(data)

  const { open } = getContext('simple-modal');
  
  function showDistrictDetails() {
    console.log(select(this).attr("id"))
    let id = select(this).attr("id")
    let d = data.filter(d => d.id == id)
    open(Popup, { data: d[0] });
  }

  function handleMouseOver() {
    select(this).attr("r", width / 50).attr("fill-opacity", 1)
  }

  function handleMouseOut() {
    select(this).attr("r", width / 100).attr("fill-opacity", 0.5)
  }
</script>

{#if width !== undefined}
  <g class="points">
    {#each data as d}
      <circle 
        on:click={showDistrictDetails}
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        cx={projection([d.long, d.lat])[0]}
        cy={projection([d.long, d.lat])[1]}
        r={width / 100}
        fill="#C71B1B"
        fill-opacity=0.5
        id={d.id}
      ></circle>
    {/each}
  </g>
{/if}

<style>
  circle {
    cursor: pointer;
  }
</style>