package com.archflow.service;

import com.archflow.dto.CreateTaskRequest;
import com.archflow.dto.TaskDTO;
import com.archflow.dto.UpdateTaskStageRequest;
import com.archflow.model.Project;
import com.archflow.model.Stage;
import com.archflow.model.Task;
import com.archflow.model.User;
import com.archflow.repository.ProjectRepository;
import com.archflow.repository.StageRepository;
import com.archflow.repository.TaskRepository;
import com.archflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
public class TaskService {

        @Autowired
        private TaskRepository taskRepository;

        @Autowired
        private ProjectRepository projectRepository;

        @Autowired
        private StageRepository stageRepository;

        @Autowired
        private UserRepository userRepository;

        public TaskDTO createTask(@NonNull CreateTaskRequest request) {
                Project project = projectRepository.findById(Objects.requireNonNull(request.getProjectId()))
                                .orElseThrow(() -> new RuntimeException("Project not found"));

                Stage stage = stageRepository.findById(Objects.requireNonNull(request.getStageId()))
                                .orElseThrow(() -> new RuntimeException("Stage not found"));

                User assignee = null;
                if (request.getAssigneeId() != null) {
                        assignee = userRepository.findById(Objects.requireNonNull(request.getAssigneeId()))
                                        .orElseThrow(() -> new RuntimeException("Assignee not found"));
                }

                Task task = new Task();
                task.setDescription(request.getDescription());
                task.setProject(project);
                task.setStage(stage);
                task.setAssignee(assignee);

                Task savedTask = taskRepository.save(task);
                return mapToDTO(savedTask);
        }

        public TaskDTO updateTaskStage(@NonNull UUID taskId, @NonNull UpdateTaskStageRequest request) {
                Task task = taskRepository.findById(Objects.requireNonNull(taskId))
                                .orElseThrow(() -> new RuntimeException("Task not found"));

                Stage stage = stageRepository.findById(Objects.requireNonNull(request.getStageId()))
                                .orElseThrow(() -> new RuntimeException("Stage not found"));

                task.setStage(stage);
                Task updatedTask = taskRepository.save(task);
                return mapToDTO(updatedTask);
        }

        private TaskDTO mapToDTO(@NonNull Task task) {
                return new TaskDTO(
                                Objects.requireNonNull(task.getId()),
                                task.getDescription(),
                                Objects.requireNonNull(task.getStage().getId()),
                                task.getAssignee() != null ? task.getAssignee().getId() : null);
        }
}
