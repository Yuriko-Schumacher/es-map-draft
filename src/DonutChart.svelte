<script>
	import { arc } from 'd3-shape';
  import { select, selectAll } from 'd3'

  export let data;
  let chartData = [
    {race: "Asian", value: data.asian, color: "#B158C0", colorDark: "#693573"},
    {race: "Black", value: data.black, color: "#FC5F9E", colorDark: "#973A5F"},
    {race: "Caucasian", value: data.caucasian, color: "#005DC7", colorDark: "#003877"},
    {race: "Hispanic", value: data.hispanic, color: "#F9F871", colorDark: "#969643"},
    {race: "Other", value: data.other, color: "lightgray", colorDark: "#7F7F7F"}
  ]

  if (data.percentage == "TRUE") {
    chartData.map(d => {d.value = Math.round(d.value * 100 * 10) / 10})
  } else {
    chartData.map(d => {d.value = Math.round(d.value / data.total * 100 * 10) / 10})
  }
  chartData.sort((a, b) => b.value - a.value)

  const fn = arc();
	let angle = Math.PI * 2;

  let arcs;
  $: {
    let acc = 0;
    arcs = chartData.map(d => {
      const options = {
        innerRadius: 20,
        outerRadius: 50,
        startAngle: acc,
        endAngle: (acc += (angle * d.value / 100))
      };
      return {
        color: d.color,
        colorDark: d.colorDark,
        label: d.race,
        d: fn(options),
        centroid: fn.centroid(options)
      }
    })
  }
  console.log(chartData)

  function donutMouseOver() {
    let id = select(this).attr("id")
    let thisD = chartData.filter(d => d.race == id)[0]
    let thisArc = arcs.filter(d => d.label == id)[0]
    select(this).attr('fill', thisD.colorDark)
    select('.donut-tooltip')
      .style("display", "block")
      .style("top", `${thisArc.centroid[1] + 55}px`)
      .style("left", `${thisArc.centroid[0] + 55}px`)
      .html(`${thisD.race}: ${thisD.value}%`)
    select(`rect.${id}`).attr('fill', thisD.colorDark)
    select(`text.${id}`).style('font-weight', 'bold')
  }
  function donutMouseOut() {
    let id = select(this).attr("id")
    let thisData = chartData.filter(d => d.race == id)[0]
    select(this).attr('fill', thisData.color)
    select(`rect.${id}`).attr('fill', thisData.color)
    select(`text.${id}`).style('font-weight', 'normal')
  }
</script>

<g class="chart" transform="translate(55, 55)">
  {#each arcs as arc}
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <path
      on:mouseover={donutMouseOver}
      on:mouseout={donutMouseOut}
      d={arc.d}
      fill={arc.color}
      stroke="gray"
      stroke-width=1
      id={arc.label}/>
  {/each}
</g>
<g class="chart-legend" transform="translate(110, 0)">
  {#each chartData as d, i}
    <rect
      x=10
      y={i * 20 + 10}
      width={12}
      height={12}
      fill={d.color}
      stroke="gray"
      stroke-width=1
      class={d.race}
    ></rect>
    <text
      x=25
      y={i * 20 + 22}
      class={d.race}
    >{d.race}: {d.value}%</text>
  {/each}
</g>

<style>
  path {
    cursor: pointer;
  }
  text {
    font-size: 0.75rem;
  }
</style>