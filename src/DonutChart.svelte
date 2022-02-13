<script>
	import { arc } from 'd3-shape';


  export let data;
  let chartData = [
    {race: "Asian", value: data.asian, color: "#B158C0"},
    {race: "Black", value: data.black, color: "#FC5F9E"},
    {race: "Caucasian", value: data.caucasian, color: "#005DC7"},
    {race: "Hispanic", value: data.hispanic, color: "#F9F871"},
    {race: "Other", value: data.other, color: "lightgray"}
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
        label: d.race,
        d: fn(options),
        centroid: fn.centroid(options)
      }
    })
  }
</script>

<g class="chart" transform="translate(75, 50)">
  {#each arcs as arc}
    <path
      d={arc.d}
      fill={arc.color}
      stroke="gray"
      stroke-width=1/>
  {/each}
</g>