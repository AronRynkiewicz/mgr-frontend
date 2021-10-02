import SimpleCard from "./SimpleCard";
import React from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import SearchIcon from "@material-ui/icons/Search";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import InfoIcon from "@material-ui/icons/Info";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Grid from "@material-ui/core/Grid";

const Home = (props) => {
  const changeCard = (index) => {
    props.handleChange(null, index);
    props.handleChangeIndex(index);
  };

  return (
    <div style={{ height: "70vh", overflowY: "auto" }}>
      <div style={{ overflow: "hidden" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SimpleCard title="Database name" body="About database" />
          </Grid>

          <Grid item xs={6}>
            <SimpleCard
              title="Search"
              body="About search tab"
              button={
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={() => {
                    changeCard(1);
                  }}
                >
                  Search{" "}
                </Button>
              }
            />
          </Grid>

          <Grid item xs={6}>
            <SimpleCard
              title="Browse"
              body="About browse tab"
              button={
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AccountTreeIcon />}
                  onClick={() => {
                    changeCard(2);
                  }}
                >
                  Browse{" "}
                </Button>
              }
            />
          </Grid>

          <Grid item xs={6}>
            <SimpleCard
              title="Blast"
              body="About blast tab"
              button={
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<KeyboardArrowRightIcon />}
                  onClick={() => {
                    changeCard(3);
                  }}
                >
                  Blast{" "}
                </Button>
              }
            />
          </Grid>

          <Grid item xs={6}>
            <SimpleCard
              title="Info"
              body="About info tab"
              button={
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<InfoIcon />}
                  onClick={() => {
                    changeCard(4);
                  }}
                >
                  Info{" "}
                </Button>
              }
            />
          </Grid>

          <Grid item xs={6}>
            <SimpleCard
              title="Download"
              body="About download tab"
              button={
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<GetAppIcon />}
                  onClick={() => {
                    changeCard(5);
                  }}
                >
                  Download{" "}
                </Button>
              }
            />
          </Grid>

          <Grid item xs={12}>
            <SimpleCard
              title="Database statistics"
              body="About database statisctics"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
