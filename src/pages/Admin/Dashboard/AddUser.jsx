/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { PostAdminUserAction } from "redux/actions/AdminUserAction";
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
function AddUser() {
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
      name: values.name,
      email: values.email,
      phone: values.phone,
      birthday: dayjs(values.birthday).format("DD/MM/YYYY"),
      gender: values.gender,
      role: values.typeUser,
      password: values.password,
    };

    console.log(data);
    try {
      await dispatch(PostAdminUserAction(data));
      success();
    } catch (err) {
      error();
    }
  };

  const onChange = (date, dateString) => {};
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
                name="name"
                label="Name"
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
              {/* password */}
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              {/* confirm password */}
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Date of birth"
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Please choose Date of birth!",
                  },
                ]}
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
                initialValue=""
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              {/* loai nguoi dung */}
              <Form.Item
                initialValue=""
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
                initialValue=""
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
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  {" "}
                  I have read the <a href="#">agreement</a>
                </Checkbox>
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
                      !form.isFieldTouched("birthday") ||
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
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

export default AddUser;
