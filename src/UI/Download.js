import DownloadButton from "../Tools/DownloadButton";
import SimpleCard from "./SimpleCard";

const Download = (props) => {
  return (
    <div>
      <SimpleCard
        title="Download database"
        body="Download whole database, except for viral sequences, in JSON file format."
        button={
          <DownloadButton fileType="database" fileName="interactions.json" />
        }
      />
      <SimpleCard
        title="Download sequences"
        body="Download all present in database viral sequnces in fasta format. Sequence header consits of viral organism name, which words are joined by underscore sign (_)."
        button={<DownloadButton fileType="sequences" fileName="sequences.fa" />}
      />
    </div>
  );
};

export default Download;
