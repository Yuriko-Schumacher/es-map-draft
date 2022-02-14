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
      <div class="source">
        <em>Source: <a href="{data.source_link}" target="_blank">{data.source_text}</a></em>
      </div>
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

  div.mini-map {
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

  .source {
    font-size: 0.7rem;
    /* text-align: right; */
    color: gray;
  }
  
  @media only screen and (max-width: 600px) {
    div.mini-map {
      display: none;
    }

    div.container {
      flex-direction: column;
      gap: 0;
    }

    div.donut-title {
      text-align: left;
    }

    div.donut-chart {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
</style>