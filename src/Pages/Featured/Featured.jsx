import { useState } from "react";

const Featured = () => {
  const [isOpen, setIsOpen] = useState(null);
  const toggle = ({ currentIdx }) =>
    setIsOpen((prevIdx) => (prevIdx == currentIdx ? null : currentIdx));
  const sliders = [
    {
      img: "https://shorturl.at/eruAJ",
      title: "Noakhali Campain",
      des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
    },
    {
      img: "https://shorturl.at/bioU5",
      title: "Dhaka",
      des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
    },
    {
      img: "https://shorturl.at/cJMSU",
      title: "Pabna",
      des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
    },
    {
      img: "https://rb.gy/oqet1c",
      title: "Comilla",
      des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
    },
    {
      img: "https://rb.gy/6jvz2u",
      title: "Joshor",
      des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
    },
  ];
  return (
    <div className="my-20 max-sm:hidden">
        <h2 className="text-3xl font-bold text-center mb-5">Our Campains</h2>
      <div className="flex gap-4">
        {/* map  */}
        {sliders.map((slide, idx) => (
          <div
            onClick={() => toggle({ currentIdx: idx })}
            className={`h-[600px] bg-gray-500 relative duration-500 ease-in-out ${
              isOpen == idx ? "w-[400px] " : "w-[80px]"
            }`}
            key={idx}
          >
            {/* main image  */}
            <img
              className="h-full object-cover rounded-3xl"
              src={slide.img}
              alt=""
            />
            <img
              className={`absolute bottom-5 border-white border-2 ${
                isOpen === idx
                  ? "left-4"
                  : "left-1/2 -translate-x-1/2 duration-700"
              }  h-[50px] w-[50px] object-cover rounded-full`}
              src={slide.img}
              alt=""
            />
            <div className={`text-white absolute left-[100px] bottom-5`}>
              <h3 className="text-3xl font-semibold">Blood Campain</h3>
              <p className="text-xl">{slide.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
