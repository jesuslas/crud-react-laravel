import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from "@material-ui/core/Link";
// import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signIn } from "../../service/api.service";
import { withRouter } from "react-router-dom";
import { userSignIn } from "../../redux/actions/user";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/jesuslas">
        Jalpino
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = props => {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const classes = useStyles();

  const login = async () => {
    setError(undefined);
    try {
      if (!user && !password) return null;
      const resp = await signIn(user, password);
      console.log("resp", resp);
      props.userSignIn(resp.data);
      this.props.history.push(`/dashboad`);
    } catch (error) {
      setError("Usuario no encontrado");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="user"
          label="Usuario"
          name="user"
          autoComplete="user"
          autoFocus
          onChange={({ target: { value } }) => setUser(value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => login()}
        >
          Sign In
        </Button>
        {error && (
          <Typography component="p" variant="p" color={"error"}>
            {error}
          </Typography>
        )}
        {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  userSignIn
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
