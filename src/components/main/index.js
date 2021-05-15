import { Box } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../../pages/homepage";
import AboutPage from "../../pages/about";
import TopPage from "../../pages/popular";
import NotFoundPage from "../../pages/not-found";
import PostPage from "../../pages/post-page";
import SearchResult from "../../pages/search-result";

export default function Main() {

    return (
        <Box component="main">
            <Switch>
                <Route path='/' exact component={Homepage} />
                <Route path='/popular' exact component={TopPage} />
                <Route path='/about' exact component={AboutPage} />
                <Route path="/post/:id" render={props => (<PostPage {...props} />)} />
                <Route path="/search/:searchRequest" render={props => (<SearchResult {...props} />)} />
                <Route path='*' exact component={NotFoundPage} />
            </Switch>
        </Box>
    )
}