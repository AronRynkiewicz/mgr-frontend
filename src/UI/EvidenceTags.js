import Chip from "@material-ui/core/Chip";

const EvidenceTags = (props) => {
  if (props.tag_name === "RefSeq") {
    return (
      <Chip
        style={{ backgroundColor: "#6495ED" }}
        label={<b>{props.tag_text ? props.tag_text : "RS"}</b>}
      />
    );
  }

  if (props.tag_name === "Virus-Host DB") {
    return (
      <Chip
        style={{ backgroundColor: "#FF7F50" }}
        label={<b>{props.tag_text ? props.tag_text : "VH"}</b>}
      />
    );
  }

  if (props.tag_name === "UniProt") {
    return (
      <Chip
        style={{ backgroundColor: "#8FBC8F" }}
        label={<b>{props.tag_text ? props.tag_text : "UP"}</b>}
      />
    );
  }

  if (props.tag_name === "NCBIVirus") {
    return (
      <Chip
        style={{ backgroundColor: "#FFD700" }}
        label={<b>{props.tag_text ? props.tag_text : "NV"}</b>}
      />
    );
  }

  if (props.tag_name === "Literature") {
    return (
      <Chip
        style={{ backgroundColor: "#CD853F" }}
        label={<b>{props.tag_text ? props.tag_text : "L"}</b>}
      />
    );
  }
  return null;
};

export default EvidenceTags;
