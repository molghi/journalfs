import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomActions from "../components/BottomActions";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const MainLayout = () => {
    const { errorMsg } = useContext(MyContext);

    return (
        <>
            <Header />
            <Outlet />
            {errorMsg && <div className="error">Error: {errorMsg}</div>}
            <BottomActions />
        </>
    );
};

export default MainLayout;
