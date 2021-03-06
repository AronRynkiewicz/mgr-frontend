import Tree from "../Tools/Tree";
import BrowseTags from "./BrowseTags";

const BrowseHosts = (props) => {
  return (
    <>
      <div style={{ margin: 10 }}>
        <BrowseTags tag_rank="superkingdom" tag_text="SK: Superkingdom" />
        <BrowseTags tag_rank="phylum" tag_text="P: Phylum" />
        <BrowseTags tag_rank="class" tag_text="C: Class" />
        <BrowseTags tag_rank="order" tag_text="O: Order" />
        <BrowseTags tag_rank="family" tag_text="F: Family" />
        <BrowseTags tag_rank="genus" tag_text="G: Genus" />
        <BrowseTags tag_rank="species" tag_text="S: Species" />
      </div>

      <div style={{ height: "70vh", overflowY: "auto" }}>
        <Tree
          id="Bacteria"
          handleBrowseToSearch={props.handleBrowseToSearch}
          name={
            <>
              <BrowseTags tag_rank="superkingdom" tag_text="SK" /> Bacteria{" "}
            </>
          }
        />
        <Tree
          id="Archaea"
          handleBrowseToSearch={props.handleBrowseToSearch}
          name={
            <>
              <BrowseTags tag_rank="superkingdom" tag_text="SK" /> Archaea{" "}
            </>
          }
        />
      </div>
    </>
  );
};

export default BrowseHosts;
