import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import createData from "../Tools/create-data";

const sortTable = (
  event,
  value,
  setRows,
  setOpenModal,
  setModalData,
  setSortedBy
) => {
  event.preventDefault();
  const sortBy = event.target.elements.sorting_options.value;

  let data = JSON.parse(sessionStorage.getItem("searchResults"));

  switch (sortBy) {
    case "Viruses: A-Z":
      data.sort((a, b) =>
        a.virus.organism_name > b.virus.organism_name
          ? 1
          : b.virus.organism_name > a.virus.organism_name
          ? -1
          : 0
      );
      setSortedBy(sortBy);
      break;
    case "Viruses: Z-A":
      data.sort((a, b) =>
        a.virus.organism_name < b.virus.organism_name
          ? 1
          : b.virus.organism_name < a.virus.organism_name
          ? -1
          : 0
      );
      setSortedBy(sortBy);
      break;
    case "Hosts: A-Z":
      data.sort((a, b) =>
        a.host.organism_name > b.host.organism_name
          ? 1
          : b.host.organism_name > a.host.organism_name
          ? -1
          : 0
      );
      setSortedBy(sortBy);
      break;
    case "Hosts: Z-A":
      data.sort((a, b) =>
        a.host.organism_name < b.host.organism_name
          ? 1
          : b.host.organism_name < a.host.organism_name
          ? -1
          : 0
      );
      setSortedBy(sortBy);
      break;
    default:
      break;
  }

  setRows(createData(data, setOpenModal, setModalData, false));
};

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

const SortModal = (props) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const sortingOptions = [
    "Viruses: A-Z",
    "Viruses: Z-A",
    "Hosts: A-Z",
    "Hosts: Z-A",
  ];

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Sort results
      </Button>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              <IconButton
                style={{
                  float: "right",
                }}
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <CloseIcon />
              </IconButton>

              <h2 id="transition-modal-title">Sort results</h2>
              <hr className={classes.line} />
              <p id="transition-modal-description">
                <form
                  onSubmit={(e, v) => {
                    setOpenModal(false);
                    sortTable(
                      e,
                      v,
                      props.setRows,
                      props.setOpenModalOrg,
                      props.setModalDataOrg,
                      props.setSortedBy
                    );
                  }}
                >
                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      id="sorting_options"
                      options={sortingOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Sort by"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>

                  <Button
                    style={{ width: "100%", marginTop: "5%" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Sort
                  </Button>
                </form>
              </p>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default SortModal;
