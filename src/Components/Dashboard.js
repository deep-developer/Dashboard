import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Stack, Typography } from "@mui/material"

const Dashboard = ({userName}) => {
  const [metrixData, setMetrixData] = useState([]);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const metrixDataToJson = await response.json();
      console.log( "hey matrix", metrixDataToJson);
      setMetrixData(metrixDataToJson);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <>
      <Navbar userName={userName} />
      <Container>
        <Stack direction="row" sx={{ py: 4 }} justifyContent="center" alignItems="center" >
            <Typography variant="h2" component="h2">
               Health Metrics 
            </Typography>;
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Sl.no</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metrixData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell style={{ borderWidth: 1 }} align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
