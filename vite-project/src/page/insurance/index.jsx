import React from "react";
import { useState, useEffect } from "react";
import { Table, message, Tag, Spin, Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Insurance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_URL_BE_PUBLIC}/insurance-options`
        );
        setData(res.data?.data?.items || []);
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
      title: "Tên bảo hiểm",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá/ngày (VND)",
      dataIndex: "dailyRate",
      key: "dailyRate",
      sorter: (a, b) => a.dailyRate - b.dailyRate,
      render: (v) => v.toLocaleString("vi-VN"),
    },
    {
      title: "Chi tiết quyền lợi",
      dataIndex: "coverageDetails",
      key: "coverageDetails",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đang hoạt động", value: "active" },
        { text: "Không hoạt động", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Action",
      key: "action",
      width: 90,
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => navigate(`/update-insurance/${record.id}`)}
          >
            <i className="fa-solid fa-pen"></i>
          </Button>
        </>
      ),
    },
  ];
  return (
    <div style={{ marginTop: "150px" }}>
      <Button
        style={{
          marginLeft: "350px",
          marginBottom: "10px",
          background: "#9C69E2",
          color: "white",
        }}
        onClick={() => navigate("/add-insurance")}
      >
        Thêm mới
      </Button>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 3 }}
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

export default Insurance;
