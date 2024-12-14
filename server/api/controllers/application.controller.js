const applicationService = require("../services/application.service");

exports.createApplication = async (req, res) => {
  try {
    const application = await applicationService.addApplication(req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await applicationService.listApplications();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApplication = async (req, res) => {
  try {
    const application = await applicationService.getApplicationById(
      req.params.id
    );
    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await applicationService.updateApplication(
      req.params.id,
      req.body
    );
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const result = await applicationService.deleteApplication(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
