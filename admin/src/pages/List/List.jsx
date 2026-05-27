import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './List.css';

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // refresh list
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  });

  return (
    <div className="list add flex col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length === 0 ? (
          <p>No food items found</p>
        ) : (
          list.map((item) => (
            <div key={item._id} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>x</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
