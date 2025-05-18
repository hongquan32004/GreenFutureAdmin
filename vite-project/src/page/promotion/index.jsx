import React from "react";
import { message, Space, Table, Tag, Spin, Image, Button } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { get } from "../../utils/axios-http/axios-http";
const Promotions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await get("promotions");
        setData(response?.data?.items);
      } catch (err) {
        console.error(err);
        message.error("Không lấy được dữ liệu!!!");
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
      title: "Mã khuyến mãi",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên chương trình",
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
      title: "Loại giảm giá",
      dataIndex: "discountType",
      key: "discountType",
      filters: [
        { text: "Phần trăm", value: "percentage" },
        { text: "Số tiền cố định", value: "fixed_amount" },
      ],
      onFilter: (value, record) => record.discountType === value,
      render: (val) =>
        val === "percentage" ? "Phần trăm (%)" : "Số tiền cố định (VND)",
    },
    {
      title: "Giá trị giảm",
      dataIndex: "discountValue",
      key: "discountValue",
      sorter: (a, b) => a.discountValue - b.discountValue,
      render: (val) => (val ? val.toLocaleString() : ""),
    },
    {
      title: "Số ngày thuê tối thiểu",
      dataIndex: "minRentalDays",
      key: "minRentalDays",
      sorter: (a, b) => a.minRentalDays - b.minRentalDays,
    },
    {
      title: "Giới hạn tối đa",
      dataIndex: "maxDiscountAmount",
      key: "maxDiscountAmount",
      sorter: (a, b) => a.maxDiscountAmount - b.maxDiscountAmount,
      render: (val) => (val ? val.toLocaleString() : ""),
    },
    {
      title: "Thời gian áp dụng",
      key: "duration",

      sorter: (a, b) =>
        dayjs(a.startDate).unix() - dayjs(b.startDate).unix() ||
        dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
      render: (record) =>
        `${dayjs(record.startDate).format("DD/MM/YYYY")} - ${dayjs(
          record.endDate
        ).format("DD/MM/YYYY")}`,
    },

    {
      title: "Giới hạn sử dụng",
      dataIndex: "usageLimit",
      key: "usageLimit",
      sorter: (a, b) => (a.usageLimit || 0) - (b.usageLimit || 0),
      render: (val) => (val === null ? "Không giới hạn" : val),
    },
    {
      title: "Số lần đã dùng",
      dataIndex: "timesUsed",
      key: "timesUsed",
      sorter: (a, b) => a.timesUsed - b.timesUsed,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Hoạt động", value: "active" },
        { text: "Không hoạt động", value: "inactive" },
        { text: "Chưa xác định", value: null },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        if (status === "active") return <Tag color="green">Hoạt động</Tag>;
        else if (status === "inactive")
          return <Tag color="red">Không hoạt động</Tag>;
        else return <Tag color="default">Chưa xác định</Tag>;
      },
    },
  ];
  return (
    <Spin spinning={loading}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        pagination={{ pageSize: 3 }}
        style={{
          width: "75%",
          marginTop: "100px",
          marginLeft: "350px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      />
    </Spin>
  );
};

export default Promotions;
