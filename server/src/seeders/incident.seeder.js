// incidentSeeder.js
const incidents = [
  {
    title: "Service Outage",
    description: "Major outage affecting voice services across all regions.",
    status: "ongoing",
    startDate: new Date(),
    endDate: null,
    affectedServices: ["1", "2"],
    applicationId: "1", // Assuming this references an application like Plivo
  },
  {
    title: "Network Latency",
    description: "Increased latency affecting SMS delivery in North America.",
    status: "resolved",
    startDate: new Date("2024-12-10T08:00:00Z"),
    endDate: new Date("2024-12-10T12:00:00Z"),
    affectedServices: ["2"],
    applicationId: "1", // Assuming this references an application like Plivo
  },
  {
    title: "System Maintenance",
    description: "Scheduled maintenance affecting the billing system.",
    status: "completed",
    startDate: new Date("2024-12-12T00:00:00Z"),
    endDate: new Date("2024-12-12T02:00:00Z"),
    affectedServices: ["3"],
    applicationId: "1", // Assuming this references an application like Plivo
  },
];

module.exports = { incidents };
