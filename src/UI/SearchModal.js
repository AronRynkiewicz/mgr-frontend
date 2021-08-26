import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import DisplayTaxonomy from "./DisplayTaxonomy";

const useStyles = makeStyles((theme) => ({
  modal: {
    margin: "auto",
    width: "50%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    wordWrap: "break-word",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 25,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  line: {
    color: "gray",
    height: 2,
    borderWidth: 0,
    backgroundColor: "gray",
  },
}));

const SearchModal = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openModal}
        onClose={() => {
          props.setOpenModal(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>
            <IconButton
              style={{
                float: "right",
              }}
              onClick={() => {
                props.setOpenModal(false);
              }}
            >
              <CloseIcon />
            </IconButton>

            <h2 id="transition-modal-title">{props.data.organismName}</h2>
            <hr className={classes.line} />
            <p id="transition-modal-description">
              {props.data.accessionNumber && (
                <p>
                  <b>Accession number: </b> {props.data.accessionNumber}
                </p>
              )}
              {props.data.taxID && (
                <p>
                  <b>Taxonomy ID: </b> {props.data.taxID}
                </p>
              )}
              {props.data.speciesTaxID && (
                <p>
                  <b>Species taxonomy ID: </b> {props.data.speciesTaxID}
                </p>
              )}
              {props.data.sequenceLength && (
                <p>
                  <b>Sequence length: </b> {props.data.sequenceLength}
                </p>
              )}
              {props.data.genomeType && (
                <p>
                  <b>Genome type: </b> {props.data.genomeType}
                </p>
              )}
              {props.data.lineage && (
                <p>
                  <b>Lineage: </b> <DisplayTaxonomy data={props.data.lineage} />
                </p>
              )}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SearchModal;
