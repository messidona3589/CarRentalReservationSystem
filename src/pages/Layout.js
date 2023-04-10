import { Outlet, useNavigate, useParams } from "../../node_modules/react-router-dom/dist/index";
import { Link } from "../../node_modules/react-router-dom/dist/index";
import styled from "styled-components";
import { NavLink } from "../../node_modules/react-router-dom/dist/index";

const LayoutBlock = styled.div`
  *{margin: 0; padding: 0;}
  body{font-family: 'Helvetica', 'sans-serif'; min-width: 760px;}
  li{list-style: none;}

  #main_header{height: 60px; line-height: 60px; padding-left: 10px; border-bottom: 1px solid black;
              background: #1D4088; color: white;}
      
  #main_gnb{overflow: hidden; border-bottom: 1px solid black; background: #32394A;}
  #main_gnb>ul.left{overflow: hidden; float: left;}
  #main_gnb>ul.right{overflow: hidden; float: right;}
  #main_gnb>ul.left>li{float: left;}
  #main_gnb>ul.right>li{float: left;}

  #main_lnb{float: left; width: 200px;}

  main {background: #71B1D1;}
  main {overflow: hidden;}

  #main_footer{padding: 10px; border-top: 3px solid black; text-align: center;}
`;

const LinkBlock = styled(Link)`
  display: block; padding: 10px 20px; border-left: 1px solid #5F6673; 
  border-right: 1px solid #242A37; color: white; font-weight: bold;
`;

const NavLinkBlock = styled(NavLink)`
  display: block; height: 40px; line-height: 40px; padding-left: 15px; border-top: 1px solid #96D6F6;
  border-bottom: 1px solid #6298B2; color: white; font-weight: bold;
`;

const aBlock = styled.a`
  display: block; padding: 10px 20px; border-left: 1px solid #5F6673; 
  border-right: 1px solid #242A37; color: white; font-weight: bold;
`;

const Layout = () => {
  const {username} = useParams();

  return (
    <LayoutBlock>
      <header id="main_header">
        <h1>Car Rental Reservation System</h1>
      </header>
      <nav id="main_gnb">
        <ul class="left">
          <li><LinkBlock>About</LinkBlock></li>
          <li><LinkBlock>Product</LinkBlock></li>
          <li><LinkBlock>Support</LinkBlock></li>
          <li><LinkBlock>Follow</LinkBlock></li>
        </ul>
        <ul class="right">
          <li><LinkBlock to={`/home/${username}/profile`}>{username}</LinkBlock></li>
          <li><LinkBlock to={'/'}>Logout</LinkBlock></li>
        </ul>
      </nav>
      <main>
        <nav id="main_lnb">
          <ul>
            <li><NavLinkBlock to={`/home/${username}/dashboard`}>Dashboard</NavLinkBlock></li>
            <li><NavLinkBlock to={`/home/${username}/rentals`}>Rentals</NavLinkBlock></li>
            <li><NavLinkBlock to={`/home/${username}/carSection`}>Car Section</NavLinkBlock></li>
            <li><NavLinkBlock to={`/home/${username}/customerSection`}>Customer Section</NavLinkBlock></li>
          </ul>
        </nav>
        <Outlet />
      </main>
      <footer id="main_footer">
        <h3>Car Rental Reservation System</h3>
        <address> © 2023 messidona3589. All rights reserved.</address>
      </footer>
    </LayoutBlock>
  );
};

export default Layout;