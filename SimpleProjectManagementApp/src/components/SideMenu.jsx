export default function SideMenu({
  projects,
  onOpenAddProjectForm,
  onSelectProjectClick,
  ...rest
}) {
  return (
    <div {...rest}>
      <h1 className="font-bold text-2xl p-6 border-b border-gray-300">
        Your Projects
      </h1>

      <button
        onClick={onOpenAddProjectForm}
        className="border-l-amber-800 border-1 rounded-md m-7 p-2 
        text-white font-semibold
        bg-orange-500
        shadow-xl
        transition-colors duration-300
        hover:bg-orange-600"
      >
        Add Project
      </button>

      <div className="p-7">
        {!!projects?.length && (
          <div className="">
            {projects.map((p) => (
            <p
              key={p.title + p.description}
              className="mb-4 text-gray-700 font-medium"
              onClick={() => onSelectProjectClick(p)}
            >
              {p.title}
            </p>
            ))}
          </div>
        )}
        {!projects?.length && (
          <p className="text-gray-500 italic text-xl font-semibold">
            Add first project to start.
          </p>
        )}
      </div>
    </div>
  );
}
