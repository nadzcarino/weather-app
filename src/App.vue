<template>
  <div id="app">          
    <div v-if="loaded">      
      <select v-model="city" @change="getData">
      <option value="Manila">Manila</option>
      <option value="London">London</option>
      <option value="Yokohama">Yokohama</option>
      <option value="Jakarta">Jarkata</option>
      <option value="Delhi">Delhi</option>
    </select> 
    <h3>{{ `5 Days Temperature forecast for ${city}` }}</h3>   
    <LineChart :data="chartData" :options="options"/>
    </div>
  </div>
</template>

<script>
import LineChart from "./components/LineChart";
import axios from "axios";
import * as moment from "moment/moment";

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
    this.getData();
  },

  methods: {
    getData() {         
      let chartData = [];  
      let chartLabel = [];
      this.loaded = false;
      axios
      .get(        
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&&appid=bb752597415c47f3f901009e150a280e`
      )
      .then(response => {        
        response.data.list.forEach(datum => {          
          chartLabel.push(moment(datum.dt * 1000).format("M/D LT"));               
          chartData.push(datum.main.temp);          
        });
        this.chartData.labels = chartLabel;
        this.chartData.datasets[0].data = chartData;
        this.chartData.datasets[0].label = this.city;
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
