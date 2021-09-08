import Chip from "@material-ui/core/Chip";

const BrowseTags = (props) => {
  if (props.tag_rank === "superkingdom") {
    return (
      <Chip
        style={{ backgroundColor: "#e79235" }}
        label={<b>{props.tag_text}</b>}
      />
    );
  }

  if (props.tag_rank === "phylum") {
    return (
      <Chip
        style={{ backgroundColor: "#f1c32e" }}
        label={<b>{props.tag_text}</b>}
      />
    );
  }

  if (props.tag_rank === "class") {
    return (
      <Chip
        style={{ backgroundColor: "#6aaa4e" }}
        label={<b>{props.tag_text}</b>}
      />
    );
  }

  if (props.tag_rank === "order") {
    return (
      <Chip
        style={{ backgroundColor: "#3a86c7" }}
        label={<b>{props.tag_text}</b>}
      />
    );
  }

  if (props.tag_rank === "family") {
    return (
      <Chip
        style={{ backgroundColor: "#674da9" }}
        label={<b>{props.tag_text}</b>}
      />
    );
  }

  if (props.tag_rank === "genus") {
    return (
      <Chip
        style={{ backgroundColor: "#a74c7a" }}
        label={<b>{props.tag_text}</b>}
      />
    );
  }

  if (props.tag_rank === "species") {
    return (
      <Chip
        style={{ backgroundColor: "#b877af" }}
        label={<b>{props.tag_text}</b>}
      />
    );
  }
  return null;

  //   <Chip style={{ backgroundColor: "#f1c32e" }} label="P: Phylum" />
  //   <Chip style={{ backgroundColor: "#6aaa4e" }} label="C: Class" />
  //   <Chip style={{ backgroundColor: "#3a86c7" }} label="O: Order" />
  //   <Chip style={{ backgroundColor: "#674da9" }} label="F: Family" />
  //   <Chip style={{ backgroundColor: "#a74c7a" }} label="G: Genus" />
  //   <Chip style={{ backgroundColor: "#b877af" }} label="S: Species" />
};

export default BrowseTags;
