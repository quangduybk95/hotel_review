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
      comment: a
    }

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
              <strong>{this.state.comment.user_name}</strong> <span
              className="text-muted">{moment(new Date(this.state.comment.created_at)).format('DD/MM/YYYY, h:mm:ss a')}</span>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}
