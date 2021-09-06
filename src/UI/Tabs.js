import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import style from "./Tabs.module.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import InfoIcon from "@material-ui/icons/Info";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Home from "./Home";
import Blast from "./Blast";
import { useState } from "react";
import Search from "../Tools/Search";
import setHints from "../Tools/set-hints";
import Browse from "./Browse";
import GetAppIcon from "@material-ui/icons/GetApp";

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

export default function FullWidthTabs(props) {
  setHints();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={style.tabs}>
      <AppBar className={style.appbar} position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <HomeIcon fontSize="small" />
                <span>Home</span>
              </div>
            }
          />

          <Tab
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <SearchIcon fontSize="small" />
                <span>Search</span>
              </div>
            }
          />

          <Tab
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <AccountTreeIcon fontSize="small" />
                <span>Browse</span>
              </div>
            }
          />

          <Tab
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <KeyboardArrowRightIcon />
                <span>Blast</span>
              </div>
            }
          />

          <Tab
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <InfoIcon fontSize="small" />
                <span>Info</span>
              </div>
            }
          />

          <Tab
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <GetAppIcon fontSize="small" />
                <span>Download</span>
              </div>
            }
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Home
            handleChange={handleChange}
            handleChangeIndex={handleChangeIndex}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Search />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Browse />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Blast />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          Item 5
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          Download
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
