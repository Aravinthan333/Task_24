const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const { rooms, bookings } = require("./data");

app.use(express.json());

// Routes

// Home Page

app.get("/", (req, res) => {
  res.status(200).send("<h1>Home Page of Hall Booking App</h1>");
});

// ---------------------------------------------------------------------------------------------

// Get All Rooms With Booked Data

app.get("/getAllRooms", (req, res) => {
  let data = rooms.map((room) => ({
    ...room,
    isBooked: bookings.some((booking) => room.id === booking.roomId),
  }));
  let result = rooms.map((room) => ({
    ...room,
    BookedStatus: bookings.find((booked) => booked.roomId === room.id)
      ? true
      : false,
  }));
  res.status(200).json(result);
});

// ---------------------------------------------------------------------------------------------

// Get All Customers

app.get("/getAllCustomers", (req, res) => {
  res.status(200).send(
    bookings.map((booking) => {
      return {
        customerName: booking.customerName,
        roomName: booking.roomName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      };
    })
  );
});

// ---------------------------------------------------------------------------------------------

// Creating A Room

app.post("/createRoom", (req, res) => {
  const { roomName, seatsAvailable, amenities, pricePerHour } = req.body;
  if (!roomName || !seatsAvailable || !pricePerHour) {
    return res.status(400).send("Please provide all the details");
  }

  const existingRoom = rooms.filter((room) => room.roomName == roomName);
  if (existingRoom.length > 0) {
    return res.status(400).send("This room already exists.");
  }

  rooms.push({
    id: rooms.length + 1,
    ...req.body,
  });
  res.status(201).json(rooms[rooms.length - 1]);
});

// ---------------------------------------------------------------------------------------------

// Booking A Room

app.post("/bookRoom", (req, res) => {
  const { customerName, date, startTime, endTime, roomName } = req.body;
  if (!customerName || !date || !startTime || !endTime || !roomName) {
    return res.status(400).send("Please provide all the details");
  }
  // Check If The Customer Is Already Booked a Room On This Day
  for (let i = 0; i < bookings.length; i++) {
    if (
      bookings[i].customerName === customerName &&
      bookings[i].date === date
    ) {
      return res
        .status(409)
        .send(`The customer is already booked on this day.`);
    }
  }

  let room = rooms.find((r) => r.roomName === roomName);
  if (!room) {
    return res.status(404).send("No such room available.");
  }

  const overlap = bookings.find((b) => {
    const bStart = new Date(b.startTime);
    const bEnd = new Date(b.endTime);
    const reqStart = new Date(date + "T" + startTime);
    const reqEnd = new Date(date + "T" + endTime);

    return (
      reqStart < bEnd &&
      reqEnd > bStart &&
      !(reqStart < bStart || reqEnd > bEnd)
    );
  });

  if (overlap) {
    return res.status(409).send(`The room is already booked at this time.`);
  }

  const id = bookings.length + 1;
  bookings.push({ id, customerName, date, startTime, endTime, roomName });
  res.send(bookings[bookings.length - 1]);
});

// ---------------------------------------------------------------------------------------------

// No of times Room booked by a Customer

app.get("/customers/:customerName", (req, res) => {
  const { customerName } = req.params;
  const customerBookings = bookings.filter(
    (booking) => booking.customerName === customerName
  );
  res.json(customerBookings);
});

// ---------------------------------------------------------------------------------------------

let PORT = process.env.PORT || 3000 || 4000 || 5000;
let HOST_NAME =
  process.env.HOST_NAME ||
  "13.228.225.19" ||
  "18.142.128.26" ||
  "54.254.162.138";

app.listen(PORT, HOST_NAME, () => {
  console.log(`server is listening on port ${PORT}`);
});
