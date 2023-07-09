import "./style.css";
import ToggleButton from "../toggleButton";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "./../../slices/darkMode/darkMode";

const DarkModeSwitch = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="footer-switch ">
      <div className="day-switch">
        <img className="day_ico-img" src="./../../img/day.svg" alt="day_ico" />
      </div>
      <div className="toggle-switch">
        <ToggleButton action={() => dispatch(setDarkMode(!darkMode))} />
      </div>
      <div className="night-switch">
        <img className="night_ico-img" src="./../../img/night.svg" alt="night_ico" />
      </div>
    </div>
  );
};

export default DarkModeSwitch;
