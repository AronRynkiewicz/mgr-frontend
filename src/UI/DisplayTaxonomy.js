import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const DisplayTaxonomy = (props) => {
  const rows = props.data;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "LightGray" }}>
          <TableRow>
            <TableCell align="right">
              <b>Taxonomy rank</b>
            </TableCell>
            <TableCell align="right">
              <b>Taxonomy name</b>
            </TableCell>
            <TableCell align="right">
              <b>Taxonomy id</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.taxRank}>
              <TableCell component="th" scope="row">
                <b>{row.taxRank}</b>
              </TableCell>
              <TableCell align="right">{row.taxName}</TableCell>
              <TableCell align="right">
                <i>{row.taxid}</i>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayTaxonomy;
