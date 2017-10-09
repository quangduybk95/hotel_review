import moment from 'moment'
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment
    }

  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="thumbnail">
            <img className="img-responsive user-photo" src={this.state.comment.image}
                 width='100' height='100'
            />
          </div>
        </div>

        <div className="col-md-8">
          <div className="panel panel-default">
            <div className="panel-heading">
              <strong>{this.state.comment.name}</strong> <span
              className="text-muted">{moment(new Date(parseFloat(this.state.comment.create_at))).format('DD/MM/YYYY, h:mm:ss a')}</span>
            </div>
            <div className="panel-body">
              <p className="comment-text">{this.state.comment.text}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
