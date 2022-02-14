<script>
  import { geoAlbersUsa, geoPath } from 'd3-geo';

  import MapPath from './MapPath.svelte';
  import DonutChart from './DonutChart.svelte'

  export let data;
  export let mapData;
  export let projection;
  export let path;

  let rightWidth = 250;

  $: projection = geoAlbersUsa().fitSize([150, 100], mapData)
  $: path = geoPath(projection)
  $: coordinates = projection([data.long, data.lat])

</script>

<div class="container">
  <div class="left">
    <h2>{data.district}</h2>
    <div class="summary"><p>{@html data.summary}</p></div>
    <div class="class-summary"><p>{@html data.study_summary}</p></div>
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
      <!-- <div class="donut-tooltip"></div> -->
      <svg width=250 height=110>
        <DonutChart data={data}/>
      </svg>
    </div>
  </div>
</div>

<style>
  div.container {
    display: flex;
    gap: 2rem;
  }
  div.right {
    flex: 0 0 250px;
    margin-right: 2rem;
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
  .donut-chart {
    position: relative;
  }
  /* .donut-tooltip {
    background: rgba(255, 255, 255, 0.9);
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    border: 1.5px solid black;
    border-radius: 0.1rem;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.3rem 0.5rem;
  } */
</style>