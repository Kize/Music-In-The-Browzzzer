<style lang="scss" scoped>
  .eg-slideshow .eg-slide .eg-slide-content .slide {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("../../../assets/img/main-bg.jpg");
    color: white;

    .content {
      background-color: rgba(37, 37, 37, 0.6);
      width: fit-content;
      margin: auto;

      h1 {
        margin-top: 250px;
      }
    }

    .footer {
      display: flex;
      justify-content: space-around;
      background-color: rgba(37, 37, 37, 0.6);
      bottom: 70px;
      position: absolute;
      width: 100%;

      img {
        padding-top: 4px;
        width: 200px;
        height: 57px;
      }
    }
  }

</style>

<template>
  <div class="slide">
    <div class="content">
      <h1>Music in the browzzzer</h1>
      <p>Codons un synthétiseur avec la Web Audio API</p>
    </div>

    <div class="footer">
      <span>Antoine Cordier <br/> Alban Delcourt</span>

      <span> Technozaure Mars 2018</span>

      <img src="../../../assets/img/znk.png">
    </div>
  </div>
</template>

<script>
  export default {}
</script>
