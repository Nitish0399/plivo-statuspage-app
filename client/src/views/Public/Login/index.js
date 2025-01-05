import { loginUser } from "../../../api/public";
import { updateUser } from "../../../state/slices/User";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await loginUser({ email, password });
      if (response.status === 200) {
        dispatch(updateUser(response.data.user));
        navigate("/home/applications");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto mt-16">
      <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Back!
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Enter your credentials to access your account
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value="john_doe@plivo.com"
                required
                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                value="Pass@123"
                required
                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button
        variant="secondary"
        className="mt-6 bg-green-600 text-white hover:bg-gray-200 transition py-2 px-4 rounded-lg"
        onClick={() => window.open("/status", "_blank")}
      >
        View Status
      </Button>
    </div>
  );
};

export default Login;
