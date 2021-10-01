import { saveAs } from "file-saver";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const DownloadButton = (props) => {
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);

    fetch("api/download/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: props.fileType }),
    })
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        saveAs(data, props.fileName);
      })
      .then(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        loading={loading}
        disabled={loading}
        loadingPosition="start"
        startIcon={loading ? <CircularProgress size={20} /> : <GetAppIcon />}
        variant="contained"
        color="primary"
      >
        Download {props.fileType}
      </Button>
    </div>
  );
};

export default DownloadButton;
