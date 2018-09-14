import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import VoteScore from './VoteScore';
import  Edit from '@material-ui/icons/Edit';
import DeleteForever  from '@material-ui/icons/DeleteForever';
import { getPost, deletePost, votePost } from '../Actions/PostAction';
import {fetchComments,
  voteComment,
  deleteComment
} from '../Actions/CommentAction';
import CommentList from './CommentList';
import { sortBy } from '../Utils/Sort';
import CommentForm from './CommentForm';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import renderIf from 'render-if';
import styled from 'styled-components';
import '../Styles/index.css';



const CardDetailStyle = styled.div `
  display: flex;
  alignItems: center;
  padding-left: 15px;
  padding-right: 15px;
  background-color:#58F7F2;
`;


class PostDetail extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    getPost: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
  };

  state = {
    editComment: null,
    deleted: false
  };

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getPost(postId);
    this.props.fetchComments(postId);
  }

  handleDelete = (post) => {
    this.props.deletePost(post);
    this.setState({ deleted: true });
  };

  handlePostVote = (post, option) => this.props.votePost(post.id, option);

  handleCommentVote = (comment, option) =>
    this.props.voteComment(comment.id, option);

  handleCommentDelete = (comment) => this.props.deleteComment(comment);

  handleEditButton = (comment) => this.setState({ editComment: comment });

  handleFinishEdit = () => this.setState({ editComment: null });

  render() {
    const { post, comments } = this.props;
    const { editComment, deleted } = this.state;
    const renderIfPostPresent = renderIf(!!post);
    const renderIfPostNotPresent = renderIf(!post);

    if (deleted) {
      return <Redirect to={'/'} />;
    }

    return (
      <div>
        {renderIfPostNotPresent(<div className="error">Post not found!</div>)}
          {renderIfPostPresent (
            <div className="showPost">
              {post && (
                <div>
                  <Card className="card-post">
                    <CardDetailStyle>
                    <VoteScore item={post} handleVote={this.handlePostVote} />
                    <CardHeader
                      title={post.title}
                      subheader={`Sent ${moment(post.timestamp).format(
                        'Do MMMM YYYY, h:mm a'
                      )} by ${post.author}`}
                    />
                    <div style = {{flex: '1 1 auto' }}
                    />
                  <div>
                    <Link
                      to={`/post/edit/${post.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <Edit />
                    </Link>
                    <DeleteForever onClick={() => this.handleDelete(post)} />
                  </div>
                
                </CardDetailStyle>
                <CardContent>
                  <Typography paragraph>{post.body}</Typography>
                </CardContent>
              </Card>
            </div>
          )}
          {post &&
            comments && (
              <div>
                <Card className='card-style'>
                  <CommentForm post={post} />
                </Card>
                <Card className='card-style'>
                  <CardHeader title={`${post.commentCount} comments`} />
                  <CommentList
                    items={comments}
                    handleVote={this.handleCommentVote}
                    handleDelete={this.handleCommentDelete}
                    handleEditButton={this.handleEditButton}
                    editComment={editComment}
                    handleFinishEdit={this.handleFinishEdit}
                  />
                </Card>
            })
              </div>
            )}
              </div>
          )}   
        </div>
      );
    }
  }

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: posts.filter(post => post.id === match.params.postId)[0],
    comments: sortBy(comments[match.params.postId])
  };
}

export default connect(mapStateToProps, {
  getPost,
  fetchComments,
  deletePost,
  votePost,
  voteComment,
  deleteComment
})(PostDetail);