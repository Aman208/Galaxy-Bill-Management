import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import axios from "axios";
import moment from "moment"


import { useNavigate } from 'react-router-dom';




function createData(name, area, district, customerType) {
    return { name, area, district, customerType };
}

export default function CustomerTable({ customerList }) {


    let columns = [];
    columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'area', label: 'Area', minWidth: 170 },
        { id: 'district', label: 'District', minWidth: 170 },
        { id: 'customerType', label: 'Customer Type', minWidth: 170 }
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

    const formatDateForDateInput = (dateOfJoining) => {
        // console.log("dateOfJoining",dateOfJoining);
        dateOfJoining = moment(new Date(dateOfJoining.slice(0, -1))).format('YYYY-MM-DD');
        // console.log("dateOfJoining",dateOfJoining);
        return dateOfJoining;
    }

    // const resp = await axios.get(`http://localhost:3001/prescription/invoice/${value}`,

    let rows = customerList.map((customer) => {

        return createData(
            customer.name,
            customer.area,
            customer.district,
            customer.customerType
        )
    })


    React.useEffect(() => {

    }, [])


    return (
        <Paper sx={{ width: '95%', overflow: 'hidden', marginTop: 2, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2) " }}>
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
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
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
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    "& p": {
                        "marginTop": 'auto',
                        "marginBottom": 'auto'
                    }
                }}
            />
        </Paper>
    );
}