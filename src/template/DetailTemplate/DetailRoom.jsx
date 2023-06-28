/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DetailRoom.module.css";

import {
  Button,
  Col,
  Row,
  Input,
  DatePicker,
  Form,
  Modal,
  Avatar,
  Space,
  Rate,
  message,
} from "antd";

import {
  AntDesignOutlined,
  CalendarOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  CarOutlined,
  DoubleRightOutlined,
  HeatMapOutlined,
  RightOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AiOutlineFileDone,
  AiOutlineDotChart,
  AiOutlineYoutube,
  AiOutlineWifi,
  AiOutlineFire,
  AiOutlineCar,
  AiOutlineBorderOuter,
} from "react-icons/ai";
import { getRentalRoomByIDAction } from "redux/actions/RetalRoomAction";

import { PostRoomAction } from "redux/actions/BookRoomAction";
import { PostCommentAction } from "redux/actions/CommentsAction";

import dayjs from "dayjs";
import { getCommentByRoomAction } from "redux/actions/CommentsAction";

const { TextArea } = Input;

const { RangePicker } = DatePicker;

// Detail Room
function DetailRoom({ paramsId }) {
  const dispatch = useDispatch();

  console.log(paramsId);
  const detailRoom = useSelector(
    (state) => state.RoomReducers.getRenderRoomrByID
  );
  const comment = useSelector(
    (state) => state.CommentsReducer.getCommentsWithroom
  );
  const user = useSelector((state) => state.Auth.userInformation);

  useEffect(() => {
    dispatch(getRentalRoomByIDAction(paramsId));
    dispatch(getCommentByRoomAction(paramsId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsId]);

  // date
  const [dateRange, setDateRange] = useState(null);

  const onChanges = (dates, dateStrings) => {
    setDateRange(dateStrings);
  };

  // celender
  let days = 0;
  if (dateRange) {
    const start = dayjs(dateRange[0]);
    const end = dayjs(dateRange[1]);
    days = end.diff(start, "day");
  }

  // số lượng khách
  const [num, setNum] = useState(1);
  const incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  const decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };
  const handleChange = (e) => {
    setNum(e.target.value);
  };

  // post data
  const postData = async () => {
    if (user?.id) {
      const data = {
        id: 0,
        maPhong: paramsId,
        ngayDen: dateRange && dateRange[0],
        ngayDi: dateRange && dateRange[1],
        soLuongKhach: num,
        maNguoiDung: user?.id,
      };
      try {
        await dispatch(PostRoomAction(data));
        console.log(data);
        message.success("Đặt phòng thành công!");
      } catch (err) {
        message.error("Vui lòng chọn ngày");
      }
    } else {
      message.error("Vui lòng đăng nhập");
    }
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // form comment
  const [form] = Form.useForm();
  const commentValue = Form.useWatch("comment", form);

  // post comment
  const postComment = async () => {
    const data = {
      id: 0,
      maPhong: paramsId,
      maNguoiBinhLuan: user?.id,
      ngayBinhLuan: dayjs().format("DD/MM/YYYY"),
      noiDung: commentValue,
      saoBinhLuan: 0,
    };
    try {
      await dispatch(PostCommentAction(data));
      message.success("Bình luận thành công!");
      console.log(data);
    } catch (err) {
      // message.error("Bình luận không được để trống");
    }
  };

  // show chi tiết
  const [isShow, setIsShow] = useState(false);

  const handleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="container m-auto">
      <h1 className="mt-6 py-2 lg:text-3xl sm:text-xl font-bold">
        {detailRoom?.tenPhong}
      </h1>
      <img
        className="w-full mb-4 rounded-2xl"
        src={detailRoom?.hinhAnh}
        alt=""
      />
      <div className="lg:flex sm:inline-block">
        <div className="lg:pr-24 lg:w-2/3 sm:pr-5">
          <div className="py-5 border-solid border-rose-300 border-0 border-b-2">
            <Row>
              <Col span={20}>
                <h2 className="font-bold lg:text-2xl sm:text-lg m-0">
                  Toàn bộ căn hộ. Chủ nhà Sungwon
                </h2>
                <p className="lg:text-lg sm:text-base m-0">
                  {detailRoom?.khach} phòng khách. {detailRoom?.phongNgu} phòng
                  ngủ. {detailRoom?.phongTam} phòng tắm
                </p>
              </Col>
              <Col span={4}>
                <Avatar size={64} icon={<UserOutlined src={user?.avatar} />} />
              </Col>
            </Row>
          </div>
          <div className="text-lg py-9 border-solid border-rose-300 border-0 border-b-2">
            <div className="flex py-5">
              <AntDesignOutlined className="text-3xl pr-4 font" />
              <div>
                <p className="font-bold mb-0"> Người thiết kế là: </p>
                <span className="text-base text-gray-600">
                  James Atkinson & David McCormick, M-System Orchid House
                </span>
              </div>
            </div>
            <div className="flex pb-5">
              <UserOutlined className="text-3xl pr-4" />
              <div>
                <p className="font-bold mb-0">Sungwon là Chủ nhà siêu cấp</p>
                <span className="text-base text-gray-600">
                  {detailRoom?.moTa}
                </span>
              </div>
            </div>
            <div className="flex pb-5">
              <HeatMapOutlined className="text-3xl pr-4" />
              <div>
                <p className="font-bold mb-0">Địa điểm tuyệt vời</p>
                <span className="text-base text-gray-600">
                  90% khách gần đây đã xếp hạng 5 sao cho vị trí này.
                </span>
              </div>
            </div>
            <div className="flex pb-5">
              <CarOutlined className="text-3xl pr-4" />
              <div>
                <p className="font-bold mb-0">Đỗ xe miễn phí</p>
                <span className="text-base text-gray-600">
                  Đây là một trong số ít địa điểm có chỗ đỗ xe miễn phí tại khu
                  vực.
                </span>
              </div>
            </div>
            <div className="flex pb-5">
              <CalendarOutlined className="text-3xl pr-4" />
              <div>
                <p className="font-bold mb-0">Hủy miễn phí trong 48 giờ</p>
              </div>
            </div>
          </div>
          <div className="text-justify text-base py-9 border-solid border-rose-300 border-0 border-b-2">
            <img
              className="w-36 pb-3"
              src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
              alt=""
            />
            <p className="my-3">
              Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà
              hủy, thông tin nhà/phòng cho thuê không chính xác và những vấn đề
              khác như sự cố trong quá trình nhận phòng.
            </p>
            <a
              className="font-semibold text-black underline pb-4"
              onClick={showModal}
            >
              Tìm hểu thêm <DoubleRightOutlined />
            </a>
            {/* Modal */}
            <Modal
              width={1200}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="p-5 text-justify">
                <div className="border-solid border-rose-300 border-0 border-b-2">
                  <img
                    className="w-40"
                    src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
                    alt=""
                  />
                  <p className="py-3 mb-1 text-base">
                    AirCover là chương trình bảo vệ toàn diện, được áp dụng miễn
                    phí với mọi đặt phòng.
                  </p>
                </div>
                <div>
                  <Row>
                    <Col className="pr-4" span={12}>
                      <div className="py-5 text-base">
                        <h4 className="font-bold mb-1">
                          Bảo đảm bảo vệ đặt phòng
                        </h4>
                        <span className="text-gray-600">
                          Trong trường hợp hãn hữu khi Chủ nhà cần hủy đặt phòng
                          của bạn trong vòng 30 ngày trước ngày nhận phòng,
                          chúng tôi sẽ tìm cho bạn một chỗ ở tương tự hoặc tốt
                          hơn, hoặc sẽ hoàn tiền cho bạn.
                        </span>
                      </div>
                      <div className="text-base">
                        <h4 className="font-bold mb-1">
                          Bảo đảm chi phí tương xứng
                        </h4>
                        <span className="text-gray-600">
                          Trong thời gian ở, nếu bạn nhận thấy chỗ ở không đúng
                          như quảng cáo, ví dụ như tủ lạnh ngừng hoạt động và
                          Chủ nhà không thể dễ dàng khắc phục vấn đề này, hoặc
                          số phòng ngủ ít hơn so với thông tin trên mục cho
                          thuê, thì bạn sẽ có 3 ngày để báo cáo vấn đề. Khi đó,
                          chúng tôi sẽ tìm cho bạn một chỗ ở tương tự hoặc tốt
                          hơn, hoặc chúng tôi sẽ hoàn tiền cho bạn.
                        </span>
                      </div>
                    </Col>
                    <Col className="pl-4" span={12}>
                      <div className="py-5 text-base">
                        <h4 className="font-bold mb-1">Bảo đảm nhận phòng</h4>
                        <span className="text-gray-600">
                          Nếu bạn không thể nhận phòng và Chủ nhà không thể giải
                          quyết vấn đề này, chúng tôi sẽ tìm cho bạn một chỗ ở
                          tương tự hoặc tốt hơn có thời gian ở tương đương, hoặc
                          chúng tôi sẽ hoàn tiền cho bạn.
                        </span>
                      </div>
                      <div className="text-base">
                        <h4 className="font-bold mb-1">
                          Đường dây an toàn 24 giờ
                        </h4>
                        <span className="text-gray-600">
                          Nếu cảm thấy không an toàn, bạn sẽ được ưu tiên liên
                          hệ với nhân viên hỗ trợ an toàn được đào tạo đặc biệt
                          của chúng tôi, bất kể ngày đêm.
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Modal>
          </div>
          <div className="text-justify text-base py-9 border-solid border-rose-300 border-0 border-b-2 relative">
            <h2 className="text-xl font-bold">Giới thiệu về chỗ ở này</h2>
            <p>
              Là ngôi nhà độc lập hình vòng cung với 20m2 không gian nội thất
              (phòng ngủ, nhà bếp, phòng tắm) và 40m2 sàn gỗ ở tầng hai. Đây là
              công viên quốc gia, nơi trú ẩn của đom đóm và duy trì môi trường
              tự nhiên tốt nhất để sống bên kia con lạch phía trước. Lý tưởng
              cho nghỉ ngơi gia đình và MT theo nhóm, nhà kính mái vòm cung cấp
              một hội thảo mỗi ngày cho tối đa 30 người.
            </p>
            <div>
              {isShow && (
                <div>
                  <p>
                    <span className="font-bold">Chỗ ở</span> <br /> Một ngôi nhà
                    gỗ có mái vòm với tầng hai, bồn rửa tay, bếp, nhà vệ sinh và
                    phòng tắm bên trong. Bên ngoài, có một boong rộng rãi, và
                    toàn bộ nằm trong vườn hoa, và lúc nào cũng có hoa.
                  </p>
                  <p>
                    <span className="font-bold">
                      Tiện nghi khách có quyền sử dụng
                    </span>{" "}
                    <br></br> Đi bộ, quan sát có hoa và tự phục vụ và ngủ đều
                    nằm trong nhà khách. <br /> Toàn bộ khu vực nhà gỗ và khu
                    vực đỗ xe
                  </p>
                  <p>
                    <span className="font-bold">Những điều cần lưu ý khác</span>
                    <br /> Hoa là những nơi đẹp với hoa và vườn hoa. Chúc bạn
                    tận hưởng những bông hoa, khu vườn và thiên nhiên tươi đẹp
                    một cách trọn vẹn. <br /> Giá cơ bản của biệt thự của chúng
                    tôi chỉ dành cho 5 khách. Mỗi lần thêm 1 người sẽ phải trả
                    75.000 IDR. Nếu khách không đến như đã nêu trên airbnb, họ
                    sẽ bị tính phí khi đến.
                  </p>
                  <img
                    className="w-full mb-9 rounded-2xl"
                    src={detailRoom?.hinhAnh}
                    alt=""
                  />
                </div>
              )}
              <div className="text-center">
                {isShow ? (
                  <button
                    className="px-10 font-semibold text-lg cursor-pointer rounded-md bg-white border-dashed border-indigo-600 text-indigo-600 hover:text-indigo-400 hover:border-indigo-400"
                    type="primary"
                    ghost
                    onClick={handleShow}
                  >
                    Thu gọn <CaretUpOutlined />
                  </button>
                ) : (
                  <div className="h-3/4 w-full absolute top-5 bg-gradient-to-b from-transparent to-white">
                    <button
                      className="px-10 font-semibold text-lg mt-36 cursor-pointer rounded-md bg-white border-dashed border-indigo-600 text-indigo-600 hover:text-indigo-400 hover:border-indigo-400"
                      onClick={handleShow}
                    >
                      Xem thêm <CaretDownOutlined />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="py-9 border-solid border-rose-300 border-0 border-b-2">
            <h2 className="text-xl font-bold">Nơi này có những gì cho bạn?</h2>
            <table className="w-full">
              <tbody>
                <tr className="flex sm:gap-52 text-base">
                  <td className="mb-2 flex flex-col w-auto gap-4">
                    {detailRoom?.mayGiat ? (
                      <div>
                        <AiOutlineFileDone className="text-3xl align-middle mr-2" />{" "}
                        Máy giặt
                      </div>
                    ) : (
                      <div className="line-through">
                        <AiOutlineFileDone className="text-3xl align-middle mr-2" />{" "}
                        Máy giặt
                      </div>
                    )}
                    {detailRoom?.banUi ? (
                      <div>
                        <AiOutlineDotChart className="text-3xl align-middle mr-2" />{" "}
                        Bàn ủi
                      </div>
                    ) : (
                      <div className="line-through">
                        <AiOutlineDotChart className="text-3xl align-middle mr-2" />{" "}
                        Bàn ủi
                      </div>
                    )}
                    {detailRoom?.tivi ? (
                      <div>
                        <AiOutlineYoutube className="text-3xl align-middle mr-2" />{" "}
                        Ti Vi
                      </div>
                    ) : (
                      <div className="line-through">
                        <AiOutlineYoutube className="text-3xl align-middle mr-2" />{" "}
                        Ti Vi
                      </div>
                    )}
                    {detailRoom?.dieuHoa ? (
                      <div>
                        <AiOutlineFileDone className="text-3xl align-middle mr-2" />{" "}
                        Điều hòa
                      </div>
                    ) : (
                      <div className="line-through">
                        <AiOutlineFileDone className="text-3xl align-middle mr-2" />{" "}
                        Điều hòa
                      </div>
                    )}
                  </td>
                  <td className="mb-2 flex flex-col w-auto gap-4">
                    {detailRoom?.wifi ? (
                      <div>
                        <AiOutlineWifi className="text-3xl align-middle mr-2" />{" "}
                        Wifi
                      </div>
                    ) : (
                      <div className="line-through">
                        <AiOutlineWifi className="text-3xl align-middle mr-2" />{" "}
                        Wifi
                      </div>
                    )}
                    {detailRoom?.bep ? (
                      <div>
                        <AiOutlineFire className="text-3xl align-middle mr-2" />{" "}
                        Bếp
                      </div>
                    ) : (
                      <div className="line-through">
                        <AiOutlineFire className="text-3xl align-middle mr-2" />{" "}
                        Bếp
                      </div>
                    )}
                    {detailRoom?.doXe ? (
                      <div>
                        <AiOutlineCar className="text-3xl align-middle mr-2" />{" "}
                        Đỗ xe
                      </div>
                    ) : (
                      <div className="line-through">
                        <AiOutlineCar className="text-3xl align-middle mr-2" />{" "}
                        Đỗ xe
                      </div>
                    )}
                    {detailRoom?.hoBoi ? (
                      <div>
                        <AiOutlineBorderOuter className="text-3xl align-middle mr-2" />{" "}
                        Hồ bơi
                      </div>
                    ) : (
                      <div className="line-through">
                        <AiOutlineBorderOuter className="text-3xl align-middle mr-2" />{" "}
                        Hồ bơi
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:w-1/3 sm:w-full py-5">
          <div className="shadow-lg shadow-red-300 rounded-2xl lg:sticky lg:top-0">
            <table className="sm:m-auto">
              <tbody>
                <tr>
                  <td colSpan={2} className="px-6 pt-4">
                    <span className="text-3xl font-bold text-rose-500">
                      ${detailRoom?.giaTien}
                    </span>
                    <span>/đêm</span>
                    <div className="my-4 border-solid border-gray-300 border-0 border-b-2"></div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td className="pl-3 text-lg font-medium" colSpan={2}>
                    <span className="pr-20">Nhận phòng</span>
                    <span>Trả phòng</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <RangePicker
                      className="mt-1 mb-3 w-full"
                      format={"YYYY-MM-DD"}
                      onChange={onChanges}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="text-lg text-center pl-4" colSpan={2}>
                    <span className="m-0 font-medium">Số lượng khách </span>
                    <span className="text-sm">(Từ 13 tuổi trở lên)</span>
                  </td>
                </tr>
                <tr className="">
                  <td colSpan={2}>
                    <div className="flex justify-center mx-6 mt-1 pb-5 border-solid border-gray-300 border-0 border-b-2">
                      <div>
                        <Button
                          className="bg-slate-300 font-bold hover:bg-rose-500"
                          onClick={decNum}
                        >
                          -
                        </Button>
                      </div>
                      <Input
                        className="form-control text-center w-full"
                        value={num + " khách"}
                        onChange={handleChange}
                      />
                      <div>
                        <Button
                          className="bg-slate-300 font-bold hover:bg-rose-500"
                          onClick={incNum}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td colSpan={2} className="pl-7 pr-7">
                    <Button
                      className="w-full h-full my-5 p-3 bg-gradient-to-r from-rose-500 to-rose-800 text-xl rounded-lg font-bold text-white"
                      onClick={postData}
                    >
                      Đặt phòng
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-600 text-left pl-6 underline">
                    ${detailRoom?.giaTien} x {days} đêm
                  </td>
                  <td className="text-lg text-gray-600 text-right pr-6">
                    {detailRoom?.giaTien * days} $
                  </td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-600 text-left pl-6 underline">
                    Phí dịch vụ
                  </td>
                  <td className="text-lg text-gray-600 text-right pr-6">0 $</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="mx-6 my-3 border-solid border-gray-300 border-0 border-b-2"></div>
                  </td>
                </tr>
                <tr>
                  <td className="text-2xl text-left p-6 pt-0 font-bold">
                    Tổng <span className="text-lg">(Chưa VAT)</span>
                  </td>
                  <td className="text-2xl text-right p-6 pt-0 font-bold">
                    {detailRoom?.giaTien * days * num} $
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="py-7">
        <div className="rounded-xl bg-orange-100 p-5 mb-5">
          <h2 className="text-rose-500 m-0 text-3xl font-semibold">
            4,91 <span className="font-normal text-lg">trên 5</span>
          </h2>
          <Rate className="text-rose-500" value={5} count={5} />
        </div>
        <Row></Row>
        <div>
          {comment.map((item) => {
            return (
              <div className="mb-7" key={item.noiDung}>
                <div className="flex">
                  <Avatar
                    className="mr-4 mb-2"
                    src={item.avatar}
                    size="large"
                    icon={<UserOutlined />}
                  />
                  <div className="w-full">
                    <h3 className="mb-0 font-semibold">
                      {item.tenNguoiBinhLuan}
                    </h3>
                    {/* <Rate value={item.saoBinhLuan} count={5} /> */}
                    <p className="text-sm text-gray-500 m-0">
                      {dayjs(item.ngayBinhLuan).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </div>
                <p>{item.noiDung}</p>
              </div>
            );
          })}
        </div>
        <button className="cursor-pointer py-3 px-5 rounded-lg border mb-7 bg-white hover:bg-gray-200 text-base font-semibold">
          Hiển thị tất cả bình luận
        </button>
        <div>
          {user && (
            <div className="flex">
              <Avatar
                className="mr-4 mb-2"
                size="large"
                icon={<UserOutlined />}
                src={user?.avatar}
              />
              <div className="w-full">
                <h3 className="mb-2 font-semibold">{user?.name}</h3>
                {/* <Rate value={""} count={5} /> */}
                <Form
                  form={form}
                  layout="vertical"
                  autoComplete="off"
                  onFinish={postComment}
                >
                  <Form.Item
                    name="comment"
                    label=""
                    rules={[
                      {
                        required: true,
                        message: "Bình luận không được để trống!",
                      },
                    ]}
                  >
                    <TextArea
                      className="w-1/2"
                      rows={4}
                      placeholder="Nhập bình luận..."
                    />
                    {/* <Input placeholder="Nhập đánh giá" className="w-1/2 h-20" /> */}
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Thêm Đánh Giá
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailRoom;
