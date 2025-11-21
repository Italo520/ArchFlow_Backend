import api from './api';

const TaskService = {
    createTask: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    updateTaskStage: async (taskId, stageId) => {
        const response = await api.patch(`/tasks/${taskId}/stage`, { stageId });
        return response.data;
    }
};

export default TaskService;
