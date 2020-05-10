<script>
import { Line } from "vue-chartjs";

export default {
  name: "HelloWorld",
  extends: Line,
  props: ["data", "options"],
  watch: {
    data: function(a, b) {
      console.log(a, b)
    }
  },
  mounted() {    
    console.log("TEST")
    this.renderChart(this.data, this.options);
  }
};
</script>