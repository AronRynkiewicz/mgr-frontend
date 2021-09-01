import Chip from "@material-ui/core/Chip";

const SortingTags = (props) => {
  return (
    <div>
      Sorted by: <Chip label={props.sortedBy} />
      <Chip
        label="Clear sorting"
        onClick={() => {
          props.clearSorting();
        }}
        onDelete={() => {
          props.clearSorting();
        }}
      />
    </div>
  );
};

export default SortingTags;
