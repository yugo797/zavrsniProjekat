import React from 'react';
import '../styles/about.css';
const About = () => {
    return (
        <>
         <div className="main">
          <section className="about">
              <div className="padding-main">
                  <div className="about-info">
                      <div className="about-img">
                          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthevendry.com%2Fcdn-cgi%2Fimage%2Fheight%3D1920%2Cwidth%3D1920%2Cfit%3Dcontain%2Cmetadata%3Dnone%2Fhttps%3A%2F%2Fs3.amazonaws.com%2Fuploads.thevendry.co%2F23052%2F1661973415564_Cinema-Events.jpg&f=1&nofb=1&ipt=e1288a655617fd9a121e2ce902533da660f6b431f2b09574960dd3e97f450a83&ipo=images" alt="mgage"/>
                      </div>
                      <div className="about-content">
                          <h1>O nama</h1>
                          <p className='par1'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo atque, est dolorem hic
                              temporibus pariatur nihil facilis? Rem earum animi voluptatibus facere, dolore, in vitae
                              porro sunt corporis ratione harum! Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                              Totam deleniti, sed tempora vitae magni aut modi eum eius et aliquid eligendi suscipit
                              sint
                              dolore rerum id libero est mollitia reiciendis! Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit.
                          </p>
                          <p className='par2'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo atque, est dolorem hic
                              temporibus pariatur nihil facilis? Rem earum animi voluptatibus facere, dolore, in vitae
                              porro sunt corporis ratione harum! Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                              Totam deleniti, sed tempora vitae magni aut modi eum eius et aliquid eligendi suscipit
                              sint
                              dolore rerum id libero est mollitia reiciendis! Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit.
                          </p>
                          <a className="contact-us" href="./contact.html">Contact Us</a>
                      </div>
                  </div>
              </div>
          </section>
          <section className="team padding-main">
              <h1>Web Developers</h1>
              <div className="team-cards">
                  <div className="card">
                      <img className="card-img" src="" alt='Milica'/>
                      <div className="card-info">
                          <h2 className="card-name">Milica</h2>
                          <p className="card-role">Co-Founder</p>
                          <p className="card-email">example1@example.com</p>
                      </div>
                  </div>
                  <div className="card">
                      <img className="card-img" src="" alt='Una'/>
                      <div className="card-info">
                          <h2 className="card-name">Una</h2>
                          <p className="card-role">Co-Founder</p>
                          <p className="card-email">example1@example.com</p>
                      </div>
                  </div>
                  <div className="card">
                      <img className="card-img" src=""
                      alt="Milica"/>
                      <div className="card-info">
                          <h2 className="card-name">Milica</h2>
                          <p className="card-role">Co-Founder</p>
                          <p className="card-email">example2@example.com</p>
                      </div>
                  </div>
              </div>
          </section>
      </div>
        </>
       
    );
}
export default About;