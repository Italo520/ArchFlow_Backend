import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ProjectService from '../../services/project.service';
import TaskService from '../../services/task.service';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../../components/ui/dialog';
import { ArrowLeft, Plus } from 'lucide-react';

// Placeholder for Dialog components since we haven't created them yet
// I'll create a simple version inline or use what I have.
// Actually, I should create the Dialog component properly.

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [selectedStageId, setSelectedStageId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
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

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const overId = over.id;

        // Find source and destination stages
        const sourceStage = project.stages.find(stage => stage.tasks.some(task => task.id === taskId));
        const destStage = project.stages.find(stage => stage.id === overId || stage.tasks.some(task => task.id === overId));

        if (!sourceStage || !destStage) return;

        // Optimistic update
        const newProject = { ...project };
        const sourceStageIndex = newProject.stages.findIndex(s => s.id === sourceStage.id);
        const destStageIndex = newProject.stages.findIndex(s => s.id === destStage.id);

        const taskIndex = newProject.stages[sourceStageIndex].tasks.findIndex(t => t.id === taskId);
        const task = newProject.stages[sourceStageIndex].tasks[taskIndex];

        // Remove from source
        newProject.stages[sourceStageIndex].tasks.splice(taskIndex, 1);

        // Add to destination
        // If dropped on a container (stage), add to end. If dropped on a task, add after it?
        // For simplicity, just add to the destination stage tasks
        newProject.stages[destStageIndex].tasks.push(task);

        setProject(newProject);

        // API Call
        try {
            await TaskService.updateTaskStage(taskId, destStage.id);
        } catch (error) {
            console.error("Error updating task stage", error);
            loadProject(); // Revert on error
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

    if (loading) return <div className="flex justify-center py-12">Carregando...</div>;
    if (!project) return <div className="flex justify-center py-12">Projeto não encontrado.</div>;

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-xl font-bold">{project.name}</h1>
                    <span className="text-muted-foreground text-sm">{project.clientName}</span>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 overflow-x-auto">
                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                    <div className="flex gap-6 min-w-max">
                        {project.stages.map((stage) => (
                            <div key={stage.id} className="w-80 flex-shrink-0">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-lg">{stage.name}</h3>
                                    <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                                        {stage.tasks.length}
                                    </span>
                                </div>

                                {/* Droppable Area */}
                                <Droppable id={stage.id} className="bg-muted/50 rounded-lg p-4 min-h-[500px] flex flex-col gap-3">
                                    {stage.tasks.map((task) => (
                                        <Draggable key={task.id} id={task.id}>
                                            <Card className="cursor-grab active:cursor-grabbing hover:shadow-md">
                                                <CardContent className="p-4">
                                                    <p className="text-sm">{task.description}</p>
                                                </CardContent>
                                            </Card>
                                        </Draggable>
                                    ))}
                                    <Button variant="ghost" className="w-full mt-2 border-dashed border" onClick={() => openNewTaskDialog(stage.id)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Adicionar Tarefa
                                    </Button>
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DndContext>
            </main>

            {/* Simple Modal for New Task */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-[400px]">
                        <CardHeader>
                            <CardTitle>Nova Tarefa</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="description">Descrição</Label>
                                    <Input
                                        id="description"
                                        value={newTaskDescription}
                                        onChange={(e) => setNewTaskDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <div className="flex items-center p-6 pt-0 justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                            <Button onClick={handleCreateTask}>Criar</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

import { useDraggable, useDroppable } from '@dnd-kit/core';

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
