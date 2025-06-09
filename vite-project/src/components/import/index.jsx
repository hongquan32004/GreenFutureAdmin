import React, { useState } from "react";
import "./style.scss";
import { Modal, Upload, message, Spin, notification } from "antd";
import { postFormData } from "../../utils/axios-http/axios-http";

const { Dragger } = Upload;
const Import = ({ displayModel, hideModal }) => {
  const [loading, setLoading] = useState(false);

  const props = {
    name: "file",
    multiple: false,
    accept: ".xlsx",
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        await postFormData("cars/import/excel", formData);
        message.success("Import thành công!!!");
        hideModal();
        onSuccess("ok");
      } catch (error) {
        message.error("Import thất bại!!!");
        onError(error);
      } finally {
        setLoading(false);
      }
    },
  };
  return (
    <div>
      <Modal
        title={"THÊM DANH SÁCH XE"}
        style={{ textAlign: "center" }}
        okText="Chọn"
        open={displayModel}
        onClose={hideModal}
        onCancel={hideModal}
      >
        <Spin spinning={loading}>
          <Dragger
            {...props}
            className="custom-dragger"
            style={{ padding: "20px", border: "2px dashed #f58220" }}
          >
            <p className="ant-upload-drag-icon"></p>
            <p className="ant-upload-text">Upload</p>
            <p className="ant-upload-hint">Định dạng file: xls, xlsx</p>
          </Dragger>
        </Spin>
      </Modal>
    </div>
  );
};

export default Import;
