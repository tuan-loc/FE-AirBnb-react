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
import { getAllRentalRoomAction } from "redux/actions/RetalRoomAction";
import { PostRoomAction } from "redux/actions/BookRoomAction";

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
function AddBookRoom() {
  const [dateRange, setDateRange] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const onChanges = (dates) => {
    setDateRange(dates);
  };
  const onchangeSelect = (event) => {
    setSelectedValue(event);
  };
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Success Register",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error Register",
    });
  };
  const onFinish = async (values) => {
    const data = {
      id: 0,
      maPhong: selectedValue,
      ngayDen: dayjs(dateRange[0]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      ngayDi: dayjs(dateRange[1]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      soLuongKhach: values.soLuongKhach,
      maNguoiDung: values.maNguoiDung,
    };

    console.log(data);
    try {
      await dispatch(PostRoomAction(data));
      success();
    } catch (err) {
      error();
    }
  };

  useEffect(() => {
    dispatch(getAllRentalRoomAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const allRoom = useSelector((state) => state.RoomReducers.getAllRenderRoom);

  return (
    <div>
      <div className="container">
        {contextHolder}
        <h1 className="text-center mr-40"> Register User</h1>
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
                name="maNguoiDung"
                label="UserID"
                initialValue=""
                // tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* email */}
              <Form.Item
                initialValue=""
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
                initialValue=""
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
                <Select onChange={onchangeSelect}>
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
                initialValue=""
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
                    Register
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

export default AddBookRoom;
