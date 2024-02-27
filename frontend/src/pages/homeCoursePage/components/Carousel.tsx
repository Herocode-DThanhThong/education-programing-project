// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import ImageSliderOne from "assests/images/KHÓA HỌC HTML & CSS.png";
import ImageSliderTwo from "assests/images/cộng đồng hỏi đáp.jpg";
import ImageSliderThree from "assests/images/Front-end-programming-languages.jpeg";
import { useNavigate } from "react-router-dom";

interface Props {}

const Carousel = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay] as any}
        spaceBetween={50}
        slidesPerView={1}
        speed={3000}
        // navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="rounded-md p-4 px-8 bg-gradient-to-r mx-2 from-cyan-500 to-blue-500 flex justify-between items-center">
            <div className="w-1/2">
              <h1 className="text-3xl text-left caption-top font-bold text-white">
                Học lập trình miễn phí
              </h1>
              <p className="text-left text-sm mt-4 text-white capitalize font-semibold tracking-wide line leading-7">
                Đa dạng nguồn tài liệu, video bài giảng được tổng hợp từ nhiều
                nguồn khác nhau. Việc học lập trình sẽ trở nên dễ dàng hơn
              </p>
              <div className="text-left">
                <button
                  onClick={() => {
                    navigate("/learn");
                  }}
                  type="button"
                  className="mt-8 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                >
                  Học ngay
                </button>
              </div>
            </div>
            <img
              className="flex-1 h-[250px] object-cover rounded-lg ml-4"
              src={ImageSliderOne}
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md p-4 px-8 mx-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex justify-between items-center">
            <div className="w-1/2">
              <h1 className="text-3xl text-left caption-top font-bold text-white">
                Cộng đồng hỏi đáp
              </h1>
              <p className="text-left text-sm mt-4 text-white capitalize font-semibold tracking-wide line leading-7">
                Khám phá sự học lập trình cùng cộng đồng! Nơi bạn hỏi, chúng tôi
                trả lời. Học lập trình cùng sự hỗ trợ từ hàng ngàn đồng đội.
              </p>
              <div className="text-left">
                <button
                  onClick={() => {
                    navigate("/community");
                  }}
                  type="button"
                  className="mt-8 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                >
                  Tham gia ngay
                </button>
              </div>
            </div>
            <img
              className="flex-1 h-[250px] object-cover rounded-lg ml-4"
              src={ImageSliderTwo}
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md p-4 px-8 bg-gradient-to-r mx-2 from-purple-500 to-pink-500 flex justify-between items-center">
            <div className="w-1/2">
              <h1 className="text-3xl text-left caption-top font-bold text-white">
                Ngôn ngữ lập trình
              </h1>
              <p className="text-left text-sm mt-4 text-white capitalize font-semibold tracking-wide line leading-7">
                Chinh phục lập trình Front-end và Back-end đa ngôn ngữ! Học
                HTML, CSS, JavaScript và nhiều hơn nữa để tạo giao diện người
                dùng hoàn hảo.
              </p>
              <div className="text-left">
                <button
                  onClick={() => {
                    navigate("/learn");
                  }}
                  type="button"
                  className="mt-8 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                >
                  Khám phá ngay
                </button>
              </div>
            </div>
            <img
              className="flex-1 h-[250px] object-cover rounded-lg ml-4"
              src={ImageSliderThree}
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
