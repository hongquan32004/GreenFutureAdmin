import React, { useEffect, useState } from "react";
import "./style.scss";
import { Modal, Upload, message, Spin, notification } from "antd";
import { postFormData } from "../../utils/axios-http/axios-http";

const { Dragger } = Upload;
const Import = ({ displayModel, hideModal, onSuccessImport }) => {
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
        const res = await postFormData("cars/import/excel", formData);
        if (res?.data?.errors && res.data.errors.length > 0) {
          const errorList = res.data.errors
            .map((err) => `Dòng ${err.rowNumber}: ${err.message}`)
            .join("<br/>");

          notification.error({
            message: "Danh sách lỗi import",
            description: (
              <div dangerouslySetInnerHTML={{ __html: errorList }} />
            ),
            duration: 10,
          });
        } else {
          message.success("Import thành công!!!");
        }

        setFileList([]);
        hideModal();
        onSuccess("ok");
        if (onSuccessImport) {
          onSuccessImport();
        }
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
        onCancel={() => {
          hideModal();
          setFileList([]);
        }}
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

export default Import;
