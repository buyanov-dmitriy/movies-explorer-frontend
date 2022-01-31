import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Portfolio from "../Portfolio/Portfolio";

function Main(props) {
  return (
    <section className="main">
      <Promo>
        <Header isMainPage={true} onClickRegister={props.onClickRegister} onClickLogin={props.onClickLogin} />
      </Promo>
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </section>
  )
}

export default Main;
