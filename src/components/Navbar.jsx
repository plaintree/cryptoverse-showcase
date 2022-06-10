import { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

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

  const handleClick = () => setActiveMenu(!activeMenu);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={3} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={handleClick}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && <Menu theme='dark' items={items} />}
    </div>
  );
};

export default Navbar;
