import { useState } from "react";
import SideMenu from "./components/SideMenu";
import ProjectContainer from "./components/Project/ProjectContainer";
import { ProjectViewMode } from "./enums/project-view-mode";

function App() {
  const [projects, setProjects] = useState([]);

  const [selectedProjectState, setSelectedProjectState] = useState({
    viewMode: ProjectViewMode.EMPTY,
    selectedProjectId: null,
  });

  function goToEmptyViewMode() {
    setSelectedProjectState({
      viewMode: ProjectViewMode.EMPTY,
      selectedProjectId: null,
    });
  }

  function onSelectProject(project) {
    setSelectedProjectState({
      viewMode: ProjectViewMode.VIEW,
      selectedProjectId: project.id,
    });
  }

  function onOpenAddProjectForm() {
    setSelectedProjectState({
      viewMode: ProjectViewMode.CREATING,
      selectedProjectId: null,
    });
  }

  function onAddProject(project) {
    setProjects((prevState) => {
      const id = prevState[0] ? prevState[0].id + 1 : 1;

      const newProject = {
        ...project,
        id: id,
        tasks: [],
      };

      onSelectProject(newProject);

      return [newProject, ...prevState];
    });
  }

  function onProjectRemove(project) {
    setProjects((prevState) => {
      const newProjectsList = prevState.filter((p) => p.id !== project.id);

      goToEmptyViewMode();

      return newProjectsList;
    });
  }

  function onAddTask(project, taskName) {
    setProjects((prevState) => {
      const proj = prevState.find(p => p.id === project.id);

      const newTask = {
        id: proj.tasks[0] ? proj.tasks[0].id + 1 : 1,
        name: taskName,
      };

      const projectTasks = [newTask, ...proj.tasks];

      const newProject = { ...proj, tasks: projectTasks };

      return [newProject, ...prevState.filter((p) => p.id !== proj.id)];
    });
  }

  function onRemoveTask(project, task) {
    setProjects((prevState) => {
      const proj = prevState.find(p => p.id === project.id);

      const projectTasks = proj.tasks.filter(
        (t) => t.id !== task.id
      );

      const newProject = { ...proj, tasks: projectTasks };

      return [newProject, ...prevState.filter((p) => p.id !== proj.id)];
    });
  }

  return (
    <div className="h-full">
      <SideMenu
        className="inline-block w-2/6 h-screen bg-gray-100 shadow-md"
        projects={projects}
        onOpenAddProjectForm={onOpenAddProjectForm}
        onSelectProjectClick={onSelectProject}
      />

      <ProjectContainer
        className="inline-block w-4/6 h-screen align-top bg-slate-200"
        selectedProjectState={selectedProjectState}
        projects={projects}
        onAddProject={onAddProject}
        onProjectRemove={onProjectRemove}
        onAddTask={onAddTask}
        onRemoveTask={onRemoveTask}
      />
    </div>
  );
}

export default App;
