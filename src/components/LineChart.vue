<script>
import { Line } from "vue-chartjs";

export default {
  name: "HelloWorld",
  extends: Line,
  props: ["data", "options"],

  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>