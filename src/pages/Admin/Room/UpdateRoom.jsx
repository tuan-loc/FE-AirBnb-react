import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getlocationByIDAction } from "redux/actions/LocationAction";
import {
  getRentalRoomByIDAction,
  UpdateRentalRoomAction,
} from "redux/actions/RetalRoomAction";

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

function UpdateRoom() {
  const [, forceUpdate] = useState({});
  const dispatch = useDispatch();
  const { id, Lid } = useParams();

  const { getRenderRoomrByID } = useSelector((state) => state.RoomReducers);
  console.log(getRenderRoomrByID);
  useEffect(() => {
    forceUpdate({});
    dispatch(getRentalRoomByIDAction(id));
    dispatch(getlocationByIDAction(Lid));
  }, [dispatch, id, Lid]);
  const { getLocationById } = useSelector((state) => state.LocationReducer);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success Update Room",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error Update Room",
    });
  };
  const onFinish = async (values) => {
    console.log(values);
    const data = {
      id: id,
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
      await dispatch(UpdateRentalRoomAction(id, data));
      success();
    } catch (err) {
      error();
    }
  };
  const onchangeLocation = (e) => {
    dispatch({ type: "DELETE_LOCATION" });
    dispatch(getlocationByIDAction(e.target.value));
  };
  console.log(getLocationById);
  return (
    getRenderRoomrByID?.id && (
      <div className="container">
        {contextHolder}
        <h1 className="text-center mr-36"> UpDate Room</h1>
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
            <Form.Item
              label="Name Room"
              name="tenPhong"
              initialValue={getRenderRoomrByID.tenPhong}
            >
              <Input />
            </Form.Item>
            {/* Living ROOM */}{" "}
            <div className="grid grid-cols-2 ml-28">
              <Form.Item
                label="Living Room"
                name="khach"
                initialValue={getRenderRoomrByID.khach}
              >
                <InputNumber />
              </Form.Item>
              {/* Bed ROOM */}

              <Form.Item
                label="Bed Room"
                name="ngu"
                initialValue={getRenderRoomrByID.phongNgu}
              >
                <InputNumber />
              </Form.Item>
              {/* Bed  */}
              <Form.Item
                label="Bathroom"
                name="phongTam"
                initialValue={getRenderRoomrByID.giuong}
              >
                <InputNumber />
              </Form.Item>

              {/* Bed  */}
              <Form.Item
                label="Bed "
                name="giuong"
                initialValue={getRenderRoomrByID.giuong}
              >
                <InputNumber />
              </Form.Item>
            </div>
            {/* Description */}
            <Form.Item
              label="Description"
              name="moTa"
              initialValue={getRenderRoomrByID.moTa}
            >
              <TextArea rows={4} />
            </Form.Item>
            {/* Price */}
            <Form.Item
              label="Price"
              name="giaTien"
              initialValue={getRenderRoomrByID.giaTien}
            >
              <Input />
            </Form.Item>
            <div className="grid grid-cols-3 justify-items-start w-8/12 ml-auto">
              {/* Washing machine */}
              <Form.Item
                name="mayGiat"
                valuePropName="checked"
                initialValue={getRenderRoomrByID.mayGiat}
              >
                <Checkbox>Washing machine</Checkbox>
              </Form.Item>
              {/* iron*/}
              <Form.Item
                name="banLa"
                initialValue={getRenderRoomrByID.banLa}
                valuePropName="checked"
              >
                <Checkbox>Iron</Checkbox>
              </Form.Item>
              {/* television */}
              <Form.Item
                name="tivi"
                initialValue={getRenderRoomrByID.tivi}
                valuePropName="checked"
              >
                <Checkbox>Television</Checkbox>
              </Form.Item>
              {/* Air condition */}
              {/* Washing machine */}
              <Form.Item
                name="dieuHoa"
                initialValue={getRenderRoomrByID.dieuHoa}
                valuePropName="checked"
              >
                <Checkbox>Air condition </Checkbox>
              </Form.Item>
              <Form.Item
                name="wifi"
                initialValue={getRenderRoomrByID.wifi}
                valuePropName="checked"
              >
                <Checkbox>Wifi</Checkbox>
              </Form.Item>
              {/* kitchen*/}
              <Form.Item
                name="bep"
                initialValue={getRenderRoomrByID.bep}
                valuePropName="checked"
              >
                <Checkbox>Kitchen</Checkbox>
              </Form.Item>
              {/* Parking*/}
              <Form.Item
                name="doXe"
                initialValue={getRenderRoomrByID.doXe}
                valuePropName="checked"
              >
                <Checkbox>Parking</Checkbox>
              </Form.Item>
              {/* Pool */}
              <Form.Item
                name="hoBoi"
                initialValue={getRenderRoomrByID.hoBoi}
                valuePropName="checked"
              >
                <Checkbox>Pool</Checkbox>
              </Form.Item>
              {/* Washing machine */}
              <Form.Item
                name="banUi"
                initialValue={getRenderRoomrByID.banUi}
                valuePropName="checked"
              >
                <Checkbox>irons</Checkbox>
              </Form.Item>
            </div>
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
                  <img
                    src={getRenderRoomrByID.hinhAnh}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                )}
              </Upload>
            </Form.Item>
            {/* NAME ROOM */}
            <Form.Item
              label="Location ID"
              name="maViTri"
              initialValue={getRenderRoomrByID.maViTri}
              onChange={onchangeLocation}
            >
              <Input />
            </Form.Item>
            <div className="w-8/12 mx-auto mt-5">
              {" "}
              LocationName: <span>{getLocationById?.tenViTri}</span>
            </div>
            <div className="w-8/12 mx-auto mt-5">
              {" "}
              City <span className="ml-16">:{getLocationById?.tinhThanh}</span>
            </div>
            <div className="w-8/12 mx-auto mt-5 mb-5">
              {" "}
              Country{" "}
              <span className="ml-10 ">:{getLocationById?.quocGia}</span>
            </div>
            <Form.Item label="Action">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  );
}

export default UpdateRoom;
