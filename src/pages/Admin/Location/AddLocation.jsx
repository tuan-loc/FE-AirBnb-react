import { Button, Form, Input, message, Upload } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { PostlocationAction } from "redux/actions/LocationAction";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
function AddLocation() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success add Location",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error add Location",
    });
  };
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const data = {
      id: 0,
      tenViTri: values.tenViTri,
      tinhThanh: values.tinhThanh,
      quocGia: values.tenViTri,
      hinhAnh: imageUrl,
    };
    try {
      dispatch(PostlocationAction(data));
      success();
    } catch (err) {
      error();
    }
  };

  return (
    <div>
      <div className="container">
        {contextHolder}
        <h1 className="text-center mr-36"> Add Location</h1>
        <div>
          <div className="w-3/12 mx-auto">
            {" "}
            <Upload
              method="GET"
              name="avatar"
              listType="picture-card"
              className="avatar-uploader  "
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div>
            {" "}
            <Form
              {...formItemLayout}
              className="col-span-9"
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "84",
              }}
              style={{
                maxWidth: 600,
              }}
              scrollToFirstError
            >
              {/* NameLocation */}
              <Form.Item
                name="tenViTri"
                label="Name Location"
                initialValue=""
                // tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name Location!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* Country */}
              <Form.Item
                initialValue=""
                name="quocGia"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Please input your Country!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* City */}
              <Form.Item
                name="tinhThanh"
                label="City"
                rules={[
                  {
                    required: true,
                    message: "Please input your City!",
                  },
                ]}
                initialValue=""
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>{" "}
              <Form.Item
                shouldUpdate
                className="w-1/10 mx-auto"
                {...tailFormItemLayout}
              >
                {() => (
                  <Button type="primary" htmlType="submit">
                    ADD Location
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLocation;
