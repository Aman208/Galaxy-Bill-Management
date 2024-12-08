import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

function createData(
  paymentDate,
  paymentMethod,
  paymentDescription,
  paymentAmount
) {
  return {

    paymentDate,
    paymentMethod,
    paymentDescription,
    paymentAmount,
  };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "Invalid Date";
  }
  const day = String(date.getDate()).padStart(2, "0"); // Get the day, and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so +1), and pad with leading zero
  const year = date.getFullYear(); // Get the full year

  return `${day}/${month}/${year}`;
}

export default function PaymentTable({ paymentList , totalBillAmount , dueAmount , billNumber }) {
  let columns = [];
  columns = [
    { id: "paymentDate", label: "Payment Date", minWidth: 170 },
    { id: "paymentMethod", label: "Method", minWidth: 170 },
    { id: "paymentDescription", label: "Description", minWidth: 170 },
    { id: "paymentAmount", label: "Amount", minWidth: 170 },
  ];

  const [page, setPage] = React.useState(0);
  // const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = paymentList.map((payment) => {
    return createData(
      payment.paymentDate,
      payment.paymentMethod,
      payment.paymentDescription,
      payment.paymentAmount
    );
  });

  return (
    <Paper
      sx={{
        width: "95%",
        overflow: "hidden",
        marginTop: 2,
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2) ",
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "paymentDate") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {formatDate(value)}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& p": {
            marginTop: "auto",
            marginBottom: "auto",
          },
        }}
      />
    </Paper>
  );
}
