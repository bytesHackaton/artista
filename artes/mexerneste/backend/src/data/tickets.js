const { ObjectId } = require("mongodb");
const { getMongoCollection } = require("./db");

async function removeTicketById(id) {
  const tickets = await getMongoCollection("tickets");
  return await tickets.deleteOne({ _id: new ObjectId(id) });
}

async function insertTicket(ticket) {
  console.log("oi");
  const tickets = await getMongoCollection("tickets");
  const result = await tickets.insertOne(ticket);
  console.log(result.insertedId);
  return result.insertedId;
}

async function findTicketByUser(userId) {
  const tickets = await getMongoCollection("tickets");
  const ticket = await tickets.find({ userId: new ObjectId(userId) }).toArray();
  return ticket;
}

async function findTicket(id) {
  const tickets = await getMongoCollection("tickets");
  const ticket = await tickets.findOne({ _id: new ObjectId(id) });
  console.log(ticket);
  return ticket;
}

//joaoluis
async function getTicketByEventId(eventId) {
  const tickets = await getMongoCollection("tickets");
  const alltickets = await tickets.find({}).toArray();
  console.log(alltickets);
  return alltickets;
}

module.exports = {
  insertTicket,
  removeTicketById,
  findTicketByUser,
  findTicket,
};
