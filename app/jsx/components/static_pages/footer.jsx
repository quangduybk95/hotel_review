let translate = require('counterpart');

export default class Footer extends React.Component{
  render() {
    return (
        <div className="footer-static navbar-default">
          <p className="text-center">Coredump {translate('app.static_pages.team')}</p>
        </div>
    )
  }
}
