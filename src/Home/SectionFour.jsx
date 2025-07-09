import React, { useEffect } from "react";
import "../App.css";
import { initializeServiceProvider } from "../script";

const SectionFour = () => {
  useEffect(() => {
    // Initialize service provider animations
    initializeServiceProvider();
  }, []);

  const services = [
    {
      number: "01",
      title: "Web Development",
      description:
        "We craft fast, responsive, and visually engaging websites tailored to your brand's identity. From UI/UX to backend integration, we ensure seamless performance and a user-first experience across all devices.",
      className: "web-development",
    },
    {
      number: "02",
      title: "Performance Marketing",
      description:
        "Our performance marketing strategies focus on delivering measurable results through targeted ads, lead generation, and optimized funnels. Every campaign is designed to maximize ROI and fuel consistent business growth.",
      className: "performance-marketing",
    },
    {
      number: "03",
      title: "SEO",
      description:
        "We improve your online visibility with powerful SEO strategies that blend content, keyword targeting, and technical optimization. The result? Higher rankings, increased organic traffic, and long-term search dominance.",
      className: "seo",
    },
    {
      number: "04",
      title: "Social Media",
      description:
        "We create compelling social media strategies that build authentic connections with your audience. From content creation to community management, we help your brand thrive across all major platforms.",
      className: "social-media",
    },
    {
      number: "05",
      title: "3D & 2D Animation",
      description:
        "Our animation team creates high-impact 2D and 3D visuals that tell your story with motion. Perfect for ads, explainers, or reels — we make your brand impossible to ignore.",
      className: "animation",
    },
  ];

  return (
    <ul className="service-provider-container">
      {services.map((service, index) => (
        <li key={index} className="service-item">
          <a href="#">
            <span className="service-number">{service.number}</span>
            <span className="service-title">{service.title}</span>
            <span className="service-description">{service.description}</span>
            <div className={`service-image ${service.className}`}></div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SectionFour;