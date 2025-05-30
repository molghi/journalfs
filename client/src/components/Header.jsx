import "./styles/Header.scss";
import { useContext } from "react";
import MyContext from "../context/MyContext";
// import { Link } from "react-router-dom";

const Header = () => {
    const { activeTab, setActiveTab, isLoading } = useContext(MyContext);

    // Switch tabs
    const handleTabSwitch = (e) => {
        if (e.target.textContent === "Add New") setActiveTab(0);
        else if (e.target.textContent === "View All") setActiveTab(1);
    };

    return (
        <div className="header">
            <h1>Journal</h1>

            {isLoading && <div className="loading">Loading...</div>}

            <div className="header__nav">
                <button onClick={handleTabSwitch} className={`header__btn header__btn--add ${activeTab === 0 ? "active" : ""}`}>
                    Add New
                </button>
                <button onClick={handleTabSwitch} className={`header__btn header__btn--view ${activeTab === 1 ? "active" : ""}`}>
                    View All
                </button>
            </div>
        </div>
    );
};

export default Header;
