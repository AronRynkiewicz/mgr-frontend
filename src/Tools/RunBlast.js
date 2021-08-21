import style from "./RunBlast.module.css";
import Button from "@material-ui/core/Button";

const RunBlast = (props) => {
  const changeCard = (index) => {
    props.handleChange(null, index);
    props.handleChangeIndex(index);
  };

  const runBlast = () => {
    props.changeDisable("");
    changeCard(1);
  };
  return (
    <div>
      <div>
        <p>Some long text explaing what to do</p>
      </div>
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
