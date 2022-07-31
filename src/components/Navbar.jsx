import { useState, useEffect } from "react";
import { Button, Menu, Typography, Image } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import logo from "../images/cryptoverse.png";

const getItem = (label, key, icon, children, type) => {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
};

const items = [
  getItem(<Link to='/'>Home</Link>, "1", <HomeOutlined />),
  getItem(
    <Link to='/cryptocurrencies'>Cryptocurrencies</Link>,
    "2",
    <FundOutlined />
  ),
  getItem(
    <Link to='/exchanges'>Exchanges</Link>,
    "3",
    <MoneyCollectOutlined />
  ),
  getItem(<Link to='/news'>News</Link>, "4", <BulbOutlined />),
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleClick = () => setActiveMenu((prevState) => !prevState);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Image src={logo} width={200} />
        <Button
          type='text'
          className='menu-control-container'
          onClick={handleClick}>
          <MenuOutlined style={{ color: "white" }} />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          items={items}
          theme='dark'
          style={{ backgroundColor: "#404040" }}
        />
      )}
    </div>
  );
};

export default Navbar;
