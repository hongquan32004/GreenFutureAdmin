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
import { post } from "../../utils/axios-http/axios-http";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const AddInsurance = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await post("insurance-options", values);
      message.success("Thêm mới thành công!!!!");
      form.resetFields();
      navigate("/insurance");
    } catch (error) {
      console.error(error);
      message.error("Thêm mới thất bại!!!!");
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
          height: "650px",
        }}
        headStyle={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: "16px",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: "active",
          }}
        >
          <Form.Item
            name="name"
            label="Tên gói bảo hiểm"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <TextArea rows={3} />
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
            />
          </Form.Item>

          <Form.Item
            name="coverageDetails"
            label="Chi tiết bồi thường"
            rules={[{ required: true, message: "Vui lòng nhập chi tiết!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "active", label: "ACTIVE" },
                { value: "inactive", label: "INACTIVE" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddInsurance;
