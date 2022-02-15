<script>
  import { getContext } from 'svelte';
  import { geoAlbersUsa, geoPath } from 'd3-geo';
  import { select } from 'd3'

	import Circles from './Circles.svelte';
  import MapPath from './MapPath.svelte';
  import Modal from './Modal.svelte';
	import { modal } from './stores.js';

  export let mapData;
  export let districtData;

  let w;

  $: h = 5 * w / 9; 
  $: projection = geoAlbersUsa().fitSize([w, h], mapData)
  $: path = geoPath(projection)

</script>

<div class="container" bind:clientWidth={w}>
  {#if w !== undefined}
    <div class="tooltip"></div>
    <Modal show={$modal} transitionBgProps={{ duration: 0 }} styleCloseButton={{cursor: "pointer"}}>
      <svg
        width={w}
        height={h}
      >
      <MapPath width={w} data={mapData} path={path}/>
      <Circles width={w} data={districtData} mapData={mapData} projection={projection} path={path}/>
      </svg>
    </Modal>
  {/if}
</div>

<style>
  div.container {
    margin: 2rem 0;
    position: relative;
  }

  div.tooltip {
    max-width: 160px;
    background: rgba(255, 255, 255, 0.9);
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    border: 1.5px solid black;
    border-radius: 0.1rem;
    /* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5); */
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.3rem 0.5rem;
  }
</style>