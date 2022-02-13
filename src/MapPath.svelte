<script>
  export let width;
  export let data;
  export let path;
</script>

{#if width !== undefined}
  <g class="map">
    {#each data.features as feature}
      <path
        d={path(feature)}
        fill="#eeeeee"
        stroke="gray"
        stroke-width={width / 800}
      />
    {/each}
  </g>
{/if}