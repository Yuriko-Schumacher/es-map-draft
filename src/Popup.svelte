<script>
  export let data;
</script>

<div class="container">
  <div class="left">
    <h2>{data.district}</h2>
    <div class="summary"><p>{@html data.summary}</p></div>
  </div>
  <div class="right">
    <div class="mini-map"></div>
    <div class="donut-chart"></div>
  </div>
</div>
<div class="study"></div>

<style>
  div.container {
    display: flex;
  }
  div.container > div {
    width: 50%;
  }
  div.right {
    background: turquoise;
  }
</style>