import DownloadButton from "../Tools/DownloadButton";

const Download = (props) => {
  return (
    <div>
      <DownloadButton fileType="database" fileName="interactions.json" />
      <DownloadButton fileType="sequences" fileName="sequences.fa" />
      {/* <button
        onClick={() => {
          fetch("api/download/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ file: "database" }),
          })
            .then((response) => {
              return response.blob();
            })
            .then((data) => {
              saveAs(data, "interactions.json");
            });
        }}
      >
        Download database (JSON)
      </button>

      <button
        onClick={() => {
          fetch("api/download/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ file: "sequences" }),
          })
            .then((response) => {
              return response.blob();
            })
            .then((data) => {
              saveAs(data, "sequences.fa");
            });
        }}
      >
        Download sequences
      </button> */}
    </div>
  );
};

export default Download;
