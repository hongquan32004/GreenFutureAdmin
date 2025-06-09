import React from "react";
import { useState, useEffect } from "react";
import { message, Table, Spin, Tag, Image, Select } from "antd";
import axios from "axios";
import { get, patch } from "../../utils/axios-http/axios-http";
import dayjs from "dayjs";

const RentalOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await get("rental-orders");
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
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("accessToken"); // hoặc lấy từ context/auth provider

      await axios.patch(
        `${
          import.meta.env.VITE_APP_URL_BE
        }/rental-orders/${id}/status?status=${newStatus}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Cập nhật trạng thái thành công!!");
    } catch (error) {
      console.error(error);
      message.error("Cập nhật trạng thái thất bại!!!");
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã đơn",
      dataIndex: "orderCode",
      key: "orderCode",
      sorter: (a, b) => a.orderCode.localeCompare(b.orderCode),
    },
    {
      title: "Thời gian thuê",
      key: "rentalPeriod",
      render: (_, record) =>
        `${dayjs(record.startDatetime).format("DD/MM/YYYY HH:mm")} - ${dayjs(
          record.endDatetime
        ).format("DD/MM/YYYY HH:mm")}`,
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, record) => (
        <>
          <div>{record.customer.name}</div>
          <div>{record.customer.phone}</div>
        </>
      ),
    },
    {
      title: "Xe",
      key: "car",
      render: (_, record) => (
        <>
          <div>
            <b>{record.car.modelName}</b> - {record.car.licensePlate}
          </div>
          <Image src={record.car.imageUrl} alt="car" width={100} />
        </>
      ),
    },
    {
      title: "Địa điểm nhận xe",
      dataIndex: ["pickupLocation", "name"],
      key: "pickupLocation",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `${Number(text).toLocaleString()} đ`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Trạng thái đơn",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let color = "default";
        switch (status) {
          case "completed":
            color = "green";
            break;
          case "pending":
            color = "orange";
            break;
          case "confirmed":
            color = "blue";
            break;
          case "cancelled":
            color = "red";
            break;
        }
        return (
          <>
            {/* <Tag color={color}>{status.toUpperCase()}</Tag>
            <br /> */}
            <Select
              defaultValue={status}
              onChange={async (newStatus) => {
                await updateOrderStatus(record.id, newStatus);
                // Reload data
                setLoading(true);
                try {
                  const response = await get("rental-orders");
                  setData(response?.data?.items);
                } catch {
                  message.error("Không thể load dữ liệu sau khi cập nhật");
                } finally {
                  setLoading(false);
                }
              }}
              style={{ marginTop: 5, width: 120 }}
              options={[
                { value: "pending", label: "PENDING" },
                { value: "confirmed", label: "CONFIRMED" },
                { value: "completed", label: "COMPLETED" },
                { value: "cancelled", label: "CANCELLED" },
              ]}
            />
          </>
        );
      },
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        let color =
          status === "completed"
            ? "green"
            : status === "refunded"
            ? "volcano"
            : "default";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
        pagination={{ pageSize: 3 }}
        style={{
          width: "75%",
          marginTop: "130px",
          marginLeft: "350px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      />
    </Spin>
  );
};

export default RentalOrder;
