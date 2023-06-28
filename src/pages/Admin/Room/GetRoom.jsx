/* eslint-disable no-unused-vars */
import { Checkbox, Form, Input, InputNumber, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getlocationByIDAction } from "redux/actions/LocationAction";
import { getRentalRoomByIDAction } from "redux/actions/RetalRoomAction";

const { TextArea } = Input;

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

function GetRoom() {
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

  const [imageUrl, setImageUrl] = useState();
  const handleChange = () => {};

  const [form] = Form.useForm();

  return (
    getRenderRoomrByID?.id && (
      <div className="container">
        <h1 className="text-center mr-36">Room Details</h1>

        <div className="w-1/4 mx-auto">
          {" "}
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleChange}
            method="GET"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <img
                src={getRenderRoomrByID.hinhAnh}
                alt="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </Upload>
        </div>
        <div>
          <Form
            {...formItemLayout}
            className="col-span-9"
            form={form}
            name="register"
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
            {/* NAME ROOM */}
            <Form.Item
              label="Location"
              name="maViTri"
              initialValue={getLocationById?.tenPhong}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name="maVi"
              initialValue={getLocationById?.tinhThanh}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country"
              name="maViTri"
              initialValue={getLocationById?.quocGia}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  );
}

export default GetRoom;
