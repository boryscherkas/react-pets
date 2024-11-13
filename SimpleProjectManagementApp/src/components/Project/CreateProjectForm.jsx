import { useState } from "react";
import Input from "../Input.jsx";

export default function CreateProjectForm({ addProject, ...rest }) {
  
  const today = new Date();

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const formattedNow = `${nextWeek.getFullYear()}-${String(nextWeek.getMonth() + 1).padStart(2, '0')}-${String(nextWeek.getDate()).padStart(2, '0')}`;

  const [project, setProject] = useState({
    title: "",
    description: "",
    dueDate: formattedNow,
  });

  function handleInput(propertyName, value) {
    setProject((prev) => {
      return {
        ...prev,
        [propertyName]: value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (new Date(project.dueDate) <= today) {
      return;
    }

    addProject({
      ...project,
      dueDate: new Date(project.dueDate)
    });
  }

  return (
    <div
      {...rest}
      className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg"
    >
      <h1 className="text-center font-bold text-2xl mb-6 text-gray-800">
        Create Project
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Title"
          type="text"
          value={project.title}
          onChange={(event) => handleInput("title", event.target.value)}
          required
        />
        <Input
          label="Description"
          type="text"
          value={project.description}
          onChange={(event) => handleInput("description", event.target.value)}
          required
        />
        <Input
          label="Due date"
          type="date"
          value={project.dueDate}
          onChange={(event) => handleInput("dueDate", event.target.value)}
          required
        />

        <input
          type="submit"
          value="Save"
          className="w-full bg-blue-600 text-white font-semibold 
          py-2 rounded-md shadow-md 
          hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
      </form>
    </div>
  );
}
