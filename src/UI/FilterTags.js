import Chip from "@material-ui/core/Chip";

const FilterTags = (props) => {
  return (
    <div>
      Filtered by:
      {Object.keys(props.filters).map((key) =>
        props.filters[key] ? (
          <Chip label={`${key}: ${props.filters[key]}`} />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default FilterTags;
