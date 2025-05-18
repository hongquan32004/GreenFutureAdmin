import React, { useState } from "react";
import { useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  message,
  Card,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { put } from "../../utils/axios-http/axios-http";

const UpdateCarModel = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_URL_BE_PUBLIC}/car-models/${id}`
        );
        setData(res.data?.data || []);
      } catch (err) {
        console.error(err);
        message.error("Không lấy được dữ liệu xe!");
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onFinish = async (values) => {
    try {
      await put(`car-models/update/${id}`, values);
      message.success("Cập nhật thành công!!!");
      navigate("/car");
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
        title="Cập nhật mẫu xe"
        bordered={false}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          height: "1070px",
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
          initialValues={data}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên xe"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="modelCode"
                label="Mã Model"
                rules={[
                  { required: true },
                  {
                    pattern: /^[A-Z0-9-]+$/,
                    message: "Chỉ nhập chữ in hoa, số và dấu gạch ngang (-)",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    const value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9-]/g, "");
                    form.setFieldValue("modelCode", value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="vehicleType"
                label="Loại xe"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="sedan">Sedan</Option>
                  <Option value="suv">SUV</Option>
                  <Option value="hatchback">Hatchback</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="available">Available</Option>
                  <Option value="coming_soon">Coming Soon</Option>
                  <Option value="rented">Rented</Option>
                  <Option value="maintenance">Maintenance</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="batteryCapacity" label="Dung lượng pin">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="rangePerCharge" label="Quãng đường / sạc">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="maxSpeed" label="Tốc độ tối đa">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="chargingTime" label="Thời gian sạc">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="motorPower" label="Công suất motor">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="acceleration" label="Tăng tốc">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="basePricePerDay" label="Giá ngày (VND)">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="basePricePerWeek" label="Giá tuần (VND)">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="basePricePerMonth" label="Giá tháng (VND)">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="basePricePerYear" label="Giá năm (VND)">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="trunkCapacity" label="Dung tích cốp">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="chargingPortType" label="Cổng sạc">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="lengthWidthHeight"
                label="Kích thước (D x R x C)"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="wheelbase" label="Chiều dài cơ sở">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="tireSize" label="Kích cỡ lốp">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="seatingCapacity" label="Kích cỡ xe">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item> 

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật xe
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateCarModel;
