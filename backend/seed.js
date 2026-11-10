import mongoose from "mongoose";
import dotenv from "dotenv";
import { Property } from "./src/Models/propertyModel.js";

dotenv.config();

const sampleProperties = [
  {
    propertyName: "Cozy Beachfront Cottage",
    description: "A peaceful getaway right by the ocean with stunning views.",
    price: 120,
    location: "Goa, India",
    address: {
      city: "Goa",
      state: "Goa",
      pincode: "403001"
    },
    category: "Beach",
    maximumGuest: 4,
    images: [
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
      { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206" },
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
      { url: "https://images.unsplash.com/photo-1540541338287-41700207dee6" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd" }
    ],
    rating: 4.8
  },
  {
    propertyName: "Modern Mountain Cabin",
    description: "Escape to the hills in this luxurious modern wooden cabin.",
    price: 150,
    location: "Manali, India",
    address: {
      city: "Manali",
      state: "Himachal Pradesh",
      pincode: "175131"
    },
    category: "Mountains",
    maximumGuest: 6,
    images: [
      { url: "https://images.unsplash.com/photo-1449844908441-8829872d2607" },
      { url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233" },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c" }
    ],
    rating: 4.9
  },
  {
    propertyName: "Heritage Colonial Apartment",
    description: "Experience the vintage charm of the City of Joy in this beautifully restored colonial-style home.",
    price: 85,
    location: "Kolkata, India",
    address: {
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016"
    },
    category: "City",
    maximumGuest: 3,
    images: [
      { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688" },
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
      { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" },
      { url: "https://images.unsplash.com/photo-1502005229762-cf1b4da7c5d6" },
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f" },
      { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb" }
    ],
    rating: 4.6
  },
  {
    propertyName: "Lonavala Hill View Villa",
    description: "A gorgeous green-valley retreat complete with a private pool and misty mountain breezes.",
    price: 200,
    location: "Maharashtra, India",
    address: {
      city: "Lonavala",
      state: "Maharashtra",
      pincode: "410401"
    },
    category: "Villas",
    maximumGuest: 8,
    images: [
      { url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811" },
      { url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b" },
      { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3" },
      { url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115" },
      { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" }
    ],
    rating: 4.9
  },
  {
    propertyName: "Mumbai Skyline Penthouse",
    description: "High-rise luxury living overlooking the bustling Arabian Sea and city skyline.",
    price: 250,
    location: "Mumbai, India",
    address: {
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    category: "City",
    maximumGuest: 4,
    images: [
      { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00" },
      { url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd" },
      { url: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b" },
      { url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e" }
    ],
    rating: 4.7
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Property.deleteMany({});
    console.log("Old properties cleared.");

    await Property.insertMany(sampleProperties);
    console.log("Database Seeded Successfully with New Destinations!");

    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();