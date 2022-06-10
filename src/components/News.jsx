import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { SpinnerDotted } from "spinners-react";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { Text, Title } = Typography;
  const { Option } = Select;
  const demoImageUrl =
    "https://images.unsplash.com/photo-1613919517761-0d9e719d3244?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80";

  const { data: cryptoNews, isLoading } = useGetCryptosNewsQuery({
    newsCategory,
    count: simplified ? 10 : 20,
  });
  const { data: cryptoList } = useGetCryptosQuery(100);

  const handleChange = (value) => {
    setNewsCategory(value);
  };

  const handleFilterOption = (input, option) =>
    option.children.toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {isLoading && (
        <Row justify='center' align='middle'>
          <SpinnerDotted color='#0071bd' />
        </Row>
      )}
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select a crypto'
              optionFilterProp='children'
              onChange={handleChange}
              filterOption={handleFilterOption}>
              <Option value='Cryptocurrency'>All Cryptocurrency</Option>
              {cryptoList?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews?.value.map((news, index) => (
          <Col xs={24} sm={12} lg={8}>
            <Card hoverable className='news-card' key={index}>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
                    alt='news'
                    width={100}
                    height={100}
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImageUrl
                      }
                      alt='news'
                    />
                    <Text className='provider-name'>
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
