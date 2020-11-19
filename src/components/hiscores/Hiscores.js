import React, { useContext, useState, useEffect, Component } from "react";
import { Link } from "@reach/router";
import Button from '@material-ui/core/Button';
import { UserContext } from "../../providers/UserProvider";
import {auth} from "../../firebase";
import hiscores, { getSkillPage } from 'osrs-json-hiscores';
import { Card, CardContent, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Background from '../../images/osrs.jpg';
import buttonBackground from '../../images/button.gif';
import bg from '../../images/osrslogo.png';
import scroll from '../../images/scroll.gif';
import "./Hiscores.css"
//https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=X

class Hiscores extends Component{
    constructor(props){
        super(props);
        this.state = { 
            apiResponse : "",
            main : {},
            skills : {},
            overall : {},
            main2 : {},
            skills2 : {},
            overall2 : {},
            players : [],
            isLoading: false
        };
    }

    componentDidMount(){
        this.callAPI();
    }
    players = [];
    callAPI = async (event) => {
        let player = document.getElementById("searchBar").value;
        console.log("jugador:", player);
        if (this.state.players.length < 2){
            this.players.push(player);
            this.setState({ players: this.players })
        }
        console.log(this.state.players);
        this.setState({ isLoading : true });
        let stats = await hiscores.getStats(player).then((response) => {
            this.setState({ isLoading : false });
            console.log(this.state.main);
            if (Object.keys(this.state.main).length == 0){
                this.setState({ 
                    apiResponse: response,
                    main: response.main,
                    skills: response.main.skills,
                    overall: response.main.skills.overall
                });
                /* setApiResponse(response);
                setMain(response.main);
                setSkills(response.main.skills);
                setOverall(response.main.skills.overall); */
            } else {
                this.setState({ 
                    apiResponse2: response,
                    main2: response.main,
                    skills2: response.main.skills,
                    overall2: response.main.skills.overall
                });
                /* setApiResponse2(response);
                setMain2(response.main);
                setSkills2(response.main.skills);
                setOverall2(response.main.skills.overall); */
            }
        }).catch((error) =>{
            console.log(error);
            this.players.pop();
            this.setState({ players: this.players, isLoading : false });
        });
        //const topPage = await getSkillPage('overall');
        console.log(stats);
        document.getElementById("searchBar").value = "";
    }

    saveComparison = () => {
        this.setState({ isLoading: true });
        if (this.state.players.length < 2){
            alert("You must compare 2 users.")
        } else {
            let body = {
                "verbo": "createComparison",
                comparison: {
                    "username1": this.state.players[0],
                    "rank": this.state.overall.rank,
                    "totalLevel": this.state.overall.level,
                    "totalXp": this.state.overall.xp,
                    "username2": this.state.players[1], 
                    "rank2": this.state.overall2.rank,
                    "totalLevel2": this.state.overall2.level,
                    "totalXp2": this.state.overall2.xp,
                    "rankDifference": Math.abs(this.state.overall.rank - this.state.overall2.rank),
                    "totalLevelDifference": Math.abs(this.state.overall.level - this.state.overall2.level),
                    "totalXpDifference": Math.abs(this.state.overall.xp - this.state.overall2.xp),
                    "createdBy": localStorage.getItem("email") 
                }
            };
            console.log("parametros", body);
            /* fetch('http://localhost:3000/api/hiscores/',  */
            fetch('https://w7iikpk6g3.execute-api.us-east-1.amazonaws.com/prod/hiscores', 
            { 
                method: "POST", 
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then((data) => {
                this.setState({ isLoading: false });
                alert("Comparison saved successfully!");
                console.log(data);
                this.setState({ history: data })
            })
            .catch((err) => {                
                alert("Something wrong happened, try again later!");
            });
        }
    };

    newComparison = () => {
        this.setState({ 
            players : [], 
            apiResponse : "", 
            apiResponse2 : "",
            main : {},
            skills : {},
            overall : {},
            main2 : {},
            skills2 : {},
            overall2 : {}
        });
    }

    /* navigate = useNavigate();
    navigateTo = (route) => {
        this.navigate(route, { replace: true });
    }; */

    render(){
        return (
            <div className="root">
                <Grid container component="main"  margin="auto" justify="center"className="image">    
                        {/* Header */}                
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="textCenter">
                            <div className="bg textCenter">
                                <img src={bg} alt=""/>
                            </div>   
                        </Grid>
                        {/* Hiscore bar */}
                        <Grid item  className="textCenter" xs={12} sm={12} md={12} lg={12} xl={12} className="textCenter" >
                            <input type="text" id="searchBar" name="searchBar" className="searchBar" placeholder="Search..." />
                            <button className="button" onClick={(event) => {this.callAPI(event)}}>Get hiscores</button>                        
                        </Grid>
                        {/* Hiscore results container */}
                        <Grid container justify="center">
                            <Grid item xs={12} >
                                <div className="searchResultTop"></div>
                            </Grid>
                            <Grid item container  justify="center" className="searchResult" xs={12} >
                                <Grid item container justify="center" xs={6}>
                                    { this.state.isLoading?
                                        <Grid item xs={8} >
                                            <LinearProgress color="primary"/>
                                        </Grid>
                                         : 
                                         <Grid item xs={6} style={{paddingLeft: '100px'}} >
                                            { this.state.apiResponse && <Grid item xs={12}>
                                                <Typography variant="h5"  gutterBottom>
                                                    Player: {this.state.apiResponse.name}
                                                </Typography>
                                                <Typography variant="h5" component="h5">
                                                    Rank: {this.state.overall.rank}
                                                </Typography>
                                                <Typography variant="h5" component="h5">
                                                    Total Level: {this.state.overall.level}
                                                </Typography>
                                                <Typography variant="h5" component="h5">
                                                    Total XP: {this.state.overall.xp}
                                                </Typography>
                                            </Grid>}
                                        </Grid> }
                                    <Grid item xs={6}>
                                        { (!this.state.isLoading && this.state.apiResponse2)? <div>
                                            <Typography variant="h5" gutterBottom>
                                            Player: {this.state.apiResponse2?.name}
                                        </Typography>
                                        <Typography variant="h5" component="h5">
                                            Rank: {this.state.overall2.rank}
                                        </Typography>
                                        <Typography variant="h5" component="h5">
                                            Total Level: {this.state.overall2.level}
                                        </Typography>
                                        <Typography variant="h5" component="h5">
                                            Total XP: {this.state.overall2.xp}
                                        </Typography>
                                        </div>
                                        : null
                                      }                              
                                    </Grid>
                                </Grid>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <div className="searchResultBottom"></div>
                            </Grid>
                        </Grid>                   
                        {/* Results comparison */}                            
                        <Grid container justify="center">
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <div className="searchResultTop"></div>
                                </Grid>                            
                                <Grid item container justify="center" className="searchResult" >
                                    <Grid item container justify="center" xs={6}>
                                    { this.state.isLoading?
                                        <Grid item xs={8} >
                                            <LinearProgress color="primary"style={{paddingLeft: '50px', paddingRight: '50px'}}/>
                                        </Grid>
                                         : 
                                         <Grid item container justify="center" style={{textAlign: 'center'}} xs={12} >
                                            { this.state.apiResponse && <Grid item xs={12}>
                                                
                                            <Typography variant="h5" component="h2">
                                                Rank Difference: {Math.abs(this.state.overall.rank - this.state.overall2.rank)}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Total Level Difference: {Math.abs(this.state.overall.level - this.state.overall2.level)}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Total XP Difference: {Math.abs(this.state.overall.xp - this.state.overall2.xp)}
                                            </Typography>
                                            </Grid>}
                                        </Grid> }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <div className="searchResultBottom"></div>
                                </Grid>
                        </Grid>
                        <Grid item xs={12} className="textCenter">                        
                            <Button className="button" onClick={(event) => { this.saveComparison()}} style={{color: 'white', fontSize: '11px'}}>Save Results</Button>   
                            <Button className="button" onClick={(event) => { this.newComparison() }} style={{color: 'white', fontSize: '11px'}}>New Comparison</Button> 
                            <Button className="button" component={Link} to="/history" style={{color: 'white', fontSize: '11px'}}>Comparison History</Button>
                        </Grid>     
                </Grid>
            </div>            
        ) 
    }
}

export default Hiscores;

