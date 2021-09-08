import Tree from "../Tools/Tree";
import BrowseTags from "./BrowseTags";

const BrowseViruses = (props) => {
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

      <div style={{ height: "75vh", overflowY: "auto" }}>
        <Tree
          id="Viruses"
          name={
            <>
              <BrowseTags tag_rank="superkingdom" tag_text="SK" /> Viruses{" "}
            </>
          }
        />
      </div>
    </>
  );
};

export default BrowseViruses;
