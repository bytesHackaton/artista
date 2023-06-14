const {
  findEventById,
  findEventsByCategory,
  insertEventByCategory,
  updateEventFeedback,
  deleteEventsByCategoryById,
  deleteEventById,
} = require("../data/events");
const { findUserById } = require("../data/users");

async function getEventById(id) {
  return await findEventById(id);
}

async function getEventsByCategory(categoria) {
  return await findEventsByCategory(categoria);
}

async function createEventByCategory(information, categoria) {
  const { title, description, image, category, price, state } = information;
  return await insertEventByCategory(information, categoria);
}

async function createEventFeedback(userId, eventId, information) {
  const event = await findEventById(eventId);
  const user = await findUserById(userId);

  const feedback = {
    userId: user._id,
    eventId: event._id,
    information,
  };

  const eventFeedback = await updateEventFeedback(event._id, feedback);

  if (
    event.category === "quadros" ||
    event.category === "esculturas" ||
    event.category === "experiencias"
  ) {
    await findEventsByCategory(event.category);
    return eventFeedback;
  }
}

async function removeEvent(eventId) {
  const evento = await findEventById(eventId);
  const categoria = evento.category;
  if (
    categoria === "quadros" ||
    categoria === "esculturas" ||
    categoria === "artesanatos"
  ) {
    await deleteEventsByCategoryById(eventId, categoria);
    await deleteEventById(evento);
  }
  return evento;
}

//STANDBY

module.exports = {
  getEventById,
  getEventsByCategory,
  createEventByCategory,
  createEventFeedback,
  removeEvent,
};
