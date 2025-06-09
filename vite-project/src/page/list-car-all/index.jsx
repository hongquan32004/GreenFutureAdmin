import React from "react";
import { message, Space, Table, Tag, Spin, Image, Button } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { get, post } from "../../utils/axios-http/axios-http";
import Import from "../../components/import";
import axios from "axios";

const ListCarAll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const handleExportExel = async () => {
    try {
      const response = await get(
        "cars/export/excel",
        {},
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "danh-sach-xe.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success("Export thành công!!");
    } catch (error) {
      console.error(error);
      message.error("Có lỗi khi export!!!");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allCar = [];
        const startPage = 0;
        const endPage = 10;
        for (let i = startPage; i <= endPage; i++) {
          const res = await get(`cars?page=${i}`);
          const items = res?.data?.items || [];
          allCar.push(...items);
        }

        setData(allCar);
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
    },
    {
      title: "Biển số",
      dataIndex: "licensePlate",
      key: "licensePlate",
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
      filters: [
        { text: "Trắng", value: "Trắng" },
        { text: "Đen", value: "Đen" },
        { text: "Xám", value: "Xám" },
        { text: "Xanh", value: "Xanh" },
        { text: "Đỏ", value: "Đỏ" },
        { text: "Bạc", value: "Bạc" },
      ],
      onFilter: (value, record) => record.color === value,
      render: (color) => {
        const colorMap = {
          Trắng: "#f0f0f0",
          Đen: "#000000",
          Xám: "#808080",
          Xanh: "#1890ff",
          Đỏ: "#ff4d4f",
          Bạc: "#bfbfbf",
        };
        const textColor =
          color === "Trắng" || color === "Bạc" ? "#000" : "#fff";
        return (
          <Tag color={colorMap[color]} style={{ color: textColor }}>
            {color}
          </Tag>
        );
      },
    },
    {
      title: "Ngày SX",
      dataIndex: "manufacturingDate",
      key: "manufacturingDate",
      sorter: (a, b) =>
        dayjs(a.manufacturingDate).unix() - dayjs(b.manufacturingDate).unix(),
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Số km hiện tại",
      dataIndex: "currentMileage",
      key: "currentMileage",
      sorter: (a, b) => a.currentMileage - b.currentMileage,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Available", value: "available" },
        { text: "Coming Soon", value: "coming_soon" },
        { text: "Rented", value: "rented" },
        { text: "Maintenance", value: "maintenance" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (s) => (
        <Tag
          color={
            s === "available"
              ? "green"
              : s === "coming_soon"
              ? "orange"
              : s === "rented"
              ? "blue"
              : "red"
          }
          style={{ textTransform: "capitalize" }}
        >
          {s.replace("_", " ")}
        </Tag>
      ),
    },
    {
      title: "Pin (%)",
      dataIndex: "batteryHealth",
      key: "batteryHealth",
      sorter: (a, b) => a.batteryHealth - b.batteryHealth,
    },
    {
      title: "Dòng xe",
      dataIndex: ["carModel", "name"],
      key: "carModel",
    },
    {
      title: "Vị trí nhận xe",
      dataIndex: ["pickupLocation", "name"],
      key: "pickupLocation",
    },
  ];
  return (
    <div style={{ marginTop: "111px" }}>
      <div className="button">
        <Button
          style={{
            marginLeft: "350px",
            marginBottom: "10px",
            marginRight: "20px",
            background: "#9C69E2",
            color: "white",
          }}
          onClick={() => setDisplayModal(true)}
        >
          Import exel
        </Button>
        <Button
          style={{
            marginBottom: "10px",
            background: "#9C69E2",
            color: "white",
          }}
          onClick={handleExportExel}
        >
          Export exel
        </Button>
        <Import
          displayModel={displayModal}
          hideModal={() => setDisplayModal(false)}
        />
      </div>
      <Spin spinning={loading}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data.map((item) => ({ ...item, key: item.id }))}
          pagination={{ pageSize: 7 }}
          style={{
            width: "75%",
            marginLeft: "350px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
        />
      </Spin>
    </div>
  );
};

export default ListCarAll;
