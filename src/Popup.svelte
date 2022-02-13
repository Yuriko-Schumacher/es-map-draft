<script>
  import { geoAlbersUsa, geoPath } from 'd3-geo';

  import MapPath from './MapPath.svelte';
  import DonutChart from './DonutChart.svelte'

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
      <svg width=150 height=95>
        <MapPath width={150} data={mapData} path={path}/>
        <circle
          cx={coordinates[0]}
          cy={coordinates[1]}
          r={7}
          fill="#005dc7"
        ></circle>
      </svg>
    </div>
    <div class="donut-title">Students' racial breakdown</div>
    <div class="donut-chart">
      <svg width=150>
        <DonutChart data={data}/>
      </svg>
    </div>
  </div>
</div>
<div class="study"></div>

<style>
  div.container {
    display: flex;
    gap: 2rem;
  }
  div.right {
    flex: 0 0 200px;
  }
  div.right > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .donut-title {
    font-size: 0.8rem;
    padding: 1.5rem 1rem 0.5rem 1rem;
    text-align: center;
    font-weight: bold;
    line-height: 1;
  }
</style>