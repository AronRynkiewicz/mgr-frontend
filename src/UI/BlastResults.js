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
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const columns = [
  { id: "query", label: "Query", minWidth: 170 },
  { id: "subject", label: "Subject", minWidth: 170 },
  { id: "identity", label: "Identity (%)", minWidth: 170 },
  { id: "alignment length", label: "Alignment length", minWidth: 170 },
  { id: "mismatches", label: "Mismatches", minWidth: 170 },
  { id: "gap opens", label: "Gap opens", minWidth: 170 },
  { id: "q. start", label: "Q. start", minWidth: 170 },
  { id: "q. end", label: "Q. end", minWidth: 170 },
  { id: "s. start", label: "S. start", minWidth: 170 },
  { id: "s. end", label: "E. End", minWidth: 170 },
  { id: "evalue", label: "Evalue", minWidth: 170 },
  { id: "bit score", label: "Bit score", minWidth: 170 },
];

function createData(data, props) {
  if (data) {
    const tmpArray = [];
    const parsedData = JSON.parse(data);
    for (const key in parsedData) {
      for (const element of parsedData[key]) {
        const subject = element["subject"];

        delete element["subject"];
        tmpArray.push({
          query: key,
          subject: (
            <div>
              {subject}
              <IconButton
                color="primary"
                onClick={() => {
                  props.handleBrowseToSearch(subject);
                }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </div>
          ),
          ...element,
        });
      }
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

const DisplayBlastResults = (props) => {
  let data = props.results;

  data = data
    ? props.results
    : JSON.parse(sessionStorage.getItem("blastResults"));

  let loadingBar = true;
  if (data) {
    loadingBar = false;
    sessionStorage.setItem("blastResults", JSON.stringify(data));
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = createData(data, props);

  return (
    <>
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
    </>
  );
};

export default DisplayBlastResults;
