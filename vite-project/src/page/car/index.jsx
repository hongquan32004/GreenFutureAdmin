import React from "react";
import { message, Space, Table, Tag, Spin, Image, Button } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";

const Car = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_URL_BE_PUBLIC}/car-models`
        );
        setData(res.data?.data || []);
      } catch (err) {
        console.error(err);
        message.error("Không lấy được dữ liệu xe!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrls",
      key: "image",
      width: 100,
      render: (imgs) => (
        <Image
          src={imgs?.[0]}
          width={80}
          height={50}
          style={{ objectFit: "cover" }}
          placeholder
        />
      ),
    },
    {
      title: "Tên xe",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
      render: (text) => text || "Không có tên",
    },
    {
      title: "Mã model",
      dataIndex: "modelCode",
      key: "modelCode",
    },
    {
      title: "Loại",
      dataIndex: "vehicleType",
      key: "vehicleType",
      filters: [
        { text: "SUV", value: "suv" },
        { text: "Sedan", value: "sedan" },
        { text: "Hatchback", value: "hatchback" },
        { text: "MPV", value: "mpv" },
      ],
      onFilter: (value, record) => record?.vehicleType === value,
      render: (t) => (t ? t.toUpperCase() : "Không rõ"),
    },
    {
      title: "Pin",
      dataIndex: "batteryCapacity",
      key: "batteryCapacity",
    },
    {
      title: "Quãng đường/sạc",
      dataIndex: "rangePerCharge",
      key: "rangePerCharge",
    },
    {
      title: "Giá/ngày (đ)",
      dataIndex: "basePricePerDay",
      key: "basePricePerDay",
      align: "right",
      sorter: (a, b) => a?.basePricePerDay - b?.basePricePerDay,
      render: (v) =>
        typeof v === "number" ? v.toLocaleString("vi-VN") : "N/A",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Available", value: "available" },
        { text: "Coming Soon", value: "coming_soon" },
      ],
      onFilter: (value, record) => record?.status === value,
      render: (s) =>
        s ? (
          <Tag
            color={s === "available" ? "green" : "orange"}
            style={{ textTransform: "capitalize" }}
          >
            {s.replace("_", " ")}
          </Tag>
        ) : (
          <Tag color="default">Không rõ</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => navigate(`/update-car-model/${record.id}`)}
          >
            <i className="fa-solid fa-pen"></i>
          </Button>
          <Button onClick={() => navigate(`/list-car/${record.id}`)}>
            <i className="fa-solid fa-list"></i>
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "130px" }}>
      <div className="button">
        <Button
          style={{
            marginLeft: "350px",
            marginBottom: "10px",
            marginRight: "20px",
            background: "#9C69E2",
            color: "white",
          }}
          onClick={() => navigate("/list-car-all")}
        >
          Danh sách xe
        </Button>
        <Button
          style={{
            marginBottom: "10px",
            background: "#9C69E2",
            color: "white",
          }}
          onClick={() => navigate("/add-car-model")}
        >
          Thêm mới
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          className="dark-table"
          style={{ width: "75%", marginLeft: "350px", background: "white" }}
        />
      </Spin>
    </div>
  );
};

export default Car;
