// Assuming you are using Lucide icons

import { createApplication } from "../../../api/internal";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const AddApplication = () => {
  const [error, setError] = useState(null);

  const handleAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await createApplication({
        name: formData.get("name"),
        description: formData.get("description"),
      });
      window.history.back();
    } catch (error) {
      setError(error.error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">
          Add New Application
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the application details below.
        </p>
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Application Name
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
              type="button"
              variant="outline"
              startIcon={<ArrowLeftIcon />}
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="solid"
              startIcon={<PaperAirplaneIcon />}
            >
              Add Application
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddApplication;
