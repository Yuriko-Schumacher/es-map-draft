<script>
  import { getContext } from 'svelte';
  import { geoAlbersUsa, geoPath } from 'd3-geo';
  import { select } from 'd3'

	import Circles from './Circles.svelte';
  import Modal from './Modal.svelte';
	import { modal } from './stores.js';

  export let mapData;
  export let districtData;


  let w;
  let h;

  let projection = geoAlbersUsa()
  let path = geoPath(projection) 

</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
  <Modal show={$modal} transitionBgProps={{ duration: 0 }} styleCloseButton={{cursor: "pointer"}}>
    <svg
      width={w}
      height={h}
    >
      <g class="map">
        {#each mapData as feature}
          <path
            d={path(feature)}
            fill="none"
            stroke="gray"
            stroke-width=1
          />
        {/each}
      </g>
      <g class="points">
        <Circles data={districtData} />
        {#each districtData as d}
          <text
            x={projection([d.long, d.lat])[0] + 13}
            y={projection([d.long, d.lat])[1] + 3}
          >{d.city}</text>
        {/each}
      </g>
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