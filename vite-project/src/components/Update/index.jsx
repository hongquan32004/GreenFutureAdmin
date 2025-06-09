import React, { useEffect, useState } from "react";
import "./style.scss";
import { Modal, Upload, message, Spin, notification } from "antd";
import { postFormData, put } from "../../utils/axios-http/axios-http";

const { Dragger } = Upload;
const Update = ({ displayModel, hideModal, onSuccessImport }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (displayModel) {
      setFileList([]);
    }
  }, [displayModel]);
  const props = {
    name: "file",
    multiple: false,
    accept: ".xlsx",
    fileList,
    onChange(info) {
      setFileList(info.fileList);
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        await put("cars/update/excel", formData);
        message.success("Update thành công!!!");
        hideModal();
        onSuccess("ok");
        setFileList([]);
        if (onSuccessImport) {
          onSuccessImport(); // Gọi lại fetchData
        }
      } catch (error) {
        message.error("Update thất bại!!!");
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
        footer={null}
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

export default Update;
