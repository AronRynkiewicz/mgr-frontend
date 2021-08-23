import axios from "axios";

const setHints = () => {
  let hints = sessionStorage.getItem("hints");

  if (!hints) {
    axios.get("api/hints/").then((resp) => {
      sessionStorage.setItem(
        "hints",
        JSON.stringify(JSON.parse(resp.request.response)["hints"])
      );
    });
  }
};

export default setHints;
