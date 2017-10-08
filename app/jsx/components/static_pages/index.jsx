import NavBar from './navbar'
import Footer from './footer'
import Hotels from '../hotels/index'
export default class Home extends React.Component {
  render() {
    return (
      <section>
        <NavBar current_page={1}/>
        <Hotels/>
        <Footer/>
      </section>
    )
  }
}
