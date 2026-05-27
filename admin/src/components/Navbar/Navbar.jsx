import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;
