import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
        margin={5}
      >
        <Grid item>
          <NextWeekCard />
        </Grid>
        <Grid item>
          <TodayCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

const NextWeekCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Next Week
        </Typography>
        <Typography variant="body2" component="p">
          You have set x reqs this week.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Go to this week</Button>
      </CardActions>
    </Card>
  );
};

const TodayCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Today
        </Typography>
        <Typography variant="body2" component="p">
          You've x lessons today and y requisitions.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Go to today.</Button>
      </CardActions>
    </Card>
  );
};
