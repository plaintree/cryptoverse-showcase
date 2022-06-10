import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale, Title);
// The historics price has problem which is the Time. It fetch from 1970, not current Year. (API problem)

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const { Title } = Typography;
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price (USD)",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scale: {
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Row className='chart-header'>
      <Title level={2} className='chart-title'>
        {coinName} Price Chart
      </Title>
      <Col level={5} className='price-change'>
        {coinHistory?.data?.change}
      </Col>
      <Col level={5} className='current-price'>
        Current {coinName} Price: ${currentPrice}
      </Col>
      <Line data={data} options={options} />
    </Row>
  );
};

export default LineChart;
