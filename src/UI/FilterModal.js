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
import filterTable from "../Tools/filter-table";

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

const FilterModal = (props) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [evidencesFilters, setEvidencesFilters] = useState([]);

  let data = props.data
    ? props.data
    : JSON.parse(sessionStorage.getItem("searchResults"));

  data = data ? data : [];

  const viruses_names = new Set(
    data.map((interaction) => interaction.virus.organism_name)
  );

  const viruses_taxids = new Set(
    data.map((interaction) => String(interaction.virus.tax_id))
  );

  const hosts_names = new Set(
    data.map((interaction) => interaction.host.organism_name)
  );

  const hosts_taxids = new Set(
    data.map((interaction) => String(interaction.host.tax_id))
  );

  const evidences = new Set(
    data
      .map((interaction) =>
        interaction.evidence.map((evidence) => {
          return String(evidence.name);
        })
      )
      .flat(Infinity)
  );

  evidences.add("Literature");

  const genome_types = new Set(
    data.map((interaction) => interaction.virus.genome_type.genome_type)
  );

  const genome_DBs = new Set(
    data.map((interaction) => interaction.virus.genome_db.genome_db)
  );

  const assembly_levels = new Set(
    data.map((interaction) => interaction.virus.assembly_level.assembly_level)
  );

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Filter results
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

              <h2 id="transition-modal-title">Filter results</h2>
              <hr className={classes.line} />
              <p id="transition-modal-description">
                <form
                  onSubmit={(e, v) => {
                    setOpenModal(false);
                    filterTable(
                      e,
                      v,
                      props.setRows,
                      props.setOpenModalOrg,
                      props.setModalDataOrg,
                      props.setFilters,
                      evidencesFilters,
                      setEvidencesFilters
                    );
                  }}
                >
                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      id="viruses_names"
                      options={[...viruses_names]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Virus name"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>

                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      id="viruses_taxids"
                      options={[...viruses_taxids]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Virus taxid"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>

                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      id="hosts_names"
                      options={[...hosts_names]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Host name"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>

                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      id="hosts_taxids"
                      options={[...hosts_taxids]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Host taxid"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>

                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      multiple
                      id="evidences"
                      onChange={(event, value) => setEvidencesFilters(value)}
                      options={[...evidences]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Evidence"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>

                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      id="genome_types"
                      options={[...genome_types]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Virus genome type"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>

                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      id="genome_DBs"
                      options={[...genome_DBs]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Genome database"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>

                  <div style={{ marginTop: "5%" }}>
                    <Autocomplete
                      id="assembly_levels"
                      options={[...assembly_levels]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Genome assembly level"
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
                    Filter
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

export default FilterModal;
