import LinearProgress from "@material-ui/core/LinearProgress";

const DisplaySearchResults = (props) => {
  let loadingBar = props.display;
  if (props.data) {
    loadingBar = false;
  }

  return (
    <div>
      <LinearProgress hidden={!loadingBar} />
      {console.log(props.data)}
    </div>
  );
};

export default DisplaySearchResults;
