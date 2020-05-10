//import axios from 'axios';

import axios from "axios";

export default {
  data: "",
  getData() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=manila&&appid=bb752597415c47f3f901009e150a280e`
      )
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => console.log(error));
  },
};
