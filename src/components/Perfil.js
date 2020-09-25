import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth} from "../firebase";
import hiscores, { getSkillPage } from 'osrs-json-hiscores';
import { Card, CardContent, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Background from '../images/osrs.jpg';
import buttonBackground from '../images/button.gif';
import bg from '../images/osrslogo.png';
import scroll from '../images/scroll.gif';
//https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=X

const Perfil = (props) =>{
    const [apiResponse, setApiResponse] = useState({});
    const [main, setMain] = useState({});
    const [skills, setSkills] = useState({});
    const [overall, setOverall] = useState({});
    const [apiResponse2, setApiResponse2] = useState({});
    const [main2, setMain2] = useState({});
    const [skills2, setSkills2] = useState({});
    const [overall2, setOverall2] = useState({});
    const [players, setPlayers] = useState([]);
    //const user = useContext(UserContext);
    //const { firstName, lastName, email} = user;
    const callAPI = async (event) => {
        const player = document.getElementById("searchBar").value;
        console.log("jugador:", player);
        if (players.length < 2){
            players.push(player);
        }
        console.log(players);
        const stats = await hiscores.getStats(player);
        console.log(main);
        if (Object.keys(main).length == 0){
            setApiResponse(stats);
            setMain(stats.main);
            setSkills(stats.main.skills);
            setOverall(stats.main.skills.overall);
        } else {
            setApiResponse2(stats);
            setMain2(stats.main);
            setSkills2(stats.main.skills);
            setOverall2(stats.main.skills.overall);
        }
        //const topPage = await getSkillPage('overall');
        console.log(stats);
        document.getElementById("searchBar").value = "";
    }

    /* useEffect(() => {
        callAPI();
      }, []); */
    
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
          },
        image: {
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor:
              theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: "white",
          backgroundImage: `url(${scroll})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: "0.7",
          fontWeight: "bold"
        },
        button: {
            background: `url(${buttonBackground}) no-repeat center`,
            color: "white",
            display: "inline-block",
            fontWeight: "bold",
            height: "56px",
            padding: "11px",
            textAlign: "center",
            verticalAlign: "top",
            width: "130px",
            cursor: "pointer",
            marginLeft: "5px",
            marginRight: "5px"
        },
        bg: {
            height: "150px",
            textAlign: "center"
        },
        textCenter: {
            textAlign: "center"
        },
        searchBar: {
            backgroundColor: "black",
            color: "white",
            height: "50px",
            alignItems: "center"
        }
      }));
    
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container component="main"  margin="auto" justify="center"   spacing={3} className={classes.image}>                    
                    <Grid item xs={12} >
                        <div className={classes.bg}>
                            <img src={bg} alt=""/>
                        </div>   
                    </Grid>
                    <Grid item xs={12} className={classes.textCenter} >
                        <input type="text" id="searchBar" name="searchBar" className={classes.searchBar} placeholder="Search..." />
                        <button className={classes.button} onClick={(event) => {callAPI(event)}}>Get hiscores</button>                        
                    </Grid>
                    <Grid container justify="center" >
                    <Grid item xs={4}>
                        
                    <Paper className={classes.paper}>   
                        <Card>
                            <CardContent>
                                <Typography variant="h3"  gutterBottom>
                                    Player: {apiResponse.name}
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    Rank: {overall.rank}
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    Total Level: {overall.level}
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    Total XP: {overall.xp}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h3" gutterBottom>
                                        Player: {apiResponse2.name}
                                    </Typography>
                                    <Typography variant="h5" component="h5">
                                        Rank: {overall2.rank}
                                    </Typography>
                                    <Typography variant="h5" component="h5">
                                        Total Level: {overall2.level}
                                    </Typography>
                                    <Typography variant="h5" component="h5">
                                        Total XP: {overall2.xp}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid> 
                    </Grid>                   
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>                   
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Rank Difference: {Math.abs(overall.rank - overall2.rank)}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Total Level Difference: {Math.abs(overall.level -overall2.level)}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Total XP Difference: {Math.abs(overall.xp -overall2.xp)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>     
                    <Grid item xs={12} className={classes.textCenter}>                        
                        <button className={classes.button} onClick={(event) => {callAPI(event)}}>Save Results</button>   
                        <button className={classes.button} onClick={(event) => {callAPI(event)}}>New Comparison</button>   
                    </Grid>     
                </Grid>
        </div>
        
    ) 
};
export default Perfil;