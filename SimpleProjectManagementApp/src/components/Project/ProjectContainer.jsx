import { ProjectViewMode } from "../../enums/project-view-mode";
import CreateProjectForm from "./CreateProjectForm";
import EmptyProject from "./EmptyProject";
import SelectedProject from "./SelectedProject";

export default function ProjectContainer({
  selectedProjectState,
  projects,
  onAddProject,
  onProjectRemove,
  onAddTask,
  onRemoveTask,
  ...rest
}) {
  const selectedProject = projects.find(p => p.id === selectedProjectState.selectedProjectId);

  return (
    <div {...rest}>
      {selectedProjectState.viewMode === ProjectViewMode.EMPTY && (
        <EmptyProject />
      )}
      {selectedProjectState.viewMode === ProjectViewMode.CREATING && (
        <CreateProjectForm className="h-full" addProject={onAddProject} />
      )}
      {selectedProjectState.viewMode === ProjectViewMode.VIEW && (
        <SelectedProject
          selectedProject={selectedProject}
          onProjectRemove={onProjectRemove}
          onAddTask={onAddTask}
          onRemoveTask={onRemoveTask}
        />
      )}
    </div>
  );
}
