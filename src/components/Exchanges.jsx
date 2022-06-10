import { useGetCryptoExchangesQuery } from "../services/cryptoExchangeApi";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import parse from "html-react-parser";
import { SpinnerDotted } from "spinners-react";

const Exchanges = () => {
  const { data: cryptoExchanges, isLoading } = useGetCryptoExchangesQuery();
  const { Text } = Typography;

  return (
    <>
      <Row gutter={[0, 32]}>
        <Col span={6}>
          <strong>Exchanges</strong>
        </Col>
        <Col span={6}>
          <strong>24h Trade Volume (BTC)</strong>
        </Col>
        <Col span={6}>
          <strong>Country</strong>
        </Col>
        <Col span={6}>
          <strong>Website</strong>
        </Col>
      </Row>
      {isLoading && (
        <Row justify='center' align='middle'>
          <SpinnerDotted color='#0071bd' />
        </Row>
      )}
      <Row>
        {cryptoExchanges?.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Row gutter={[0, 32]} key={exchange.id} justify='center'>
              <Col span={6}>
                <Row justify='start' align='bottom'>
                  <Text>
                    <strong>{exchange.trust_score_rank}.</strong>
                  </Text>
                  <Avatar className='exchange-image' src={exchange.image} />
                </Row>
                <Row>
                  <Text>{exchange.name}</Text>
                </Row>
              </Col>
              <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
              <Col span={6}>{exchange.country}</Col>
              <Col span={6}>
                <a href={exchange.url} target='_blank' rel='noreferrer'>
                  {exchange.url}
                </a>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
