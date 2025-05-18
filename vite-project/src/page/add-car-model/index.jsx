import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  message,
  Card,
  Row,
  Col,
  Select,
} from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddCarModel = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      return message.error("Vui lòng chọn ít nhất một hình ảnh.");
    }

    if (values.primaryImageIndex >= fileList.length) {
      return message.error(
        "Chỉ số ảnh đại diện vượt quá số lượng ảnh đã chọn."
      );
    }

    const formData = new FormData();
    const fields = [
      "name",
      "modelCode",
      "vehicleType",
      "basePricePerDay",
      "basePricePerWeek",
      "basePricePerMonth",
      "basePricePerYear",
      "primaryImageIndex",
    ];

    fields.forEach((field) => {
      formData.append(field, values[field]?.toString() || "");
    });

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${import.meta.env.VITE_APP_URL_BE}/car-models`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Tạo model xe thành công!");
      form.resetFields();
      setFileList([]);
      navigate("/car");
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.message || "Tạo thất bại!");
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
        title="Thêm mẫu xe"
        bordered={false}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          height: "680px",
        }}
        headStyle={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: "16px",
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên xe"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mã Model"
                name="modelCode"
                rules={[{ required: true }]}
              >
                <Input />
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
                label="Giá theo ngày"
                name="basePricePerDay"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá theo tuần"
                name="basePricePerWeek"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá theo tháng"
                name="basePricePerMonth"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá theo năm"
                name="basePricePerYear"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ảnh đại diện (index)"
                name="primaryImageIndex"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Ảnh xe" required>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false} // để không upload tự động
              multiple
            >
              {fileList.length >= 8 ? null : (
                <div>
                  {/* <PlusOutlined /> */}
                  <div style={{ marginTop: 8 }}>Tải ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo Model Xe
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddCarModel;
