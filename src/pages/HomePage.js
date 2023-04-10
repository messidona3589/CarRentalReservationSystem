import React from "react";
import styled from "styled-components";
import { Outlet, useParams } from "../../node_modules/react-router-dom/dist/index";
import { useLocation } from "../../node_modules/react-router-dom/dist/index";

const HomePageBlock = styled.div`
  /*콘텐츠*/
  #content_wrap{float: left; width: 100%; margin-right: -200px;}
  #content_wrap>#content{padding-right: 200px;}
      
  /*본문구성*/
  #content{background: white; border-left: 1px solid black;}
  article{padding: 10px;}
`;

const HomePage = () => {
  const location = useLocation();
  const {username} = useParams();
  const l = location.pathname.split('/');
  return(
    <HomePageBlock>
      <div id="content_wrap">
        <div id="content">
          {l.length===3 ? (
            <div style={{background : 'url(/images/BMW.jpg)', backgroundSize: '1000px', height: '500px'}}>
              <article style={{color: 'white'}}>
                <h1><br />Welcome Back, {username}!<br /></h1>
                <p><br />Ut quis officia labore qui ad nisi ea minim. Quis laboris sit cupidatat esse et mollit excepteur sint. Ex fugiat aliqua voluptate occaecat excepteur pariatur nulla ad duis consectetur veniam. Ea sit elit id minim velit.<br /></p>
            </article>
            </div>
            
          ) : (<Outlet/>)}
        </div>
      </div>
    </HomePageBlock>
  );
};

export default HomePage;