import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  message,
  Card,
} from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { get, put } from "../../utils/axios-http/axios-http";
import "./style.scss";

const { TextArea } = Input;
const UpdateInsurance = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get(`insurance-options/${id}`);
        setData(res?.data || []);
      } catch (err) {
        console.error(err);
        message.error("Không lấy được dữ liệu xe!");
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        createdAt: data.createdAt ? dayjs(data.createdAt) : null,
      });
    }
  }, [data, form]);

  const onFinish = async (values) => {
    const payload = {
      ...values,
      createdAt: values.createdAt ? values.createdAt.toISOString() : null,
    };
    try {
      await put(`insurance-options/${id}`, payload);
      message.success("Cập nhật thành công!!!");
      navigate("/insurance");
    } catch (error) {
      console.error(error);
      message.error("Cập nhật thất bại!!!");
    }
  };
  return (
    <div
      style={{
        width: "75%",
        marginTop: "80px",
        marginLeft: "350px",
      }}
    >
      <Card
        title="Cập nhật gói bảo hiểm"
        bordered={false}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          height: "750px",
        }}
        headStyle={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: "16px",
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên gói bảo hiểm"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên gói bảo hiểm" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <TextArea rows={3} placeholder="Nhập mô tả chi tiết" />
          </Form.Item>

          <Form.Item
            name="dailyRate"
            label="Giá thuê theo ngày (VND)"
            rules={[{ required: true, message: "Vui lòng nhập đơn giá!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1000}
              step={1000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              placeholder="Nhập giá thuê"
            />
          </Form.Item>

          <Form.Item
            name="coverageDetails"
            label="Chi tiết bồi thường"
            rules={[{ required: true, message: "Vui lòng nhập chi tiết!" }]}
          >
            <Input placeholder="Nhập chi tiết bồi thường" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select
              placeholder="Chọn trạng thái"
              options={[
                { value: "active", label: "ACTIVE" },
                { value: "inactive", label: "INACTIVE" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="createdAt"
            label="Ngày tạo"
            rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
          >
            <DatePicker
              showTime
              style={{ width: "100%" }}
              placeholder="Chọn ngày tạo"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: "40px", fontWeight: "bold" }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateInsurance;
