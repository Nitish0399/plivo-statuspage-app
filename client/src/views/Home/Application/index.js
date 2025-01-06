import { getApplications, deleteApplication } from "../../../api/internal";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { FolderIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications on mount
    const fetchData = async () => {
      const appData = await getApplications();
      setApplications(appData);
    };
    fetchData();
  }, []);

  const handleDeleteApplication = async (applicationId) => {
    try {
      await deleteApplication(applicationId); // Delete the application
      setApplications(
        applications.filter((application) => application._id !== applicationId)
      ); // Update the application list
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900">Applications</h1>
      <p className="text-lg text-gray-600 mt-1">
        Manage and explore all your applications in one place.
      </p>

      <Button
        variant="link"
        onClick={() => navigate("/home/add-application")}
        className="flex items-center text-blue-600 hover:text-blue-800 mt-1"
      >
        <PlusIcon className="w-5 h-5" /> <span>Add Application</span>
      </Button>

      {applications.length > 0 ? (
        applications.map((app) => (
          <Card
            key={app._id}
            className="mb-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300"
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="bg-blue-500 p-2">
                  <FolderIcon className="w-6 h-6 text-white" />
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {app.name}
                  </h2>
                  <p className="text-sm text-gray-500">{app.description}</p>
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/home/applications/${app._id}`)}
                      className="w-full md:w-auto"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  color="destructive"
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteApplication(app._id)}
                >
                  <TrashIcon className="w-4 h-4" /> Delete
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-600 py-6">
          No applications found. Start by adding a new application.
        </p>
      )}
    </div>
  );
};

export default Applications;
