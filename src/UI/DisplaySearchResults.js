import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import SearchModal from "./SearchModal";

const columns = [
  { id: "virus", label: "Virus", minWidth: 170 },
  { id: "host", label: "Host", minWidth: 170 },
  { id: "evidence", label: "Evidence", minWidth: 170 },
  { id: "pmid", label: "PubMed ID", minWidth: 170 },
];

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const extractLineage = (org) => {
  let lineage = org.lineage;
  let taxonomyArray = [];

  while (lineage) {
    taxonomyArray.push({
      taxRank: capitalizeFirstLetter(lineage.taxonomy_rank.lineage_rank),
      taxName: lineage.taxonomy_name,
      taxid: lineage.tax_id,
    });

    lineage = lineage.parent_node;
  }

  return taxonomyArray;
};

function createData(data, setOpenModal, setModalData) {
  data = data ? data : JSON.parse(sessionStorage.getItem("searchResults"));
  if (data) {
    const tmpArray = [];
    try {
      sessionStorage.setItem("searchResults", JSON.stringify(data));
    } catch (error) {
      sessionStorage.setItem("searchResults", JSON.stringify(""));
    }

    for (const interaction of data) {
      tmpArray.push({
        virus: (
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={() => {
              setOpenModal(true);
              setModalData({
                organismName: interaction.virus.organism_name,
                taxID: interaction.virus.tax_id,
                accessionNumber: interaction.virus.accession_number,
                sequenceLength: interaction.virus.sequence_length,
                genomeType: interaction.virus.genome_type,
                lineage: extractLineage(interaction.virus),
              });
            }}
          >
            {interaction.virus.organism_name}
          </Button>
        ),

        host: (
          <Button
            variant="contained"
            color="secondary"
            style={{ textTransform: "none" }}
            onClick={() => {
              setOpenModal(true);
              setModalData({
                organismName: interaction.host.organism_name,
                taxID: interaction.host.tax_id,
                speciesTaxID: interaction.host.species_tax_id,
                lineage: extractLineage(interaction.host),
              });
            }}
          >
            {interaction.host.organism_name}
          </Button>
        ),

        evidence: interaction.evidence
          .map((evidence) => {
            return evidence.name;
          })
          .join(", "),

        pmid: interaction.article
          .map((article) => {
            return article.pmid;
          })
          .filter((pmid) => {
            return +pmid !== -1 && pmid !== "";
          })
          .join(", "),
      });
    }
    return tmpArray;
  }
  return [];
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    minHeight: 420,
    maxHeight: "60vh",
  },
});

const DisplaySearchResults = (props) => {
  let loadingBar = props.display;
  if (props.data) {
    loadingBar = false;
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = createData(props.data, setOpenModal, setModalData);

  return (
    <div style={{ marginTop: "5%" }}>
      <SearchModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={modalData}
      />
      <LinearProgress hidden={!loadingBar} />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default DisplaySearchResults;
