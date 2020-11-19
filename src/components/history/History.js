import React, { Component } from "react";
import { Link, useNavigate } from "@reach/router";

import { Card, CardContent, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import "./History.css"

class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading : false,
            hiscores: []
        };
    }

    componentDidMount(){
        this.getHiscores();
    }
    hiscores;
    getHiscores = async (event) => {
        this.setState({ isLoading : true });
        /* await fetch('http://localhost:3000/api/hiscores/',  */
        await fetch('https://w7iikpk6g3.execute-api.us-east-1.amazonaws.com/prod/hiscores', 
        { 
            method: "GET", 
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {    
            return res.json();     
            this.setState({ isLoading : false });
        })
        .then((data) => {
            console.log(data);
            this.setState({ hiscores: data.body })
            this.hiscores = data.body;
        })
        .catch(console.log);
        console.dir(this.state.hiscores);
        this.setState({ isLoading : false });
    }

    removeItemFromArray = (array, key, value) =>{
        const index = array.findIndex(obj => obj[key] === value);
        return index >= 0 ? [
            ...array.slice(0, index),
            ...array.slice(index + 1)
        ] : array;
    }
    deleteHiscore = async (hiscoreId) => {
        this.setState({ isLoading : true });
        /* await fetch('http://localhost:3000/api/hiscores/' + hiscoreId,  */
        await fetch('https://w7iikpk6g3.execute-api.us-east-1.amazonaws.com/prod/hiscores', 
        { 
            method: "DELETE", 
            body: JSON.stringify({
                "verbo": "deleteComparison",
                "comparisonId": hiscoreId
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {    
            return res.json();     
            this.setState({ isLoading : false });
        })
        .then((data) => {
            console.log(data);
            //ELIMINAR Hiscore del arreglo hiscores
            this.hiscores = this.removeItemFromArray(this.hiscores, "_id", hiscoreId);            
            this.setState({ hiscores: this.hiscores });
        })
        .catch(console.log);
        console.dir(this.state.hiscores);
        this.setState({ isLoading : false });
    }

    render(){
        return (
            <Grid container component="main" justify="center" className="image">
                {/* Results comparison */}                            
                <Grid container justify="center">                   
                    <Grid item container justify="center">
                        <Grid item container justify="center" xs={12}>
                            <Grid item xs={12}>
                                { this.state.isLoading? <LinearProgress color="primary"/>: null }
                                <Card>
                                    <CardContent>
                                        <TableContainer>
                                            <Table className="table" aria-label="customized table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell align="left">USERNAME 1</TableCell>
                                                    <TableCell align="left">RANK</TableCell>
                                                    <TableCell align="left">TOTAL LEVEL</TableCell>
                                                    <TableCell align="left">TOTAL EXP</TableCell>
                                                    <TableCell align="left">USERNAME 2</TableCell>
                                                    <TableCell align="left">RANK</TableCell>
                                                    <TableCell align="left">TOTAL LEVEL</TableCell>
                                                    <TableCell align="left">TOTAL EXP</TableCell>
                                                    <TableCell align="left">RANK DIFFERENCE</TableCell>
                                                    <TableCell align="left">TOTAL LEVEL DIFFERENCE</TableCell>
                                                    <TableCell align="left">TOTAL XP DIFFERENCE</TableCell>
                                                    <TableCell align="left">OPTIONS</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {this.state.hiscores?.map((row) => (
                                                    <TableRow key={row._id}>
                                                    <TableCell component="th" scope="row">{row._id}</TableCell>
                                                    <TableCell align="center">{row.username1}</TableCell>
                                                    <TableCell align="center">{row.rank}</TableCell>
                                                    <TableCell align="center">{row.totalLevel}</TableCell>
                                                    <TableCell align="center">{row.totalXp}</TableCell>
                                                    <TableCell align="center">{row.username2}</TableCell>
                                                    <TableCell align="center">{row.rank2}</TableCell>
                                                    <TableCell align="center">{row.totalLevel2}</TableCell>
                                                    <TableCell align="center">{row.totalXp2}</TableCell>
                                                    <TableCell align="center">{row.rankDifference}</TableCell>
                                                    <TableCell align="center">{row.totalLevelDifference}</TableCell>
                                                    <TableCell align="center">{row.totalXpDifference}</TableCell>
                                                    <TableCell align="center"><Button variant="contained" className="btn-danger" onClick={(event) => { this.deleteHiscore(row._id) }}>DELETE</Button></TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="textCenter">                        
                    <Button className="button" component={Link} to="/perfil" style={{color: 'white'}}>Go back</Button>
                </Grid> 
            </Grid>
        );
    }
}
export default History;