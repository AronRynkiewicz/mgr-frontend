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
import { useState } from "react";
import BrowseViruses from "./BrowseViruses";
import BrowseHosts from "./BrowseHosts";

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

const Browse = (props) => {
  const theme = useTheme();
  const [tabID, setTabID] = useState(0);

  const handleChange = (event, newValue) => {
    setTabID(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabID(index);
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
          <Tab label={"Viruses"} />

          <Tab label={"Hosts"} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={tabID}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tabID} index={0} dir={theme.direction}>
          <BrowseViruses handleBrowseToSearch={handleBrowseToSearch} />
        </TabPanel>
        <TabPanel value={tabID} index={1} dir={theme.direction}>
          <BrowseHosts handleBrowseToSearch={handleBrowseToSearch} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default Browse;
