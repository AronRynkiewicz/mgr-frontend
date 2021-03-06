import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import style from "./Blast.module.css";
import RunBlast from "../Tools/RunBlast";
import DisplayBlastResults from "./BlastResults";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Blast = (props) => {
  const theme = useTheme();
  const [tabID, setTabID] = useState(
    sessionStorage.getItem("blastResults") ? 1 : 0
  );

  const [disabled, setDisabled] = useState(
    sessionStorage.getItem("blastResults") ? false : true
  );
  const [results, setResults] = useState();

  const handleResults = (data) => {
    setResults(data);
  };

  const handleChange = (event, newValue) => {
    setTabID(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabID(index);
  };

  const handleDisableChange = (value) => {
    setDisabled(value);
  };

  const handleBrowseToSearch = (query) => {
    props.handleChangeIndex(1);
    props.setSearchQuery(query);
  };

  return (
    <div className={style.tabs}>
      <AppBar className={style.appbar} position="static" color="default">
        <Tabs
          value={tabID}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label={"Run"} />

          <Tab label={"Results"} disabled={disabled} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={tabID}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tabID} index={0} dir={theme.direction}>
          <RunBlast
            changeDisable={handleDisableChange}
            handleChange={handleChange}
            handleChangeIndex={handleChangeIndex}
            handleResults={handleResults}
          />
        </TabPanel>
        <TabPanel value={tabID} index={1} dir={theme.direction}>
          <DisplayBlastResults
            results={results}
            handleBrowseToSearch={handleBrowseToSearch}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default Blast;
