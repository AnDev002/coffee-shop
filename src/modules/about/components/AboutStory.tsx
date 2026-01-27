import React from "react";

const AboutStory = () => {
  return (
    <section className="container mx-auto max-w-[1140px] px-4 py-24 md:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10 lg:-mr-24 relative">
          <div className="bg-[#000000]/50 p-8 md:p-12 backdrop-blur-sm w-full">
            <h3 className="font-great-vibes text-[#c49b63] text-[40px] md:text-[50px] leading-none mb-2">
              Khám Phá
            </h3>
            <h2 className="font-josefin text-white text-[30px] md:text-[40px] uppercase font-bold tracking-wide mb-8 leading-tight">
              Câu Chuyện Của Chúng Tôi
            </h2>
            
            <div className="font-poppins text-gray-400 font-light leading-relaxed space-y-4 text-[15px]">
              <p>
                Hành trình của chúng tôi bắt đầu từ niềm đam mê cháy bỏng với những hạt cà phê nguyên bản. Chúng tôi tin rằng mỗi tách cà phê không chỉ là một thức uống, mà là sự kết tinh của văn hóa, nghệ thuật và sự tận tâm của người nghệ nhân rang xay.
              </p>
              <p>
                Tại đây, chúng tôi không chỉ phục vụ cà phê, mà còn mang đến một không gian ấm cúng để bạn tìm lại những phút giây bình yên giữa bộn bề cuộc sống. Cam kết sử dụng nguyên liệu thượng hạng nhất để đánh thức mọi giác quan của bạn.
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-3/4 h-[400px] lg:h-[674px] relative">
          <div 
            className="w-full h-full bg-cover bg-center object-cover"
            style={{ backgroundImage: "url('/assets/ImageAsset9.png')" }}
          />
        </div>

      </div>
    </section>
  );
};

export default AboutStory;