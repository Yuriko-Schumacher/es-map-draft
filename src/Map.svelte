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

  let w, h;

  $: projection = geoAlbersUsa().fitSize([w, h], mapData)
  $: path = geoPath(projection)

</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
  <!-- Width: {w} -->
  <Modal show={$modal} transitionBgProps={{ duration: 0 }} styleCloseButton={{cursor: "pointer"}}>
    <svg
      width={w}
      height={h}
    >
    <MapPath width={w} data={mapData} path={path}/>
    <Circles width={w} data={districtData} projection={projection}/>
    </svg>
  </Modal>
</div>

<style>
  div {
    height: 520px;
  }

  .points text {
    font-size: 10px;
  }
</style>