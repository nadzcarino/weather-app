<template>
  <div id="app">    
    <select v-model="city" @change="getData">
      <option value="Manila">Manila</option>
      <option value="London">London</option>
      <option value="Tokyo">Tokyo</option>
    </select>    
    <LineChart v-if="loaded" :data="chartData" :options="options" />
  </div>
</template>

<script>
import LineChart from "./components/LineChart";
import axios from "axios";

export default {
  name: "App",
  components: {
    LineChart
  },

  data() {
    return {
      loaded: false,
      city: 'Manila',
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: "",
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },

  created() {
    console.log("CREATING...")
    this.getData();
  },

  methods: {
    getData() {
      axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&&appid=bb752597415c47f3f901009e150a280e`
      )
      .then(response => {
        this.chartData.datasets[0].label = `${this.city} weather forecast`;
        this.chartData.labels = Object.keys(response.data.list[0].main);
        this.chartData.datasets[0].data = Object.values(
          response.data.list[0].main
        );
        this.loaded = true;        
      })
      .catch(error => console.log(error));
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
