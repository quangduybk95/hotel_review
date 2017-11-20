import NavBar from './navbar'
import Hotels from '../hotels/index'
let translate = require('counterpart');

export default class Home extends React.Component {
  render() {
    return (
      <section>
        <NavBar current_page={1}/>
        <Hotels/>
        <div className="footer-non-static navbar-default">
          <p className="text-center">Coredump {translate('app.static_pages.team')}</p>
        </div>
      </section>
    )
  }
}
