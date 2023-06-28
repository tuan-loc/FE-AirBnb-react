import React, { useEffect } from "react";
import { DatePicker, Form, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRentalRoomAction,
  getRentalRoomByIDAction,
} from "redux/actions/RetalRoomAction";

import { useParams } from "react-router-dom";
import {
  getAllAdminUserAction,
  getAdminUserByIDAction,
} from "redux/actions/AdminUserAction";
import { getRoomByIDAction } from "redux/actions/BookRoomAction";
const { Option } = Select;
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

function GetBookRoom() {
  const { id, userId, locationId } = useParams();

  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRentalRoomAction());
    dispatch(getAllAdminUserAction());
    dispatch(getRentalRoomByIDAction(locationId));
    dispatch(getAdminUserByIDAction(userId));
    dispatch(getRoomByIDAction(id));
  }, [dispatch, id, userId, locationId]);
  const allRoom = useSelector((state) => state.RoomReducers.getAllRenderRoom);
  const RoomidDefalt = useSelector(
    (state) => state.RoomReducers.getRenderRoomrByID
  );

  const UserIdDefault = useSelector(
    (state) => state.AdminUserReducers.getUserByID
  );
  const allUser = useSelector((state) => state.AdminUserReducers.getAllUser);

  const daypickerDefalut = useSelector(
    (state) => state.BookRoomReducer.getRoomByID
  );
  console.log(daypickerDefalut);

  return (
    daypickerDefalut?.id &&
    RoomidDefalt?.tenPhong && (
      <div>
        <div className="container">
          <h1 className="text-center mr-40"> Booking Room Detail</h1>
          <div>
            <div>
              {" "}
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
                {/* Name */}
                <Form.Item
                  name="maNguoiDung"
                  label="UserID"
                  initialValue={
                    UserIdDefault?.name ? UserIdDefault.name : userId
                  }
                  // tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: "Please input choose User!",
                    },
                  ]}
                >
                  <Select>
                    {allUser?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {/* email */}
                <Form.Item
                  initialValue={[
                    dayjs(daypickerDefalut?.ngayDen, "YYYY-MM-DD"),
                    dayjs(daypickerDefalut?.ngayDi, "YYYY-MM-DD"),
                  ]}
                  name="email"
                  label="Start Day -End Day"
                  rules={[
                    {
                      required: true,
                      message: "Please choose days",
                    },
                  ]}
                >
                  <RangePicker format={"YYYY-MM-DD"} />
                </Form.Item>

                {/* loai nguoi dung */}
                <Form.Item
                  initialValue={RoomidDefalt?.tenPhong}
                  name="typeUser"
                  label="Room Name"
                  placeholder="select room"
                  rules={[
                    {
                      required: true,
                      message: "Please select room!",
                    },
                  ]}
                >
                  <Select>
                    {allRoom?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.tenPhong}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="soLuongKhach"
                  label="Customers number"
                  initialValue={daypickerDefalut?.soLuongKhach}
                  // tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: "Please input Customers number!",
                    },
                    {
                      pattern: /^\d+$/,
                      message: "The field must only contain digits.",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default GetBookRoom;
