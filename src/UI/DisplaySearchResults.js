import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchModal from "./SearchModal";
import FilterModal from "./FilterModal";
import createData from "../Tools/create-data";
import Box from "@material-ui/core/Box";
import FilterTags from "./FilterTags";

const columns = [
  { id: "virus", label: "Virus", minWidth: 170 },
  { id: "host", label: "Host", minWidth: 170 },
  { id: "evidence", label: "Evidence", minWidth: 170 },
  { id: "virusAccession", label: "Virus accession", minWidth: 170 },
  { id: "genomeType", label: "Genome type", minWidth: 170 },
];

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
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({});

  const clearFilters = () => {
    setFilters({});
    setRows(createData(undefined, setOpenModal, setModalData, false));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setFilters({});
    setRows(createData(props.data, setOpenModal, setModalData, true));
  }, [props.data]);

  return (
    <div style={{ marginTop: "5%" }}>
      <SearchModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={modalData}
      />

      <Box
        visibility={Object.keys(filters).length !== 0 ? "visible" : "hidden"}
      >
        <FilterTags filters={filters} clearFilters={clearFilters} />
      </Box>

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

      <div style={{ display: "inline-block" }}>
        <Box visibility={rows.length !== 0 ? "visible" : "hidden"}>
          <FilterModal
            data={props.setModalData}
            setRows={setRows}
            setOpenModalOrg={setOpenModal}
            setModalDataOrg={setModalData}
            setFilters={setFilters}
          />
        </Box>
      </div>
    </div>
  );
};

export default DisplaySearchResults;
