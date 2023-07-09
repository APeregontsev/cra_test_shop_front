import "./style.css";
import CustomButton from "../../ui/customButton";

const CouponCard = ({ coupon, couponCopyHandler }) => {
  return (
    <div className="coupon-body">
      <div className="coupon-img">
        <img src={`./../../img/${coupon.coupon_img}`} alt="" />
      </div>
      <div className="coupon-name">Coupon {coupon.coupon_value * 100 + "%"}</div>
      <div className="coupon-name-number">({coupon.coupon_code})</div>

      <CustomButton action={() => couponCopyHandler(coupon.coupon_code)}>Copy</CustomButton>
    </div>
  );
};

export default CouponCard;
