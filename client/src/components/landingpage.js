import React from 'react';
import '../Style/LandingPage.css';
import { Link } from 'react-router-dom';

const Landingpage = () => {
  return (
    <>
      <div className='HeaderContainer'>
        <h1>
          Join our <span>thriving online community</span> of like-minded individuals and explore a world of diverse discussions and <span>exciting conversations.</span>
        </h1>
        <h2>Scroll down to get started chatting.</h2>
      </div>

      <section className="project_container">
        <div className="cards row">
          <div className="cardL row">
            <Link to='/post/Language'>
              <div className="card-body">
                <div className="title">
                  <h2 className="project_title">Language</h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="cardL row">
            <Link to='/post/Sports'>
              <div className="card-body">
                <div className="title">
                  <h2 className="project_title">Sports</h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="cardL row">
            <Link to='/post/Travel'>
              <div className="card-body">
                <div className="title">
                  <h2 className="project_title">Travel</h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="cardL row">
            <Link to='/post/Finance'>
              <div className="card-body">
                <div className="title">
                  <h2 className="project_title">Finance</h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="cardL row">
            <Link to='/post/Medical'>
              <div className="card-body">
                <div className="title">
                  <h2 className="project_title">Medical</h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="cardL row">
            <Link to='/post/Games'>
              <div className="card-body">
                <div className="title">
                  <h2 className="project_title">Games</h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="cardL row">
            <Link to='/post/Chat'>
              <div className="card-body">
                <div className="title">
                  <h2 className="project_title">Chat</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landingpage;
