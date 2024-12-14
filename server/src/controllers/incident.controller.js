const incidentService = require("../services/incident.service");

exports.createIncident = async (req, res) => {
  try {
    const incident = await incidentService.createIncident(req.body);
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIncident = async (req, res) => {
  try {
    const incident = await incidentService.updateIncident(
      req.params.incidentId,
      req.body
    );
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIncident = async (req, res) => {
  try {
    const incident = await incidentService.getIncidentById(
      req.params.incidentId
    );
    res.status(200).json(incident);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.listIncidents = async (req, res) => {
  try {
    const incidents = await incidentService.listIncidentsByApplication(
      req.params.applicationId
    );
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIncident = async (req, res) => {
  try {
    const result = await incidentService.deleteIncident(req.params.incidentId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
