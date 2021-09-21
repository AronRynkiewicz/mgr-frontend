import SimpleCard from "./SimpleCard";
import React from "react";

const Home = (props) => {
  const changeCard = (index) => {
    props.handleChange(null, index);
    props.handleChangeIndex(index);
  };

  return (
    <>
      <SimpleCard
        content={
          <div>
            <button
              onClick={() => {
                changeCard(1);
              }}
            >
              Search
            </button>
            <button
              onClick={() => {
                changeCard(2);
              }}
            >
              Browse
            </button>
            <button
              onClick={() => {
                changeCard(3);
              }}
            >
              Blast
            </button>
            <button
              onClick={() => {
                changeCard(4);
              }}
            >
              Info
            </button>
            <button
              onClick={() => {
                changeCard(5);
              }}
            >
              Download
            </button>
          </div>
        }
      />
    </>
  );
};

export default Home;
