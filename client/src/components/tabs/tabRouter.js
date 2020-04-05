import React, { memo } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Tabs, Tab, Grid, AppBar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { toLowerCaseAndRemoveSpaces } from "../utils";

function TabsRouter(props) {
  const { variant, onChange, hasData = true, tabs } = props;

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Route>
          {({ location, match }) => {
            const currentLocation = location.pathname;
            // const tabRoute = route =>
            //   route && `${match.url !== "/" ? match.url : ""}${route}`;
            const tabRoute = route => route && `${match.url}${route}`;
            return (
              <div className={classes.root}>
                <AppBar
                  position="static"
                  color="transparent"
                  className={classes.shadowTabs}
                >
                  <Tabs
                    value={currentLocation}
                    indicatorColor="primary"
                    textColor="primary"
                    centered={!variant}
                    onChange={onChange}
                    variant={variant}
                    scrollButtons="on"
                  >
                    {tabs.map(({ label, to }, index) => (
                      <Tab
                        data-cy={`tab-${toLowerCaseAndRemoveSpaces(label)}`}
                        to={tabRoute(to)}
                        value={tabRoute(to)}
                        key={label}
                        label={label}
                        component={Link}
                        className={`${classes.tabButton} tabButton`}
                        tabIndex={index}
                      />
                    ))}
                  </Tabs>
                </AppBar>
                <Switch>
                  {tabs.map(({ render, to }, i) => (
                    <Route
                      key={i}
                      render={() => (
                        <>
                          {hasData ? (
                            <>{render()}</>
                          ) : (
                            <div className={classes.noData}>
                              <Typography>No data to display</Typography>
                            </div>
                          )}
                        </>
                      )}
                      path={tabRoute(to)}
                    />
                  ))}
                  {(tabs[0] || {}).to && (
                    <Redirect to={tabRoute((tabs[0] || {}).to)} />
                  )}
                  ;
                </Switch>
              </div>
            );
          }}
        </Route>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    flexGrow: 1
  },
  shadowTabs: {
    boxShadow: "none"
  },
  tabButton: {
    "&:focus": {
      outline: "none"
    },
    width: 80
  },
  noData: {
    textAlign: "center",
    height: "300px",
    paddingTop: "20px"
  }
}));
export default withRouter(memo(TabsRouter));
