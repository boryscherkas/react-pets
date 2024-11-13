import { useState, useRef } from "react";

export default function SelectedProject({
  selectedProject,
  onProjectRemove,
  onAddTask,
  onRemoveTask,
  ...rest
}) {
  const newTaskInput = useRef();

  selectedProject.tasks = selectedProject.tasks || [];

  function getDueDateFormatted() {
    return selectedProject.dueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // "short" will give you the abbreviated month name (e.g., "Dec")
      day: "numeric",
    });
  }

  function onAddTaskClick() {
    if (!newTaskInput.current.value) return;

    onAddTask(selectedProject, newTaskInput.current.value);

    newTaskInput.current.value = '';
  }

  function onRemoveTaskClick(task) {
    onRemoveTask(selectedProject, task);
  }

  return (
    <div className="flex flex-col h-full p-9 pr-40 text-xl" {...rest}>
      <div className="border-gray-400">
        <div className="flex items-center pt-3">
          <h1 className="text-4xl flex-grow">{selectedProject.title}</h1>
          <button
            className="ml-auto border px-4 py-2"
            onClick={() => onProjectRemove(selectedProject)}
          >
            Delete
          </button>
        </div>

        <div className="pt-3 pb-3">
          <p className="text-gray-600">{getDueDateFormatted()}</p>
          <p className="border-b border-gray-400 mt-2 pb-3">
            {selectedProject.description}
          </p>
        </div>
      </div>

      <div className="py-2">
        <h1 className="font-bold text-4xl flex-grow pb-4">Tasks</h1>

        <div className="flex py-5">
          <input
            ref={newTaskInput}
            className="border border-gray-300 w-2/5 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="ml-3 text-gray-700" onClick={onAddTaskClick}>
            Add Task
          </button>
        </div>

        {!selectedProject.tasks.length && (
          <div className="py-5">
            <p>There are no tasks yet.</p>
          </div>
        )}

        {!!selectedProject.tasks.length && (
          <div className="px-5 py-8 bg-gray-300">
            {selectedProject.tasks.map((t) => (
              <div className="flex p-2" key={t.id}>
                <p>{t.name}</p>
                <button className="ml-auto" onClick={() => onRemoveTaskClick(t)}>
                  Clear
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
