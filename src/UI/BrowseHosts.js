import Tree from "../Tools/Tree";

const BrowseHosts = (props) => {
  return (
    <div style={{ height: "75vh", overflowY: "auto" }}>
      <Tree id="1" name="Bacteria" />
      <Tree id="2" name="Archaea" />
    </div>
  );
};

export default BrowseHosts;
