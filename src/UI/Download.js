import DownloadButton from "../Tools/DownloadButton";

const Download = (props) => {
  return (
    <div>
      <DownloadButton fileType="database" fileName="interactions.json" />
      <DownloadButton fileType="sequences" fileName="sequences.fa" />
    </div>
  );
};

export default Download;
