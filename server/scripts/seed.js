const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');

dotenv.config();

const properties = [
  {
    title: "Prime Stay Elite (Boys PG)",
    description: "Premium boys hostel close to LPU main gate. Features high-speed internet, laundry facilities, three meals a day, 24/7 security, gym access, and a gaming lounge. Walking distance from campus.",
    address: "GT Road, Near LPU Gate 1, Phagwara",
    city: "Phagwara (LPU)",
    gender: "boys",
    sharingOptions: [
      { type: "single", price: 12000, available: 3 },
      { type: "double", price: 7500, available: 6 },
      { type: "triple", price: 5500, available: 9 }
    ],
    amenities: ["WiFi", "AC", "Food", "Power Backup", "Gym", "Laundry", "CCTV Security", "TV Lounge"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewsCount: 34,
    rules: ["No smoking inside rooms", "Visitor entry restricted post 9 PM", "Gate closes at 10:30 PM"],
    isFeatured: true
  },
  {
    title: "Prime Stay Grace (Girls PG)",
    description: "A secure and cozy ladies PG near LPU campus. Offering premium double and single sharing rooms with attached bathrooms, biometric security, laundry, delicious home-style food, and housekeeping.",
    address: "Urban Estate Phase II, near LPU Campus, Phagwara",
    city: "Phagwara (LPU)",
    gender: "girls",
    sharingOptions: [
      { type: "single", price: 11000, available: 2 },
      { type: "double", price: 6800, available: 5 },
      { type: "triple", price: 4800, available: 4 }
    ],
    amenities: ["WiFi", "Food", "Power Backup", "Laundry", "CCTV Security", "Housekeeping", "Biometric Access"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewsCount: 22,
    rules: ["No smoking or alcohol", "Gate closes at 9:30 PM", "Prior approval for late entry"],
    isFeatured: true
  },
  {
    title: "Prime Stay Smart Coliving",
    description: "Modern co-living space for modern students and young professionals. Equipped with modular kitchen, rooftop cafeteria, study zone, and modern workspace pods. Extremely close to university transportation hubs.",
    address: "LPU Link Road, Phagwara",
    city: "Phagwara (LPU)",
    gender: "unisex",
    sharingOptions: [
      { type: "single", price: 14000, available: 4 },
      { type: "double", price: 9000, available: 8 }
    ],
    amenities: ["WiFi", "AC", "Food", "Power Backup", "Gym", "Laundry", "CCTV Security", "Study Zone", "Rooftop Cafe"],
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    reviewsCount: 18,
    rules: ["Respect quiet hours post 11 PM", "Eco-friendly energy usage", "Clean common areas after use"],
    isFeatured: false
  },
  {
    title: "Prime Stay Koramangala Heights",
    description: "Located in the heart of Bangalore's startup hub. This premium PG is designed for tech professionals and students. Features AC rooms, high-speed fiber WiFi, breakfast & dinner, daily cleaning, and biometric entrance.",
    address: "12th Main Rd, 4th Block, Koramangala, Bengaluru",
    city: "Bangalore",
    gender: "unisex",
    sharingOptions: [
      { type: "single", price: 18000, available: 2 },
      { type: "double", price: 11000, available: 4 }
    ],
    amenities: ["WiFi", "AC", "Food", "Power Backup", "Laundry", "CCTV Security", "Biometric Access", "Housekeeping"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviewsCount: 45,
    rules: ["Visitors allowed only in the lounge", "No loud music post 10 PM", "No pets allowed"],
    isFeatured: true
  },
  {
    title: "Prime Stay HSR Nest (Girls)",
    description: "Super safe and high-end accommodation for corporate girls and students in HSR Layout. Offering gourmet home-cooked style food, attached balcony options, washing machines, and dynamic lounge areas.",
    address: "24th Main, Sector 2, HSR Layout, Bengaluru",
    city: "Bangalore",
    gender: "girls",
    sharingOptions: [
      { type: "single", price: 16500, available: 3 },
      { type: "double", price: 10000, available: 6 },
      { type: "triple", price: 7500, available: 5 }
    ],
    amenities: ["WiFi", "AC", "Food", "Power Backup", "Laundry", "CCTV Security", "Kitchen Access", "Elevator"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewsCount: 29,
    rules: ["Gate closes at 10 PM", "Inform warden for overnight leave", "No external guests allowed inside rooms"],
    isFeatured: false
  },
  {
    title: "Prime Stay Tech Corridor (Boys PG)",
    description: "Ideally situated near Electronic City IT parks. Affordable, fully managed PG for male students and freshers. Amenities include high-speed WiFi, hot water, north/south Indian food, and gaming zone.",
    address: "Electronic City Phase I, Near Wipro Gate, Bengaluru",
    city: "Bangalore",
    gender: "boys",
    sharingOptions: [
      { type: "single", price: 13500, available: 5 },
      { type: "double", price: 8500, available: 10 },
      { type: "triple", price: 6500, available: 8 }
    ],
    amenities: ["WiFi", "Food", "Power Backup", "Laundry", "CCTV Security", "Gaming Zone", "Parking", "TV Lounge"],
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.5,
    reviewsCount: 52,
    rules: ["Late night entry allowed with biometric ID", "Respect co-residents' space", "Inform management of issues via app"],
    isFeatured: false
  }
];

const Review = require('../models/Review');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/primestay');
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();
    console.log('Cleared existing data.');

    // Seed default users
    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash('admin123', salt);
    const hashedPassword = await bcrypt.hash('user123', salt);

    const seededUsers = await User.create([
      {
        name: 'Admin Admin',
        email: 'admin@primestay.com',
        password: 'admin123', // Model hook pre('save') will hash it automatically
        role: 'admin',
        phone: '9876543210'
      },
      {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: 'user123', // Model hook pre('save') will hash it automatically
        role: 'user',
        phone: '8765432109'
      }
    ]);
    console.log('Users seeded successfully:', seededUsers.map(u => u.email));

    // Seed properties
    const seededProperties = await Property.create(properties);
    console.log('Properties seeded successfully:', seededProperties.map(p => p.title));

    // Seed reviews
    const seededReviews = await Review.create([
      {
        user: seededUsers[1]._id,
        property: seededProperties[0]._id,
        name: 'Aman Singh',
        role: 'LPU Student',
        text: 'Best PG near LPU gate! The food is amazing and WiFi is super fast. Rooms are clean and the staff is very helpful.',
        rating: 5,
      },
      {
        user: seededUsers[1]._id,
        property: seededProperties[3]._id,
        name: 'Neha Sharma',
        role: 'IT Professional',
        text: 'Highly secure and clean coliving space in Koramangala. The facilities are top-notch and the community is wonderful.',
        rating: 5,
      },
      {
        user: seededUsers[1]._id,
        property: seededProperties[0]._id,
        name: 'Rahul Verma',
        role: 'Student',
        text: 'Zero brokerage saved me a lot of money. Rooms are exactly as shown in pictures. Very transparent process.',
        rating: 4,
      },
      {
        user: seededUsers[1]._id,
        property: seededProperties[1]._id,
        name: 'Priya Desai',
        role: 'Software Engineer',
        text: 'The community events here make weekends so fun. Feels like a second family. Highly recommend Prime Stay!',
        rating: 5,
      },
      {
        user: seededUsers[1]._id,
        property: seededProperties[2]._id,
        name: 'Karan Patel',
        role: 'Fresher',
        text: 'Housekeeping is top-notch. Never had to worry about cleaning my room. The mess food is also delicious.',
        rating: 5,
      },
      {
        user: seededUsers[1]._id,
        property: seededProperties[0]._id,
        name: 'Divya Menon',
        role: 'MBA Student',
        text: 'Found my PG in under 10 minutes! The verified listings gave me confidence. No hidden charges, no surprises.',
        rating: 5,
      }
    ]);
    console.log('Sample reviews seeded successfully.');

    // Seed one test booking
    await Booking.create({
      user: seededUsers[1]._id,
      property: seededProperties[0]._id,
      roomType: 'double',
      price: 7500 * 2,
      startDate: new Date(),
      durationMonths: 2,
      status: 'confirmed'
    });
    console.log('Test booking seeded successfully.');

    console.log('Data Seeding Completed!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
