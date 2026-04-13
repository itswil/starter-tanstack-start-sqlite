import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { randFullName, randEmail, randNumber } from "@ngneat/falso";
import { getUsersFn, addUserFn, deleteUserFn } from "../modules/users/users.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    return await getUsersFn();
  },
  component: Home,
});

function Home() {
  const users = Route.useLoaderData();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsAdding(true);
    try {
      await addUserFn({ data: { name, email, age: Number(age) } });
      router.invalidate();
      setName("");
      setEmail("");
      setAge("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add user");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUserFn({ data: { id } });
      router.invalidate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-3 max-w-md">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={isAdding}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isAdding ? "Adding..." : "Add User"}
        </button>
        <button
          type="button"
          onClick={() => {
            setName(randFullName());
            setEmail(randEmail());
            setAge(String(randNumber({ min: 18, max: 80 })));
          }}
          className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          Fill Fake
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="text-sm text-gray-600 flex items-center gap-2">
            <span className="font-medium">{user.name}</span>
            <span className="text-gray-400">·</span>
            <span>{user.email}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">Age {user.age}</span>
            <button
              type="button"
              onClick={() => handleDelete(user.id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
