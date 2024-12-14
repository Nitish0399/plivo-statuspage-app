// serviceSeeder.js
const services = [
  {
    _id: "1",
    name: "Plivo Voice API",
    description:
      "The voice API that enables developers to add voice calling functionality.",
    status: "active",
    applicationId: "1", // Assuming this references an application like Plivo
  },
  {
    _id: "2",
    name: "Plivo SMS API",
    description: "API for sending SMS messages globally.",
    status: "active",
    applicationId: "1",
  },
  {
    _id: "3",
    name: "Plivo Billing System",
    description:
      "The billing service responsible for handling account charges and transactions.",
    status: "inactive",
    applicationId: "1",
  },
];

module.exports = { services };
