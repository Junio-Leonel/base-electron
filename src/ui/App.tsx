import { FormEvent, useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name) {
      return;
    }

    setSubmittedName(name);

    setName("");
  }

  return (
    <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-10 w-full bg-white border border-neutral-400 focus-within:border-neutral-900 rounded-lg outline-none px-4 text-neutral-950 placeholder:text-neutral-400"
        />

        <button
          type="submit"
          className="bg-green-500 rounded-lg h-10 text-white font-medium max-w-20"
        >
          Send
        </button>
      </form>

      {submittedName && (
        <strong className="text-white mt-4">{submittedName}</strong>
      )}
    </div>
  );
}
