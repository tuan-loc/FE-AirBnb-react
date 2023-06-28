import { Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getlocationByIDAction } from "redux/actions/LocationAction";
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

function GetLocation() {
  const [, forceUpdate] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    forceUpdate({});
    dispatch(getlocationByIDAction(id));
  }, [dispatch, id]);
  const { getLocationById } = useSelector((state) => state.LocationReducer);
  console.log(getLocationById);

  return (
    getLocationById?.id && (
      <div>
        <div className="container">
          <h1 className="text-center mr-36"> Get Location</h1>
          <div>
            <div className="w-3/12 mx-auto">
              {" "}
              <Upload
                method="GET"
                name="avatar"
                listType="picture-card"
                className="avatar-uploader  "
                showUploadList={false}
              >
                <img
                  src={getLocationById.hinhAnh}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              </Upload>
            </div>
            <div>
              {" "}
              <Form
                {...formItemLayout}
                className="col-span-9"
                name="register"
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
                  initialValue={getLocationById.tenViTri}
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
                  initialValue={getLocationById.quocGia}
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
                  initialValue={getLocationById.tinhThanh}
                  name="tinhThanh"
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: "Please input your City!",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>{" "}
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default GetLocation;
