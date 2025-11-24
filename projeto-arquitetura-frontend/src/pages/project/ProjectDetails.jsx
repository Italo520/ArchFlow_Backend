import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDraggable,
    useDroppable,
    DragOverlay
} from '@dnd-kit/core';
import {
    SortableContext,
    horizontalListSortingStrategy,
    useSortable,
    arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ProjectService from '../../services/project.service';
import TaskService from '../../services/task.service';

function Draggable({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

function Droppable({ id, children, className }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className={className}>
            {children}
        </div>
    );
}

function SortableStage({ stage, onDelete, onEdit, onAddTask, editingStage, editStageName, setEditStageName, handleUpdateStage, startEditingStage }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: stage.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex w-72 flex-shrink-0 flex-col rounded-xl bg-neutral-100 dark:bg-neutral-800/50 p-3"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 flex-1">
                    {/* Drag Handle */}
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                        title="Arrastar para reordenar"
                    >
                        <span className="material-symbols-outlined text-neutral-500 dark:text-neutral-400 text-sm">drag_indicator</span>
                    </div>

                    {editingStage?.id === stage.id ? (
                        <input
                            type="text"
                            value={editStageName}
                            onChange={(e) => setEditStageName(e.target.value)}
                            onBlur={handleUpdateStage}
                            onKeyPress={(e) => e.key === 'Enter' && handleUpdateStage()}
                            className="text-[#151414] dark:text-neutral-100 text-sm font-bold bg-transparent border-b-2 border-primary focus:outline-none flex-1"
                            autoFocus
                        />
                    ) : (
                        <h2
                            className="text-[#151414] dark:text-neutral-100 text-sm font-bold leading-normal cursor-pointer flex-1"
                            onClick={() => startEditingStage(stage)}
                        >
                            {stage.name}
                        </h2>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300">
                        {stage.tasks.length}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(stage.id);
                        }}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Excluir status"
                    >
                        <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                </div>
            </div>

            <Droppable id={stage.id} className="flex-1 space-y-3 overflow-y-auto pr-1 min-h-[100px]">
                {stage.tasks.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 min-h-[100px]">
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">Nenhuma tarefa aqui.</p>
                    </div>
                ) : (
                    stage.tasks.map((task) => (
                        <Draggable key={task.id} id={task.id}>
                            <div className="flex cursor-grab active:cursor-grabbing flex-col gap-4 rounded-lg bg-background-light dark:bg-neutral-900 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                                <p className={`text-[#151414] dark:text-neutral-100 text-sm font-medium leading-tight ${stage.name === 'Concluído' ? 'line-through text-neutral-500 dark:text-neutral-400' : ''}`}>
                                    {task.description}
                                </p>
                            </div>
                        </Draggable>
                    ))
                )}
            </Droppable>

            <button
                onClick={() => onAddTask(stage.id)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700/50"
            >
                <span className="material-symbols-outlined text-base">add</span>
                Adicionar Tarefa
            </button>
        </div>
    );
}

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [selectedStageId, setSelectedStageId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
    const [newStageName, setNewStageName] = useState('');
    const [editingStage, setEditingStage] = useState(null);
    const [editStageName, setEditStageName] = useState('');
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        loadProject();
    }, [id]);

    const loadProject = async () => {
        try {
            const data = await ProjectService.getProjectById(id);
            setProject(data);
        } catch (error) {
            console.error("Error loading project", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Check if we're dragging a stage
        const isStage = project.stages.some(s => s.id === activeId);

        if (isStage) {
            // Reorder stages
            const oldIndex = project.stages.findIndex(s => s.id === activeId);
            const newIndex = project.stages.findIndex(s => s.id === overId);

            if (oldIndex !== newIndex) {
                const newStages = arrayMove(project.stages, oldIndex, newIndex);
                setProject({ ...project, stages: newStages });
                ProjectService.reorderStages(project.id, newStages);
            }
        } else {
            // Move task between stages
            const sourceStage = project.stages.find(stage => stage.tasks.some(task => task.id === activeId));
            const destStage = project.stages.find(stage => stage.id === overId || stage.tasks.some(task => task.id === overId));

            if (!sourceStage || !destStage) return;

            const newProject = { ...project };
            const sourceStageIndex = newProject.stages.findIndex(s => s.id === sourceStage.id);
            const destStageIndex = newProject.stages.findIndex(s => s.id === destStage.id);

            const taskIndex = newProject.stages[sourceStageIndex].tasks.findIndex(t => t.id === activeId);
            const task = newProject.stages[sourceStageIndex].tasks[taskIndex];

            newProject.stages[sourceStageIndex].tasks.splice(taskIndex, 1);
            newProject.stages[destStageIndex].tasks.push(task);

            setProject(newProject);

            try {
                await TaskService.updateTaskStage(activeId, destStage.id);
            } catch (error) {
                console.error("Error updating task stage", error);
                loadProject();
            }
        }
    };

    const handleCreateTask = async () => {
        if (!newTaskDescription || !selectedStageId) return;

        try {
            await TaskService.createTask({
                description: newTaskDescription,
                projectId: project.id,
                stageId: selectedStageId
            });
            setIsDialogOpen(false);
            setNewTaskDescription('');
            loadProject();
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    const openNewTaskDialog = (stageId) => {
        setSelectedStageId(stageId);
        setIsDialogOpen(true);
    };

    const handleAddStage = () => {
        if (!newStageName.trim()) return;

        const newStage = ProjectService.addStage(project.id, newStageName);
        if (newStage) {
            loadProject();
            setIsStageDialogOpen(false);
            setNewStageName('');
        }
    };

    const handleUpdateStage = () => {
        if (!editStageName.trim() || !editingStage) return;

        ProjectService.updateStage(project.id, editingStage.id, editStageName);
        loadProject();
        setEditingStage(null);
        setEditStageName('');
    };

    const handleDeleteStage = (stageId) => {
        const confirmed = window.confirm('Tem certeza que deseja excluir este status? As tarefas associadas serão perdidas.');
        if (confirmed) {
            const success = ProjectService.deleteStage(project.id, stageId);
            if (success) {
                const updatedProject = { ...project };
                updatedProject.stages = updatedProject.stages.filter(s => s.id !== stageId);
                setProject(updatedProject);
                setTimeout(() => loadProject(), 100);
            }
        }
    };

    const startEditingStage = (stage) => {
        setEditingStage(stage);
        setEditStageName(stage.name);
    };

    if (loading) return <div className="flex justify-center py-12">Carregando...</div>;
    if (!project) return <div className="flex justify-center py-12">Projeto não encontrado.</div>;

    const stageIds = project.stages.map(s => s.id);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display">
            <div className="relative flex h-screen min-h-screen w-full flex-col group/design-root overflow-hidden">
                {/* Top App Bar */}
                <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                    <div className="flex items-center p-4 pb-2 justify-between">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-[#151414] dark:text-neutral-200 flex size-12 -ml-3 shrink-0 items-center justify-center cursor-pointer"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="text-[#151414] dark:text-neutral-50 text-lg font-bold leading-tight tracking-[-0.015em] flex-1">{project.name}</h1>
                        <button
                            onClick={() => setIsStageDialogOpen(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                            Novo Status
                        </button>
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm font-normal leading-normal px-4 pb-3">Cliente: {project.clientName}</p>
                    <div className="h-px bg-neutral-200 dark:bg-neutral-800"></div>
                </header>

                {/* Kanban Board */}
                <main className="flex-1 overflow-x-auto overflow-y-hidden">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={stageIds} strategy={horizontalListSortingStrategy}>
                            <div className="flex h-full gap-4 p-4">
                                {project.stages.map((stage) => (
                                    <SortableStage
                                        key={stage.id}
                                        stage={stage}
                                        onDelete={handleDeleteStage}
                                        onAddTask={openNewTaskDialog}
                                        editingStage={editingStage}
                                        editStageName={editStageName}
                                        setEditStageName={setEditStageName}
                                        handleUpdateStage={handleUpdateStage}
                                        startEditingStage={startEditingStage}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </main>

                {/* Bottom Navigation */}
                <nav className="border-t border-neutral-200 dark:border-neutral-800 bg-background-light dark:bg-background-dark">
                    <div className="mx-auto flex max-w-md justify-around px-4 py-2">
                        <a className="flex flex-col items-center gap-1 p-2 text-primary dark:text-neutral-100" href="#">
                            <span className="material-symbols-outlined">grid_view</span>
                            <span className="text-xs font-bold">Projetos</span>
                        </a>
                        <a
                            className="flex flex-col items-center gap-1 p-2 text-neutral-500 dark:text-neutral-400 cursor-pointer"
                            onClick={(e) => { e.preventDefault(); alert('Funcionalidade em desenvolvimento'); }}
                        >
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-xs font-medium">Configurações</span>
                        </a>
                    </div>
                </nav>
            </div>

            {/* Modal for New Task */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-background-light dark:bg-neutral-900 p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-[#151414] dark:text-neutral-100">Nova Tarefa</h3>
                        <div className="mt-4">
                            <label className="sr-only" htmlFor="task-description">Descrição da tarefa</label>
                            <input
                                className="w-full rounded-lg border-neutral-300 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500 focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary text-sm p-3"
                                id="task-description"
                                placeholder="Ex: Desenhar planta da cozinha..."
                                type="text"
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateTask}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white dark:bg-neutral-100 dark:text-primary hover:bg-opacity-90"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for New Stage */}
            {isStageDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-background-light dark:bg-neutral-900 p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-[#151414] dark:text-neutral-100">Novo Status</h3>
                        <div className="mt-4">
                            <label className="sr-only" htmlFor="stage-name">Nome do status</label>
                            <input
                                className="w-full rounded-lg border-neutral-300 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500 focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary text-sm p-3"
                                id="stage-name"
                                placeholder="Ex: Em Análise..."
                                type="text"
                                value={newStageName}
                                onChange={(e) => setNewStageName(e.target.value)}
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setIsStageDialogOpen(false)}
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddStage}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white dark:bg-neutral-100 dark:text-primary hover:bg-opacity-90"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
