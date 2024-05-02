//Sample room data
const rooms = [
  {
    id: 1,
    roomName: "Banquet Hall A",
    seatsAvailable: 40,
    amenities: ["DJ setup", "Party lights", "Celebration stage"],
    pricePerHour: 1500,
  },
  {
    id: 2,
    roomName: "Conference Hall A",
    seatsAvailable: 15,
    amenities: ["Projector", "Whiteboard"],
    pricePerHour: 1000,
  },
  {
    id: 3,
    roomName: "Meeting Hall A",
    seatsAvailable: 10,
    amenities: ["TV", "Whiteboard"],
    pricePerHour: 1000,
  },
  {
    id: 4,
    roomName: "Meeting Hall B",
    seatsAvailable: 8,
    amenities: ["Projector", "WiFi"],
    pricePerHour: 2000,
  },
  {
    id: 5,
    roomName: "Banquet Hall B",
    seatsAvailable: 30,
    amenities: ["DJ setup", "Party lights", "Celebration stage"],
    pricePerHour: 2000,
  },
];

// Sample booking data
let bookings = [
  {
    id: 1,
    customerName: "John Doe",
    date: "2024-04-15",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    roomId: 1,
    roomName: "Banquet Hall A",
  },
  {
    id: 2,
    customerName: "Alice Smith",
    date: "2024-04-16",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    roomId: 3,
    roomName: "Meeting Hall A",
  },
  {
    id: 3,
    customerName: "Bob Johnson",
    date: "2024-04-17",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    roomId: 2,
    roomName: "Conference Hall A",
  },
  {
    id: 4,
    customerName: "Emma Brown",
    date: "2024-04-18",
    startTime: "01:00 PM",
    endTime: "03:00 PM",
    roomId: 5,
    roomName: "Banquet Hall B",
  },
  // {
  //   id: 4,
  //   customerName: "James Wilson",
  //   date: "2024-04-19",
  //   startTime: "10:00 AM",
  //   endTime: "12:00 PM",
  //   roomId: 5,
  //   roomName: "Training Room",
  // },
];

module.exports = { rooms, bookings };
