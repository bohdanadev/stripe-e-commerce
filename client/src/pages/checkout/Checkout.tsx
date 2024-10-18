import { useState } from 'react';
import ShippingAddress, {
  ShippingFormValues,
} from './custom-checkout/ShippingAddress';
import CustomCheckout from './custom-checkout/CustomCheckout';
import { useAppSelector } from '../../hooks/reduxHooks';
import './checkout.styles.scss';

const Checkout = () => {
  const { itemCount, total, cartItems } = useAppSelector((state) => state.cart);
  const [shipping, setShipping] = useState<ShippingFormValues | null>(null);
  const addressShown = {
    display: shipping ? 'none' : 'block',
  };
  const cardShown = {
    display: shipping ? 'block' : 'none',
  };
  return (
    <div className='checkout'>
      <h2>Checkout Summary</h2>
      <h3>{`Total Items: ${itemCount}`}</h3>
      <h4>{`Amount to Pay: $${total}`}</h4>
      <div style={addressShown}>
        <ShippingAddress setShipping={setShipping} />
      </div>
      <div style={cardShown}>
        <CustomCheckout
          shipping={shipping as ShippingFormValues}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
};

export default Checkout;
