import React from 'react'; 
import {Link} from 'gatsby';
import {comapanyMenuData, yourNextMenuData, servicesMenuData} from './footer-menu-data';
import 'font-awesome/css/font-awesome.min.css';
import Copyright from './copyright';
import './footer.css';
import { AnchorLink } from "gatsby-plugin-anchor-links";
//import jump from '../jump';

const Footer = () => {
    return(
        <footer>
            <div className="footer-cover">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12 mb-4">
                            <a className="fa-icon" href="https://www.linkedin.com/company/tekdi-technologies/" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin-square"></i>
                            </a>
                            <a className="fa-icon" href="https://www.facebook.com/tekditechnologies" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                            {/* <Link className="fa-icon" to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-pinterest" aria-hidden="true"></i>
                            </Link> */}
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="office-address mb-5">
                                {/* <h4 className="section-title text-uppercase">Address</h4> */}
                                {/* <p>
                                    Office No. 6, Silver Fern, Karve Road, Kothrud, Pune 411038 
                                </p> */}
                            </div>
                            {/* <div className="contact-info">
                                <h4 className="section-title text-uppercase">Phone</h4>
                                <p>
                                    +91 7350013701<br/>
                                    +91 7350013702 
                                </p>
                            </div> */}
                        </div>
                        <div className="footer-menu col-md-2 col-sm-4 col-xs-12">
                            <h4 className="section-title text-uppercase">Company</h4>
                            <nav>
                                {comapanyMenuData.length && (      
                                    <ul className="footer-menu-items unstyled">
                                        { comapanyMenuData.map (item => {
                                            // const urlParts = item.url.split('#');
                                            // if(urlParts.length > 1 ){
                                            //   return (<li key = {item.label} className="mb-3"><a href="#" role="link" data-link={item.url} onClick={jump}> {item.label} </a></li>)
                                            // }
                                            // else {
                                            //   return (<li key = {item.label} className="mb-3"><Link to={item.url}> {item.label} </Link></li>)
                                            // }
                                            return (<li key = {item.label} className="mb-3"><Link to={item.url}> {item.label} </Link></li>)
                                        }
                                        ) }
                                    </ul>
                                )}
                            </nav>
                        </div>
                        <div className="footer-menu col-md-2 col-sm-4 col-xs-12">
                            <h4 className="section-title text-uppercase">Your Next</h4>
                            <nav>
                                {yourNextMenuData.length && (      
                                    <ul className="footer-menu-items unstyled">
                                        { yourNextMenuData.map (item => {
                                            //  const urlParts = item.url.split('#');
                                            //  if(urlParts.length > 1 ){
                                            //    return (<li key = {item.label} className="mb-3"><a href="#" role="link" data-link={item.url} onClick={jump}> {item.label} </a></li>)
                                            //  }
                                            //  else {
                                            //    return (<li key = {item.label} className="mb-3"><Link to={item.url}> {item.label} </Link></li>)
                                            //  }
                                            return (<li key = {item.label} className="mb-3"><Link to={item.url}> {item.label} </Link></li>)
                                        }
                                        ) }
                                    </ul>
                                )}
                            </nav>
                        </div>
                        <div className="footer-menu col-md-2 col-sm-4 col-xs-12">
                            <h4 className="section-title text-uppercase">Services</h4>
                            <nav>
                                {servicesMenuData.length && (      
                                    <ul className="footer-menu-items unstyled">
                                         { servicesMenuData.map (item => {
                                            //  const urlParts = item.url.split('#');
                                            //  if(urlParts.length > 1 ){
                                            //    return (<li key = {item.label} className="mb-3"><a href="#" role="link" data-link={item.url} onClick={jump}> {item.label} </a></li>)
                                            //  }
                                            //  else {
                                            //    return (<li key = {item.label} className="mb-3"><Link to={item.url}> {item.label} </Link></li>)
                                            //  }
                                            return (<li key = {item.label} className="mb-3"><AnchorLink to={item.url}>{item.label} </AnchorLink></li>)
                                        }
                                        ) }
                                    </ul>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <Copyright />
        </footer>
    )
}
 export default Footer;