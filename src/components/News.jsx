import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
//libary untuk melakukan formating kepada tanggal
import moment from "moment";

// import fungsi fetch api untuk news dan cryptocurrency
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  //setup state category dengan default value adalah "cryptocurrency"
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  //fecthing crypto news berdasarkan category yang dipilih dan limit
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  //fetching data crypto dengan limit 100
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {/* conditional render jika components dalam mode simplified maka tidak menampilkan tab category */}
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {/* menampilkan daftar crypto */}
      {cryptoNews.value.map((news, index) => (
        <Col key={index} xs={24} sm={24} lg={8}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  alt="news-icon"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provide-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="provider-icon"
                  />
                  <Text className="provider-name">
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
  );
};

export default News;
