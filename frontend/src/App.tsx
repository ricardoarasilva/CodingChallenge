import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TableFooter from '@mui/material/TableFooter';
import axios from 'axios';

interface StudentScore {
	studentId: number,
	student: string,
	score: number
}

function App() {

	const [averageScore, setAverageScore] = useState<number>(0);
	const [rows, setRows] = useState<StudentScore[]>([]);

	useEffect(() => {
		setAverageScore(ArrayAvg(rows.map(a => a.score)));
	},[rows])

	useEffect(() => {
		axios.create({
			baseURL: 'http://localhost:3001/api',
		}).get<StudentScore[]>('get').then((result) => {
			setRows(result.data);
		});
	},[]);

	function updateScore(id: number, score: number) {
		axios.create({
			baseURL: 'http://localhost:3001/api',
		}).patch(`update/${id}`,{score});
	}

	function ArrayAvg(myArray: number[]) {
		if (myArray.length > 0) {
			var i = 0, summ = 0, ArrayLen = myArray.length;
			while (i < ArrayLen) {
				summ = summ + myArray[i++];
			}
			return summ / ArrayLen;
		}
		return 0;
	}

  	return (
    <>
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Coding Challenge
				</Typography>
				</Toolbar>
			</AppBar>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
					<TableRow>
						<TableCell>Student</TableCell>
						<TableCell align="right">Score</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.studentId}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.student}
								</TableCell>
								<TableCell align="right">
									<TextField 	
										variant="standard"
										type='number'
										value={row.score}
										onChange={(e) => {
											row.score = Number(e.target.value);
											setRows([...rows]);
											updateScore(row.studentId, Number(e.target.value));
										}}
									/>
								</TableCell>
							</TableRow>
							
						))}
					</TableBody>
					<TableFooter>
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell>Average Score</TableCell>
							<TableCell align="right">{averageScore}</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
				</TableContainer>
		</Box>
	</>
  );
}

export default App;
