import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAdminUserByIDAction,
  UpdateAdminUserAction,
} from "redux/actions/AdminUserAction";
import dayjs from "dayjs";
import { Avatar } from "antd";

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
function UpdateUser() {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success update",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error update",
    });
  };

  useEffect(() => {
    forceUpdate({});
    dispatch(getAdminUserByIDAction(id));
  }, [dispatch, id]);

  const { getUserByID } = useSelector((state) => state.AdminUserReducers);
  console.log(getUserByID);
  const onFinish = async (values) => {
    const data = {
      id: id,
      name: values.name,
      email: values.email,
      phone: values.phone,
      birthday: dayjs(values.birthday).format("DD/MM/YYYY"),
      gender: values.gender,
      role: values.typeUser,
    };
    try {
      await dispatch(UpdateAdminUserAction(id, data));
      success();
    } catch (err) {
      error();
    }

    console.log(data);
  };

  const onChange = (date, dateString) => {};
  return (
    getUserByID?.id && (
      <div>
        {" "}
        {contextHolder}
        <div className="container">
          <h1 className="text-center mr-40">UpDate User</h1>
          <div>
            <div className="w-1/4 mx-auto mb-4">
              <Avatar
                size={{
                  xs: 24,
                  sm: 32,
                  md: 40,
                  lg: 64,
                  xl: 80,
                  xxl: 100,
                }}
                src={getUserByID.avatar}
              />
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
                {/* Name */}
                <Form.Item
                  name="name"
                  label="Name"
                  initialValue={getUserByID.name}
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
                  initialValue={getUserByID.email}
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Date of birth"
                  name="birthday"
                  initialValue={dayjs(`${getUserByID.birthday}`, "DD/MM/YYYY")}
                >
                  <DatePicker onChange={onChange} format={"DD/MM/YYYY"} />
                </Form.Item>

                {/* phone Number */}
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                  initialValue={getUserByID.phone}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                {/* loai nguoi dung */}
                <Form.Item
                  initialValue={getUserByID.role}
                  name="typeUser"
                  label="Type User"
                  rules={[
                    {
                      required: true,
                      message: "Please select type user!",
                    },
                  ]}
                >
                  <Select placeholder="select type user">
                    <Option value="ADMIN">Admin</Option>
                    <Option value="USER">User</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Gender"
                  initialValue={getUserByID.gender}
                  rules={[
                    {
                      required: true,
                      message: "Please select gender!",
                    },
                  ]}
                >
                  <Select placeholder="select your gender">
                    <Option value={true}>Male</Option>
                    <Option value={false}>Female</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>Corfirm Update User</Checkbox>
                </Form.Item>

                <Form.Item
                  shouldUpdate
                  className="w-1/10 mx-auto"
                  {...tailFormItemLayout}
                >
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        (!form.isFieldTouched("FullName") &&
                          !form.isFieldTouched("typeUser") &&
                          !form.isFieldTouched("phone") &&
                          !form.isFieldTouched("password") &&
                          !form.isFieldTouched("email")) ||
                        !form.isFieldTouched("agreement") ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                    >
                      Update
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

export default UpdateUser;
