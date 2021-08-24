import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { VariableSizeList } from "react-window";
// import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DisplaySearchResults from "../UI/DisplaySearchResults";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 10 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

// const renderGroup = (params) => [
//   <ListSubheader key={params.key} component="div">
//     {params.group}
//   </ListSubheader>,
//   params.children,
// ];

const Search = (props) => {
  const [requestResult, setRequestResult] = useState();
  const [selectedValue, setSelectedOptions] = useState();
  const [displayLoaingBar, setDisplayLoaingBar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const hints = JSON.parse(sessionStorage.getItem("hints"));
  const classes = useStyles();

  const handleChange = (event, value) => setSelectedOptions(value);

  const sendRequest = () => {
    setRequestResult();
    setDisplayLoaingBar(true);

    const query = selectedValue ? selectedValue : inputValue;
    setSelectedOptions();
    setInputValue("");

    axios
      .post("api/interaction/", {
        query: query,
      })
      .then((resp) => {
        setRequestResult(JSON.parse(resp.request.response));
      });
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        id="virtualize-demo"
        disableListWrap
        inputValue={inputValue}
        classes={classes}
        onChange={handleChange}
        onInputChange={(event, value) => {
          handleInputChange(event, value);
        }}
        ListboxComponent={ListboxComponent}
        // renderGroup={renderGroup}
        options={[...hints]}
        // groupBy={(option) => option[0].toUpperCase()}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Name or taxID or taxonomy of virus or host"
          />
        )}
        // renderOption={(option) => <Typography noWrap>{option}</Typography>}
        // open={inputValue ? inputValue.length > 1 : false}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={sendRequest}
        disabled={selectedValue || inputValue ? false : true}
        style={{ marginTop: "1%", float: "right" }}
      >
        Search
      </Button>
      <DisplaySearchResults data={requestResult} display={displayLoaingBar} />
    </div>
  );
};

export default Search;
