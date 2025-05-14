import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "@/contexts/UserContext";




function WelcomeForm() {
    const { username,setHasUsername,setUsername } = useUser()
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(username.trim() !== "" );
  }, [username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setHasUsername(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-1 border-border-light max-w-[500px] min-w-[500px] p-6">
      <h2 className="text-[22px] font-semibold leading-[22px] mb-6">
        Welcome to CodeLeap network!
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-base font-normal mb-2">
            Please enter your username
          </label>
          <Input
            className="font-normal text-[16px]"
            id="username"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex">
          <Button
            type="submit"
            className={`ml-auto bg-codeleap-blue text-white px-10
                ${
                  !isFormValid
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
            disabled={!isFormValid}
          >
            ENTER
          </Button>
        </div>
      </form>
    </div>
  );
}

export default WelcomeForm;
