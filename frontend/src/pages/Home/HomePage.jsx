import HeaderComponent from '../../components/header/header.component';
import BannerComponent from '../../components/banner/banner.component';
import MenuComponent from '../../components/menu/menu.component';
import SecondMenuComponent from '../../components/menu/secondMenu.component';
import ThirdMenuComponent from '../../components/menu/thirdMenu.component';
import ContactComponent from '../../components/contact/contact.component';
import FooterComponent from '../../components/footer/footer.component';
import Container from 'react-bootstrap/Container';
import "./HomePage.css"

export const HomePage = () => {
  return (
    <div className='homePage'>
    <Container fluid>
      <HeaderComponent />
      <BannerComponent />
      <MenuComponent />
      <SecondMenuComponent />
      <ThirdMenuComponent />
      <ContactComponent />
      <FooterComponent />
      </Container>
    </div>
  );
};