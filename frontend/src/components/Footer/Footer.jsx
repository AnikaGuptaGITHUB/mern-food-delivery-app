import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo}alt="" />
                    <p>
                        This website is created for demonstration purposes only.
                        All content, images, and information are used as placeholders.
                        © 2025 Your Company Name. All rights reserved.
                    </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>
                        GET IN TOUCH
                    </h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2025 @ Tomato - All Right Reserved.</p>
        </div>
    )
}

export default Footer
