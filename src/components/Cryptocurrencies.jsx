import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { millify } from "millify";
import { SpinnerDotted } from "spinners-react";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isLoading } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchFields, setSearchFields] = useState("");

  useEffect(() => {
    const filteredCrypto = cryptoList?.data?.coins.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchFields.toLowerCase())
    );

    setCryptos(filteredCrypto);
  }, [cryptoList, searchFields]);

  const handleChange = (event) => {
    setSearchFields(event.target.value);
  };


  if (isLoading) return "Loading...";
  return (
    <>
      {isLoading && !simplified && (
        <Row justify='center' align='middle'>
          <SpinnerDotted color='#0071bd' />
        </Row>
      )}
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={handleChange} />
        </div>
      )}

      <Row gutter={[24, 24]} className='crypto-card-container'>
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid}>
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={
                  <img className='crypto-image' src={crypto.iconUrl} alt='coin icon' />
                }
                hoverable>
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.price)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
