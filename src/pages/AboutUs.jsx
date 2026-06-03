import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faTruck,
  faHeadset,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: <faShoppingBag size={32} />,
    title: "Wide Product Range",
    description:
      "Explore thousands of quality products across multiple categories at competitive prices.",
  },
  {
    icon: <faShieldAlt size={32} />,
    title: "Secure Shopping",
    description:
      "Enjoy safe and secure payments with trusted payment gateways and encrypted transactions.",
  },
  {
    icon: <faTruck size={32} />,
    title: "Fast Delivery",
    description:
      "We ensure quick order processing and reliable delivery to your doorstep.",
  },
  {
    icon: <faHeadset size={32} />,
    title: "Customer Support",
    description:
      "Our support team is always available to assist you with any queries or concerns.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              About MobileVarse
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl opacity-90">
              Your trusted destination for quality products, amazing deals,
              secure shopping, and exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Company */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed">
                MobileVarse is a modern eCommerce platform dedicated to
                delivering high-quality products and a seamless shopping
                experience. We strive to connect customers with trusted brands
                and innovative products at competitive prices.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Our mission is to make online shopping convenient, secure, and
                enjoyable while providing excellent customer support and
                reliable delivery services.
              </p>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
                alt="About MobileVarse"
                className="rounded-3xl shadow-lg w-full object-cover h-[250px] sm:h-[350px] md:h-[450px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">Why Choose Us</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="text-red-500 flex justify-center mb-4">
                  {item.icon}
                </div>

                <h3 className="font-semibold text-lg mb-3">{item.title}</h3>

                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Our Mission</h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            To become one of the most trusted online shopping destinations by
            providing exceptional value, reliable service, and an outstanding
            customer experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
