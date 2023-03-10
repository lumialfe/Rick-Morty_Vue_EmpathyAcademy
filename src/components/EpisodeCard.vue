<template>
  <div className='main-card'>
    <img className='card-image' loading='lazy' v-bind:src="episode.image" v-bind:alt="episode.name"/>
    <p className="card-name">{{ episode.name }}</p>
    <p className="card-text">
      <span className="card-text-span">
              Episode: {{ episode.episode }}
      </span>
      <span className="card-text-span">
              AirDate: {{ episode.air_date }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['episode']
};
</script>

<style scoped lang="scss">
.main-card {
  background-color: #f8f8f8;
  padding: 2.5vh 1vw;
  display: grid;
  grid-template-areas: "image" "name" "text";
  border-radius: 5px;

  box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;

  .card-image {
    grid-area: image;
    width: 100%;
    border-radius: 5px;
  }

  .card-name {
    grid-area: name;
    font-size: 200%;
    font-weight: bold;

    margin: 1vw;
  }

  .card-text {
    grid-area: text;
    text-align: left;
    display: flex;
    flex-flow: column nowrap;

    margin: 0;

    .card-text-span {
      text-align: left;
      margin-left: 1vw;
    }
  }
}

@media only screen and (max-width: 640px) {
  .card-image {
    max-width: 80%;
    margin: 0 auto auto;
  }

  .card-name {
    font-size: 1rem !important;

    .card-text-span {
      margin-left: 3vw;
      font-size: 50%;
    }
  }


}
</style>