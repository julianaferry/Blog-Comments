import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './Container';
import PostDetail from './PostDetail';
import AddPostButton from './AddPostButton';
import PostForm from './PostForm';


class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Container} />
        <Route exact path="/" component={AddPostButton} />
        <Route exact path="/:category" component={AddPostButton} />
        <Switch>
          <Route path="/post/new" component={PostForm} />
          <Route path="/post/edit/:postId" component={PostForm} />
          <Route path="/:category/:postId" component={PostDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;