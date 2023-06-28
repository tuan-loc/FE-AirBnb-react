import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RegisterAction } from "redux/actions/AuthAction";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit } = useForm();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Success Regiter User",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error Regiter User",
    });
  };

  const onSubmit = async (value) => {
    console.log(value);
    const data = {
      id: 0,
      name: value.name,
      email: value.email,
      password: value.password,
      phone: value.phone,
      birthday: value.birthday,
      gender: value.gender,
      role: "USER",
    };
    try {
      await dispatch(RegisterAction(data));
      success();
      navigate("/login");
    } catch (err) {
      error();
    }
  };
  return (
    <div>
      <div
        className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent"
        style={{
          backgroundImage: `url("https://demo4.cybersoft.edu.vn/static/media/logo_login.a444f2681cc7b623ead2.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full p-5">
          {contextHolder}
          <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 border rounded-lg shadow-lg bg-white px-10 py-5 w-4/5 sm:w-2/3 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-4">
                <div className="mb-2 md:absolute top-0 left-0">
                  <NavLink to={""} className="lg:absolute top-0 left-0">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png?20140813142239"
                      alt=""
                      width={102}
                      height={32}
                    />
                  </NavLink>
                </div>
                <div className="hidden md:block text-center font-semibold text-3xl text-blue-800">
                  <h1>Đăng ký tài khoản</h1>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 gap-x-4 gap-y-1">
                {/* name */}
                <div className="mb-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Tên Người Dùng
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Điền tên vào đây ..."
                    required
                    {...register("name")}
                  />
                </div>
                {/* email */}
                <div className="mb-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Example@gmail.com"
                    required
                    {...register("email")}
                  />
                </div>
                {/* sdt */}
                <div className="mb-1">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Số Điện Thoại
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0974380625"
                    required
                    pattern="^[0-9\-\+]{9,15}$"
                    {...register("phone")}
                  />
                </div>
                {/* password */}
                <div className="mb-1">
                  <label
                    htmlFor="pasword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="***********"
                    required
                    {...register("password")}
                  />
                </div>
                {/* address */}
                <div className="mb-1">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Địa Chỉ
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Điền địa chỉ vào đây ..."
                    required
                    {...register("address")}
                  />
                </div>
                {/* birthday */}
                <div className="mb-1">
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Ngày Sinh
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="***********"
                    required
                    {...register("birthday")}
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Giới tính
                  </label>
                  <select
                    {...register("gender")}
                    name="gender"
                    id="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </div>
                <div></div>

                <div className="col-span-2 text-center">
                  <button
                    type="submit"
                    className="text-white focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-red-500 hover:bg-red-800 duration-300 w-1/2"
                  >
                    Đăng ký
                  </button>
                </div>
                <NavLink
                  to={"/login"}
                  className="col-span-2 text-center text-rose-600 hover:text-rose-500 hover:underline underline-offset-4 tracking-wider duration-200"
                >
                  Đăng nhập ngay
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
