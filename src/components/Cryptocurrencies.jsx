import React, { useEffect, useState } from "react";
//millify mengubah angka format panjang menjadi format yang mudah dibaca
import millify from "millify";
import { Link } from "react-router-dom";
// layout dari antd
import { Card, Row, Col, Input } from "antd";

//import fungsi fetch api dari folder services/cryptoApi
import { useGetCryptosQuery } from "../services/cryptoApi";

// components yang menampilkan daftar crypto yang menerima properties simplified
const Cryptocurrencies = ({ simplified }) => {
  //setur variabel count untuk menampung jumlah cryptocurrency yang akan ditampilkan
  const count = simplified ? 10 : 100;
  //setup state untuk menampung data cryptocurrency
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  //setup state untuk menampung data crypto
  const [cryptos, setCryptos] = useState();
  //setup state untuk menampung nilai searching
  const [searchTerm, setSearchTerm] = useState("");

  //useEffect yang menampilkan daftar cypto sesuai dengan nilai yang dimasukkan di input search
  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);

    const filterredCryptos = cryptoList?.data?.coins.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filterredCryptos);
  }, [cryptoList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {/* conditional formatting yang akan menampilkan 10 crypto jika properti simplified bernilai true dan 100 jika bernilai false */}
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => {
              setSearchTerm(e.target.value.toLowerCase());
            }}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            span={8}
            key={currency.uuid}
          >
            {/* link ke url /crypto/uuid untuk melihat informasi lengkap mengenai crypto dengan id tersebut */}
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="crypto-icons"
                  />
                }
              >
                <p>Price: $ {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
        ;
      </Row>
    </>
  );
};

export default Cryptocurrencies;
