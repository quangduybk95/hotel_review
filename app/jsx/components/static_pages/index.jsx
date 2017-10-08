import NavBar from './navbar'
import Footer from './footer'
export default class Home extends React.Component {
  render() {
    return (
      <section>
        <NavBar current_page={1}/>
        <Footer/>

      </section>
    )
  }
}
