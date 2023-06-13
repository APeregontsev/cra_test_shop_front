import "./style.css";
import CustomButton from "../../ui/customButton";

const CouponCard = ({ coupon, couponCopyHandler }) => {
  return (
    <div class="coupon-body">
      <div class="coupon-img">
        <img src={`./../../img/${coupon.coupon_img}`} alt="" />
      </div>
      <div class="coupon-name">Coupon {coupon.coupon_value * 100 + "%"}</div>
      <div class="coupon-name-number">({coupon.coupon_code})</div>

      <CustomButton action={() => couponCopyHandler(coupon.coupon_code)}>Copy</CustomButton>
    </div>
  );
};

export default CouponCard;
