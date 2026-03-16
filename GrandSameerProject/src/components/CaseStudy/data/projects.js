// src/data/projects.js
import wonderImg from "../../../assets/eventAndVideo/Bhopal3.jpeg";
import summitImg from "../../../assets/eventAndVideo/Bhopal3.jpeg";
import rallyImg from "../../../assets/eventAndVideo/Bhopal3.jpeg";

export const allProjects = [
  {
    id: 1,
    title: "Wonder Cement — On-Site Semi-Permanent Infrastructure",
    slug: "wonder-cement-semi-permanent",
    year: "2024",
    client: "Wonder Cement",
    category: "Corporate",
    location: "Nimbahera, Rajasthan",
    description: "Customized hangars delivered for continuous industrial operations...",
    fullDescription: "Designed and deployed 5000+ sqm of custom-engineered semi-permanent hangars...",
    image: wonderImg,
    highlights: [
      "Delivered in just 18 days",
      "Withstands 120 km/h winds & 50°C heat",
      "Climate-controlled zones for 300+ workers",
      "Modular design for 30% future expansion",
    ],
  },
  {
    id: 2,
    title: "Tata Motors — Rapid Industrial Space Deployment",
    slug: "tata-motors-rapid-deployment",
    year: "2023",
    client: "Tata Motors",
    category: "TataMotors",
    location: "Pithampur, Madhya Pradesh",
    description: "A fully operational temporary facility constructed under extreme timelines...",
    fullDescription: "Built a 4200 sqm fully functional production & warehousing space...",
    image: summitImg,
    highlights: [
      "Completed in 9 days flat",
      "Floor load capacity 5 tons/sqm",
      "Integrated 24×7 HVAC & fire suppression",
      "Zero safety incidents during deployment",
    ],
  },
  {
    id: 3,
    title: "Government of Madhya Pradesh — Chief Minister & Prime Minister Events",
    slug: "mp-govt-vip-events",
    year: "2022",
    client: "Government of Madhya Pradesh",
    category: "Political",
    location: "Bhopal, Madhya Pradesh",
    description: "High-security temporary structures built for VIP movement...",
    fullDescription: "Complete event infrastructure for 3 mega events attended by CM & PM...",
    image: rallyImg,
    highlights: [
      "10,000+ seating capacity",
      "5-day lightning deployment",
      "Multi-layer security & protocol zones",
      "Live national broadcast ready AV",
    ],
  },
];