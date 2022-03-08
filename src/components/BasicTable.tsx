import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { getDailyCovid } from 'api/currency';
import { useEffect, useState } from 'react';
import { DailyDateType } from 'types';
import TablePaginationActions from './TablePaginationActions';

type tableProps = {
  country: string;
};

const BasicTable = ({ country }: tableProps) => {
  const [dailyData, setDailyData] = useState<DailyDateType[]>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    const getDailyData = async () => {
      const datas = await getDailyCovid(country);
      setDailyData(datas);
    };
    getDailyData();
  }, [country]);
  const emptyRows =
    dailyData && page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - dailyData.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tarih</TableCell>
            <TableCell align="right">Vaka</TableCell>
            <TableCell align="right">İyileşen</TableCell>
            <TableCell align="right">Ölü</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dailyData &&
            (rowsPerPage > 0
              ? dailyData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dailyData
            ).map((data) => {
              let currentDate = new Date(data.Date);
              return (
                <TableRow
                  key={data.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {currentDate.toISOString().slice(0, 10)}
                  </TableCell>
                  <TableCell align="right">{data.Confirmed}</TableCell>
                  <TableCell align="right">{data.Recovered}</TableCell>
                  <TableCell align="right">{data.Deaths}</TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={dailyData ? dailyData.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
