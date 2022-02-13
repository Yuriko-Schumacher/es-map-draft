<script>
  import { geoAlbersUsa, geoPath } from 'd3-geo';

  import MapPath from './MapPath.svelte';

  export let data;
  export let mapData;
  export let projection;
  export let path;

  let rightWidth = 200;

  $: projection = geoAlbersUsa().fitSize([150, 100], mapData)
  $: path = geoPath(projection)
  $: coordinates = projection([data.long, data.lat])
</script>

<div class="container">
  <div class="left">
    <h2>{data.district}</h2>
    <div class="summary"><p>{@html data.summary}</p></div>
  </div>
  <div class="right">
    <div class="mini-map">
      <svg width="150">
        <MapPath width={150} data={mapData} path={path}/>
        <circle
          cx={coordinates[0]}
          cy={coordinates[1]}
          r={7}
          fill="#005dc7"
        ></circle>
      </svg>
    </div>
    <div class="donut-chart"></div>
  </div>
</div>
<div class="study"></div>

<style>
  div.container {
    display: flex;
    gap: 1rem;
  }
  div.right {
    flex: 0 0 200px;
  }
  div.mini-map {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>