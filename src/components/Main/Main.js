import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
  return (
    <section className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </section>
  )
}

export default Main;
