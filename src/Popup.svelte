<script>
  export let data;
</script>

<h2>{data.district}</h2>
<div class="summary"><p>{@html data.summary}</p></div>
<div class="mini-map"></div>
<div class="donut-chart"></div>
<div class="study"></div>

<style>
  p {
    line-height: 1.6;
  }
</style>