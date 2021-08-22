import LinearProgress from "@material-ui/core/LinearProgress";

const BlastResults = (props) => {
  let loadingBar = true;
  if (props.results) {
    loadingBar = false;
  }

  return (
    <div>
      <LinearProgress hidden={!loadingBar} />
      {console.log(props.results)}
    </div>
  );
};

export default BlastResults;
