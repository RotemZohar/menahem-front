import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Typography,
} from "@mui/material";

const PetCarers = (props: { carers: any[] }) => {
    const { carers } = props;
    return (
        //   const [page, setPage] = React.useState(0);
        //   const [rowsPerPage, setRowsPerPage] = React.useState(5);

        //   const handleChangePage = (event: unknown, newPage: number) => {
        //     setPage(newPage);
        //   };

        //   const handleChangeRowsPerPage = (
        //     event: React.ChangeEvent<HTMLInputElement>
        //   ) => {
        //     setRowsPerPage(+event.target.value);
        //     setPage(0);
        //   };

        //   const dateFormat = (date: string) => {
        //     const match = date.match(
        //       /(\d{4})-(\d{2})-(\d{2})[\sT](\d{2}):(\d{2}):(\d{2})(.(\d+))?/
        //     );

        //     if (!match) return "Null";

        //     const [, year, month, day, hours, minutes, seconds, , millseconds] = match;

        //     return `${day}.${month}.${year}`;
        //   };

        //   if (!carers.length) {
        //     return (
        //       <div>
        //         <Typography sx={{ fontSize: "26px" }}>
        //           No tasks have been asigned yet
        //         </Typography>
        //       </div>
        //     );
        //   }

        //   return (
        //     <Paper sx={{ width: "100%" }}>
        //       <TableContainer>
        //         <Table sx={{ minWidth: 650 }} aria-label="simple table">
        //           <TableHead>
        //             <TableRow>
        //               <TableCell align="center">Treatments</TableCell>
        //               <TableCell align="center">Date</TableCell>
        //             </TableRow>
        //           </TableHead>
        //           <TableBody>
        //             {carers
        //               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        //               .map((row) => (
        //                 <TableRow
        //                   key={row.id}
        //                   sx={{
        //                     "&:last-child td, &:last-child th": {
        //                       border: 0,
        //                     },
        //                   }}
        //                 >
        //                   <TableCell align="center" component="th" scope="row">
        //                     {row.treatment}
        //                   </TableCell>
        //                   <TableCell align="center">{dateFormat(row.date)}</TableCell>
        //                 </TableRow>
        //               ))}
        //           </TableBody>
        //         </Table>
        //       </TableContainer>
        //       <TablePagination
        //         rowsPerPageOptions={[5, 10]}
        //         component="div"
        //         count={carers.length}
        //         rowsPerPage={rowsPerPage}
        //         page={page}
        //         onPageChange={handleChangePage}
        //         onRowsPerPageChange={handleChangeRowsPerPage}
        //       />
        //     </Paper>
        <div>Not implemented yet</div>
    );
};
export default PetCarers;
