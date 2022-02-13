<script>
  import { getContext } from 'svelte';
  import { spring } from "svelte/motion";
  import { select } from 'd3'
  import { forceSimulation, forceCollide, forceX, forceY } from "d3-force"

  import Popup from './Popup.svelte';

  export let width;
  export let mapData;
  export let data;
  export let projection;
  export let path;

  const { open } = getContext('simple-modal');
  // const move = (cx, cy) => `transform: translate(${cx}px, ${cy}px)`;

  let rSmall, rLarge, simulation
  
  function showDistrictDetails() {
    let id = select(this).attr("id")
    let d = data.filter((d, i) => i == id)
    open(Popup, { data: d[0], projection: projection, path: path, mapData: mapData});
  }
  function handleMouseOver() {
    select(this).attr("r", rLarge)
    let id = select(this).attr("id")
    let thisD = data.filter((d, i) => i == id)[0]
    let x = thisD.long < -80 
            ? +select(this).attr("cx") + rSmall
            : +select(this).attr("cx") - rSmall - 160
    let y = +select(this).attr("cy") + rSmall

    let tooltip = select('.tooltip')

    tooltip
      .style("display", "block")
      .style("top", `${y}px`)
      .style("left", `${x}px`)
      .html(`${thisD.district}`)
  }
  function handleMouseOut() {
    select(this).attr("r", rSmall)
    select('.tooltip').style("display", "none")
  }

  let circles = spring(data.map((d, i) => ({
    x: 0,
    y: 0,
    id: i
  })),
    {
      stiffness: 1,
      damping: 1
    }
  )

  $: if(width !== undefined) {  
    rSmall = width / 100
    rLarge = width / 50
    simulation = forceSimulation(data)
      .force("collide", forceCollide().radius(rSmall * 1.1))
      .force(
        "x", forceX().x((d) => projection([d.long, d.lat])[0])
      )
      .force(
        "y", forceY().y((d) => projection([d.long, d.lat])[1])
      )
      .stop()
      .tick(100);

    let newCircles = data.map((d, i) => ({
      x: d.x,
      y: d.y,
      id: i
    }))
    circles.set(newCircles)
  }
</script>

{#if width !== undefined}
  <g class="points">
    {#each $circles as {x, y, id}}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <circle 
        on:click={showDistrictDetails}
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        cx={x}
        cy={y}
        r={rSmall}
        fill="#005dc7"
        fill-opacity=0.8
        id={id}
      ></circle>
    {/each}
  </g>
{/if}

<style>
  circle {
    cursor: pointer;
  }
</style>