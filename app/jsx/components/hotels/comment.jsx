import moment from 'moment'
import * as constant from  '../../constant';
import StarRatingComponent from 'react-star-rating-component';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    let a = props.comment
    let avatar = {url: ''}
    if (a.image.url == null) {
      avatar = constant.DEFAULT_AVATAR
    }
    else
      avatar = a.image
    a.image = avatar
    this.state = {
      comment: a,
      liked: true,
    }

  }
  likeClick(){
    this.setState({
      liked: !this.state.liked
    })
  }

  goToPost(id){
    window.open(constant.USERS_IMPORT+ id)
  }
  
  renderLike(){
    if (this.state.liked)
      return [(<div><button className="btn btn-primary" onClick={this.likeClick.bind(this)}>ライク</button></div>),<span>誰もライクしていません</span>]
    else 
      return ([<div><button className="btn btn-danger" onClick={this.likeClick.bind(this)}>ライクしない</button></div>,<span> 一人ライクしました</span>])
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="thumbnail">
            <img className="img-responsive user-photo"
                 src={this.state.comment.image.url || this.state.comment.image || constant.DEFAULT_IMAGE }
                 width='100' height='100'
            />
          </div>
        </div>

        <div className="col-md-8">
          <div className="panel panel-default">
            <div className="panel-heading">
              <strong onClick={this.goToPost.bind(this, this.state.comment.user_id)}>{this.state.comment.user_name}</strong> <span
              className="text-muted">{moment(new Date(this.state.comment.updated_at || this.state.comment.created_at)).format('DD/MM/YYYY, h:mm:ss a')}</span>
              <p className="text-center">
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={this.state.comment.rate}
                  editing={false}
                />
              </p>
            </div>
            <div className="panel-body">
              <p className="comment-text">{this.state.comment.comment}</p>
              {this.props.show == 1 ? this.renderLike() : ""}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
