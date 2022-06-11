import React from "react";
//millify mengubah angka panjang menjadi format yang mudah dibaca
import millify from "millify"; 
//layout dari antd
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

//import fungsi fetch api dari forlder service/cryptoApi
import { useGetCryptosQuery } from "../services/cryptoApi";
//import components dari folder components
import { Cryptocurrencies, News } from "../components";

const { Title } = Typography;

const Homepage = () => {
  // setup state untuk menampung data cryptocurrency
  const { data, isFetching } = useGetCryptosQuery(10);
  //setup state untuk menampung data news
  const globalStats = data?.data?.stats;

  //rendering berdasarkan nilai isFetching
  if (isFetching) {
    return "Loading...";
  }

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      {/* menampilkan seluruh informasi crypto di dunia saat ini */}
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24H Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={2} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      {/* memanggil components cryptocurrencies dengan properties simplified */}
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={2} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      {/* memanggil components news dengan properties simplified */}
      <News simplified />
    </>
  );
};

export default Homepage;
