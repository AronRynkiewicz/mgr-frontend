import style from "./RunBlast.module.css";
import Button from "@material-ui/core/Button";
import axios from "axios";

const RunBlast = (props) => {
  const data = {
    seqs: [
      {
        seq_name: ">Query1",
        seq: "ATGGCAAATATATTTAACTCGATAAGAATGAAACGTCCTCGTCGGAATGCTTTCAACTTATCATATGAATCAAAGTTAACGTTG",
      },
    ],
  };

  const changeCard = (index) => {
    props.handleChange(null, index);
    props.handleChangeIndex(index);
  };

  const runBlast = () => {
    props.handleResults(undefined);
    props.changeDisable(false);
    changeCard(1);
    axios.post("api/blast/", data).then((resp) => {
      props.handleResults(resp.request.response);
    });
  };
  return (
    <div>
      <div>Some long text explaing what to do</div>
      <div>
        <textarea className={style.textinput}></textarea>
        <div className={style.button}>
          <Button variant="contained" color="primary" onClick={runBlast}>
            Run Blast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RunBlast;
