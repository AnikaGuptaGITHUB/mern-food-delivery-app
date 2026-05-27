import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Verify.css';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  // ✅ Corrected async function syntax
  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Payment verification failed:", error);
      navigate("/");
    }
  };

  // ✅ Call it once on page load
  useEffect(() => {
    verifyPayment();
  });

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying your payment...</p>
    </div>
  );
};

export default Verify;
