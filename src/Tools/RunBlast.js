import style from "./RunBlast.module.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useState } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const handleInputValidation = (input) => {
  input = input.trim();
  if (input.length === 0) {
    return [false, "Input should not be empty."];
  }

  if (input.includes("\n") && input.includes(">")) {
    input = input.split("\n");
    input = input.filter((val) => val.length > 0);

    for (const [it, val] of input.entries()) {
      if (val.startsWith(">")) {
        if (it + 1 !== input.length) {
          continue;
        } else {
          return [false, "Header should have sequence."];
        }
      }
      if (/^[ACGTU]+$/i.test(val)) {
        continue;
      } else {
        return [false, "Sequences should contain only A, C, G, T and U."];
      }
    }
    return [true, "OK"];
  }
  return [false, "Valid FASTA sequence consists of header and sequence."];
};

const parseInput = (input) => {
  const data = {
    seqs: [],
  };
  input = input.split("\n");
  input = input.filter((val) => val.length > 0);

  let currentKey = "";
  let currentSeq = "";
  for (const val of input) {
    if (val.startsWith(">")) {
      if (currentKey.length !== 0) {
        data.seqs.push({
          seq_name: currentKey,
          seq: currentSeq.toUpperCase(),
        });
        currentKey = "";
        currentSeq = "";
      }
      currentKey = val.trim();
    } else {
      currentSeq += val.trim();
    }
  }

  if (currentKey.length !== 0) {
    data.seqs.push({
      seq_name: currentKey,
      seq: currentSeq.toUpperCase(),
    });
  }

  return data;
};

const RunBlast = (props) => {
  const [validInput, inputValidation] = useState([false, ""]);
  const [seqs, changeSeqs] = useState("");

  const changeCard = (index) => {
    props.handleChange(null, index);
    props.handleChangeIndex(index);
  };

  const runBlast = () => {
    const data = parseInput(seqs);
    props.handleResults(undefined);
    props.changeDisable(false);
    changeCard(1);
    axios.post("api/blast/", data).then((resp) => {
      props.handleResults(resp.request.response);
    });
  };

  const handleInputChange = (event) => {
    const [validationResult, message] = handleInputValidation(
      event.target.value
    );

    if (validationResult) {
      inputValidation([true, message]);
    } else {
      inputValidation([false, message]);
    }

    changeSeqs(event.target.value);
  };

  return (
    <div>
      <div>Some long text explaing what to do</div>
      <div>
        <textarea className={style.textinput} onChange={handleInputChange} />
      </div>
      <div>
        {validInput[0] ? (
          <div>
            <CheckCircleOutlineIcon style={{ fill: "green" }} /> {validInput[1]}
          </div>
        ) : (
          <div>
            <ErrorOutlineIcon color="error" />
            {validInput[1]}
          </div>
        )}
      </div>
      <div className={style.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={runBlast}
          disabled={!validInput[0]}
        >
          Run Blast
        </Button>
      </div>
    </div>
  );
};

export default RunBlast;
