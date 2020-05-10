<script>
import axios from "axios";
import { Line } from "vue-chartjs";
export default {
  name: "HelloWorld",
  extends: Line,
  data() {
    return {
      data: {
        labels: [],
        datasets: [
          {label: "DATA",backgroundColor: '#f87979', data: ['asd','as','wewe']}
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },

  created() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=manila&&appid=bb752597415c47f3f901009e150a280e`
      )
      .then(response => {
        this.data.labels = Object.keys(response.data.list[0].weather[0]);
//        this.data.datasets[0].data = Object.values(response.data.list[0].weather[0]);
        this.renderChart(this.data, this.options);        
      })
      .catch(e => console.log(e));
  },

  mounted() {
    
  },
};
</script>
