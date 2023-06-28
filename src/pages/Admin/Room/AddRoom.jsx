import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
} from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PostRentalRoomAction } from "redux/actions/RetalRoomAction";

const { TextArea } = Input;
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

function AddRoom() {
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
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success add Room",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error add Room",
    });
  };
  const onFinish = async (values) => {
    console.log(values);
    const data = {
      id: 0,
      tenPhong: values.tenPhong,
      khach: values.khach,
      phongNgu: values.ngu,
      giuong: values.giuong,
      phongTam: values.phongTam,
      moTa: values.moTa,
      giaTien: values.giaTien,
      mayGiat: values.mayGiat,
      banLa: values.banLa,
      tivi: values.tivi,
      dieuHoa: values.dieuHoa,
      wifi: values.wifi,
      bep: values.bep,
      doXe: values.doXe,
      hoBoi: values.hoBoi,
      banUi: values.banUi,
      maViTri: values.maViTri,
      hinhAnh: imageUrl,
    };
    console.log(data);
    try {
      await dispatch(PostRentalRoomAction(data));
      success();
    } catch (err) {
      error();
    }
  };

  return (
    <div className="container">
      {contextHolder}
      <h1 className="text-center mr-36"> Add Room</h1>
      <div>
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
          {/* NAME ROOM */}
          <Form.Item label="Name Room" name="tenPhong">
            <Input />
          </Form.Item>
          {/* Living ROOM */}{" "}
          <div className="grid grid-cols-2 ml-28">
            <Form.Item label="Living Room" name="khach">
              <InputNumber />
            </Form.Item>
            {/* Bed ROOM */}

            <Form.Item label="Bed Room" name="ngu">
              <InputNumber />
            </Form.Item>
            {/* Bed  */}
            <Form.Item label="Bathroom" name="giuong">
              <InputNumber />
            </Form.Item>

            {/* Bed  */}
            <Form.Item label="Bed " name="phongTam">
              <InputNumber />
            </Form.Item>
          </div>
          {/* Description */}
          <Form.Item label="Description" name="moTa">
            <TextArea rows={4} />
          </Form.Item>
          {/* Price */}
          <Form.Item label="Price" name="giaTien">
            <Input />
          </Form.Item>
          <div className="grid grid-cols-3 justify-items-start w-8/12 ml-auto">
            {/* Washing machine */}
            <Form.Item
              name="mayGiat"
              initialValue={true}
              valuePropName="checked"
            >
              <Checkbox>Washing machine</Checkbox>
            </Form.Item>
            {/* iron*/}
            <Form.Item name="banLa" initialValue={true} valuePropName="checked">
              <Checkbox>Iron</Checkbox>
            </Form.Item>
            {/* television */}
            <Form.Item name="tivi" initialValue={true} valuePropName="checked">
              <Checkbox>Television</Checkbox>
            </Form.Item>
            {/* Air condition */}
            {/* Washing machine */}
            <Form.Item
              name="dieuHoa"
              initialValue={true}
              valuePropName="checked"
            >
              <Checkbox>Air condition </Checkbox>
            </Form.Item>
            <Form.Item name="wifi" initialValue={true} valuePropName="checked">
              <Checkbox>Wifi</Checkbox>
            </Form.Item>
            {/* kitchen*/}
            <Form.Item name="bep" initialValue={true} valuePropName="checked">
              <Checkbox>Kitchen</Checkbox>
            </Form.Item>
            {/* Parking*/}
            <Form.Item name="doXe" initialValue={true} valuePropName="checked">
              <Checkbox>Parking</Checkbox>
            </Form.Item>
            {/* Pool */}
            <Form.Item name="hoBoi" initialValue={true} valuePropName="checked">
              <Checkbox>Pool</Checkbox>
            </Form.Item>
            {/* Washing machine */}
            <Form.Item name="banUi" initialValue={true} valuePropName="checked">
              <Checkbox>irons</Checkbox>
            </Form.Item>
          </div>
          {/* NAME ROOM */}
          <Form.Item label="Location ID" name="maViTri">
            <Input />
          </Form.Item>
          <Form.Item label="Upload" valuePropName="fileList">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              method="GET"
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
          </Form.Item>
          <Form.Item label="Action">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddRoom;
