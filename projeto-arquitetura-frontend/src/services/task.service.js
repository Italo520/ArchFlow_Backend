import ProjectService from './project.service';

const TaskService = {
    createTask: async (taskData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newTask = {
                    id: 't' + Date.now(),
                    description: taskData.description
                };
                ProjectService.addTask(taskData.projectId, taskData.stageId, newTask);
                resolve(newTask);
            }, 500);
        });
    },

    updateTaskStage: async (taskId, stageId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 300);
        });
    }
};

export default TaskService;
