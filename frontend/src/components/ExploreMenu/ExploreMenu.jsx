import { menu_list } from '../../assets/assets'; // corrected path
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes crafted 
        with the finest ingredients. Satisfy your cravings and elevate your dining 
        experience, one delicious meal at a time. 
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div 
            onClick={() => setCategory(pre => pre === item.menu_name ? "All" : item.menu_name)} 
            key={index} 
            className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
          >
            <img src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr/>
    </div>
  );
}

export default ExploreMenu;
