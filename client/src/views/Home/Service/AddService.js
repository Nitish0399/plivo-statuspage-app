import { createService } from "../../../api/internal";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AddService = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);

  const handleAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      await createService({
        applicationId: id,
        name: formData.get("name"),
        description: formData.get("description"),
        status: "Operational",
      });
      window.history.back();
    } catch (error) {
      setError(error.error);
    }
  };

  return (
    <div className="flex justify-center items-center p-6">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Add New Service</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter details to add a new service to your application.
        </p>
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Service Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Enter application name"
              required
              autoFocus
              className="mt-2"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter application description"
              rows={4}
              required
              className="mt-2"
            />
          </div>
          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}
          <div className="mt-6 flex justify-end space-x-4">
            <Button
              variant="solid"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              onClick={() => window.history.back()}
            >
              <ArrowLeftIcon className="w-4 h-4" /> Back
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="flex items-center space-x-2 text-green-600 hover:text-green-800"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
              Add Service
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddService;
