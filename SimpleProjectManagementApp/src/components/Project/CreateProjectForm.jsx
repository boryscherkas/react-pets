import { useRef } from "react";
import Input from "../Input.jsx";
import Modal from "../Modal.jsx";

export default function CreateProjectForm({ addProject, ...rest }) {
  const modalRef = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const today = new Date();

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const formattedNow = `${nextWeek.getFullYear()}-${String(nextWeek.getMonth() + 1).padStart(2, '0')}-${String(nextWeek.getDate()).padStart(2, '0')}`;

  function handleSubmit() {
    // event.preventDefault();

    if (!title.current.value?.trim() 
      || !description.current.value?.trim() 
      || !dueDate.current.value?.trim()) {
      modalRef.current.open();
      return;
    }

    const dueDateTypedValue = new Date(dueDate.current.value);
    if (dueDateTypedValue <= today) {
      modalRef.current.open();
      return;
    }

    addProject({
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDateTypedValue,
      tasks: []
    });
  }

  return (
    <>
    <Modal ref={modalRef}>
      <p className="font-bold text-center mb-2 text-gray-800 text-2xl p-5">Invalid input</p>
    </Modal>
    <div
      {...rest}
      className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg"
    >
      <h1 className="text-center font-bold text-2xl mb-6 text-gray-800">
        Create Project
      </h1>

      <div className="space-y-4">
        <Input
          ref={title}
          label="Title"
          type="text"
          required
        />
        <Input
          ref={description}
          label="Description"
          type="text"
          required
        />
        <Input
          ref={dueDate}
          label="Due date"
          type="date"
          defaultValue={formattedNow}
          required
        />

        <button
          // type="submit"
          onClick={handleSubmit}
          value="Save"
          className=" w-full bg-blue-600 text-white font-semibold 
          py-2 rounded-md shadow-md 
          hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >Save</button>
      </div>
    </div>
    </>
  );
}
