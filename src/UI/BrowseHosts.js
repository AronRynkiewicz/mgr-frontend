import Tree from "../Tools/Tree";

const BrowseHosts = (props) => {
  return (
    <div style={{ height: "75vh", overflowY: "auto" }}>
      <Tree id="Bacteria" name="Bacteria" />
      <Tree id="Archaea" name="Archaea" />
    </div>
  );
};

export default BrowseHosts;
