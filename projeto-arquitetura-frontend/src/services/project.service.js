const mockProjects = [
    {
        id: 1,
        name: 'Residência no Lago Sul',
        clientName: 'Família Oliveira',
        status: 'IN_PROGRESS',
        stages: [
            {
                id: 'todo',
                name: 'A Fazer',
                tasks: [
                    { id: 't1', description: 'Definir layout do piso térreo' },
                    { id: 't2', description: 'Revisar projeto elétrico com engenheiro' }
                ]
            },
            {
                id: 'in_progress',
                name: 'Em Andamento',
                tasks: [
                    { id: 't3', description: 'Orçamento com fornecedores de mármore' }
                ]
            },
            {
                id: 'review',
                name: 'Revisão',
                tasks: []
            },
            {
                id: 'done',
                name: 'Concluído',
                tasks: [
                    { id: 't4', description: 'Contratar equipe de demolição' }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Edifício Comercial',
        clientName: 'Empresa ACME',
        status: 'DONE',
        stages: []
    },
    {
        id: 3,
        name: 'Reforma Apartamento',
        clientName: 'Sr. e Sra. Silva',
        status: 'TO_DO',
        stages: []
    }
];

const ProjectService = {
    getAllProjects: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockProjects);
            }, 500);
        });
    },

    createProject: async (projectData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newProject = {
                    id: mockProjects.length + 1,
                    ...projectData,
                    status: 'TO_DO',
                    stages: [
                        { id: 'todo', name: 'A Fazer', tasks: [] },
                        { id: 'in_progress', name: 'Em Andamento', tasks: [] },
                        { id: 'review', name: 'Revisão', tasks: [] },
                        { id: 'done', name: 'Concluído', tasks: [] }
                    ]
                };
                mockProjects.push(newProject);
                resolve(newProject);
            }, 500);
        });
    },

    getProjectById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const project = mockProjects.find(p => p.id === parseInt(id));
                if (project) {
                    // Ensure stages exist if not present
                    if (!project.stages || project.stages.length === 0) {
                        project.stages = [
                            { id: 'todo', name: 'A Fazer', tasks: [] },
                            { id: 'in_progress', name: 'Em Andamento', tasks: [] },
                            { id: 'review', name: 'Revisão', tasks: [] },
                            { id: 'done', name: 'Concluído', tasks: [] }
                        ];
                    }
                    resolve(project);
                } else {
                    reject(new Error('Project not found'));
                }
            }, 500);
        });
    },

    addTask: (projectId, stageId, task) => {
        const project = mockProjects.find(p => p.id === parseInt(projectId));
        if (project) {
            const stage = project.stages.find(s => s.id === stageId);
            if (stage) {
                stage.tasks.push(task);
            }
        }
    },

    addStage: (projectId, stageName) => {
        const project = mockProjects.find(p => p.id === parseInt(projectId));
        if (project) {
            const newStage = {
                id: 'stage_' + Date.now(),
                name: stageName,
                tasks: []
            };
            project.stages.push(newStage);
            return newStage;
        }
        return null;
    },

    updateStage: (projectId, stageId, newName) => {
        const project = mockProjects.find(p => p.id === parseInt(projectId));
        if (project) {
            const stage = project.stages.find(s => s.id === stageId);
            if (stage) {
                stage.name = newName;
                return stage;
            }
        }
        return null;
    },

    deleteStage: (projectId, stageId) => {
        console.log('Attempting to delete stage:', { projectId, stageId });
        const project = mockProjects.find(p => p.id === parseInt(projectId));
        if (project) {
            console.log('Project found:', project);
            const stageIndex = project.stages.findIndex(s => s.id === stageId);
            console.log('Stage index:', stageIndex);
            if (stageIndex !== -1) {
                console.log('Deleting stage at index:', stageIndex);
                project.stages.splice(stageIndex, 1);
                console.log('Stages after deletion:', project.stages);
                return true;
            }
        }
        console.log('Failed to delete stage');
        return false;
    },

    reorderStages: (projectId, newStagesOrder) => {
        const project = mockProjects.find(p => p.id === parseInt(projectId));
        if (project) {
            project.stages = newStagesOrder;
            return true;
        }
        return false;
    }
};

export default ProjectService;
