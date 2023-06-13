import "./style.css";

import { useEffect, useState } from "react";
import { useFetching } from "../../useFetching";
import Loading from "../../ui/loader";
import { serverAddress } from "../../serverAddress";
import CouponCard from "../../ui/couponCard";
import ModalWindow from "../../ui/modalWindow";
import CustomButton from "../../ui/customButton";

const CouponsBlock = () => {
  const [couponsList, setCouponsList] = useState([]);
  const [couponsNumber, setCouponNumber] = useState(null);
  const [couponCopyPopup, setCouponCopyPopup] = useState(false);

  const [fetchCoupons, isLoading, error] = useFetching(async () => {
    const response = await fetch(`${serverAddress}coupons`);

    const data = await response.json();
    setCouponsList(data);
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  function couponCopyHandler(couponID) {
    console.log("Coupon !!!", couponID);
    navigator.clipboard.writeText(couponID).then(() => {
      setCouponNumber(couponID);
      setCouponCopyPopup(true);
    });
  }

  return (
    <div class="coupons-wrapper ">
      {isLoading && <Loading />}

      {couponsList.map((coupon) => {
        return <CouponCard coupon={coupon} couponCopyHandler={couponCopyHandler} />;
      })}

      {couponCopyPopup && (
        <ModalWindow action={setCouponCopyPopup}>
          <div className="coupon-copy-wrapper">
            <div className="coupon-text">Copied to clipboard coupon number:</div>
            <div className="coupon-number">{couponsNumber}</div>
            <CustomButton action={() => setCouponCopyPopup(false)}>Close</CustomButton>
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default CouponsBlock;
