import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRentalRoomAction,
  getRentalRoomByIDAction,
} from "redux/actions/RetalRoomAction";
import { UpdateRoomAction } from "redux/actions/BookRoomAction";
import { useNavigate, useParams } from "react-router-dom";

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
function UpdateBookRoom() {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const { id, userId, locationId } = useParams();

  // eslint-disable-next-line no-unused-vars
  const [dateRange, setDateRange] = useState(null);
  const handleChange = (event) => {
    // setSelectedValue(event.target.value);
    setSelectedValue(event);
  };

  const onChanges = (dates, a) => {
    console.log(dates, a);
    setDateRange(dates);
  };

  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Success Update Room Detail",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error Update Room Detail",
    });
  };
  const onFinish = async (values) => {
    console.log(values);
    const data = {
      id: 0,
      maPhong: selectedValue ? selectedValue : locationId,
      ngayDen: dayjs(values.date[0]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      ngayDi: dayjs(values.date[1]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      soLuongKhach: values.soLuongKhach,
      maNguoiDung: values.maNguoiDung,
    };

    try {
      await dispatch(UpdateRoomAction(id, data));
      alert(" update Successfully");
      navigate("/admin");
    } catch (err) {
      error();
    }
  };

  useEffect(() => {
    dispatch(getAllRentalRoomAction());
    dispatch(getRentalRoomByIDAction(locationId));
    dispatch(getRoomByIDAction(id));
  }, [dispatch, id, userId, locationId]);
  const allRoom = useSelector((state) => state.RoomReducers.getAllRenderRoom);
  const RoomidDefalt = useSelector(
    (state) => state.RoomReducers.getRenderRoomrByID
  );

  const UserIdDefault = useSelector(
    (state) => state.AdminUserReducers.getUserByID
  );

  const daypickerDefalut = useSelector(
    (state) => state.BookRoomReducer.getRoomByID
  );
  console.log(daypickerDefalut);

  return (
    daypickerDefalut?.id &&
    RoomidDefalt?.tenPhong && (
      <div>
        <div className="container">
          {contextHolder}
          <h1 className="text-center mr-40"> Update Booking Room</h1>
          <div>
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
                {/* Name */}
                <Form.Item
                  initialValue={daypickerDefalut?.maNguoiDung}
                  name="maNguoiDung"
                  label="UserID"
                  // tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: "Please input choose User!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                {/* email */}
                <Form.Item
                  initialValue={[
                    dayjs(daypickerDefalut?.ngayDen, "YYYY-MM-DD"),
                    dayjs(daypickerDefalut?.ngayDi, "YYYY-MM-DD"),
                  ]}
                  name="date"
                  label="Start Day -End Day"
                  rules={[
                    {
                      required: true,
                      message: "Please choose days",
                    },
                  ]}
                >
                  <RangePicker format={"YYYY-MM-DD"} onChange={onChanges} />
                </Form.Item>

                {/* loai nguoi dung */}
                <Form.Item
                  initialValue={RoomidDefalt?.tenPhong}
                  name="maPhong"
                  label="Room Name"
                  placeholder="select room"
                  rules={[
                    {
                      required: true,
                      message: "Please select room!",
                    },
                  ]}
                >
                  <Select onChange={handleChange}>
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

                <Form.Item
                  shouldUpdate
                  className="w-1/10 mx-auto"
                  {...tailFormItemLayout}
                >
                  {() => (
                    <Button type="primary" htmlType="submit">
                      Update Booking Room
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default UpdateBookRoom;
