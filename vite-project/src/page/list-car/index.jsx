import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utils/axios-http/axios-http";
import { message, Table, Spin, Tag } from "antd";
import dayjs from "dayjs";

const ListCar = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await get(`cars/car-models/${id}`);
        setData(response?.data?.items);
      } catch (err) {
        console.error(err);
        message.error("Không lấy được dữ liệu!!!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Biển số",
      dataIndex: "licensePlate",
      key: "licensePlate",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Số VIN",
      dataIndex: "vinNumber",
      key: "vinNumber",
    },
    {
      title: "Số km đã đi",
      dataIndex: "currentMileage",
      key: "currentMileage",
      render: (text) => `${text.toLocaleString()} km`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "available") color = "green";
        else if (status === "rented") color = "blue";
        else if (status === "maintenance") color = "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Tình trạng pin",
      dataIndex: "batteryHealth",
      key: "batteryHealth",
      render: (text) => `${text}%`,
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "manufacturingDate",
      key: "manufacturingDate",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày bảo dưỡng gần nhất",
      dataIndex: "lastMaintenanceDate",
      key: "lastMaintenanceDate",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Địa điểm nhận xe",
      dataIndex: ["pickupLocation", "name"],
      key: "pickupLocation",
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{
          width: "75%",
          marginTop: "150px",
          marginLeft: "350px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      />
    </Spin>
  );
};

export default ListCar;
