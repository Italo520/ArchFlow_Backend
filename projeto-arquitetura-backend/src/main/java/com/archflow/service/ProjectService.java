package com.archflow.service;

import com.archflow.dto.ProjectDTO;
import com.archflow.model.Project;
import com.archflow.model.User;
import com.archflow.repository.ProjectRepository;
import com.archflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.archflow.repository.StageRepository stageRepository;

    @Autowired
    private com.archflow.repository.TaskRepository taskRepository;

    public ProjectDTO createProject(@NonNull ProjectDTO projectDTO) {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .getUsername();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Project project = new Project();
        project.setName(projectDTO.getName());
        project.setClientName(projectDTO.getClientName());
        project.setStatus("TO_DO"); // Default status
        project.setOwner(user);

        Project savedProject = projectRepository.save(project);

        // Create default stages
        createDefaultStages(savedProject);

        return mapToDTO(savedProject);
    }

    private void createDefaultStages(@NonNull Project project) {
        List<String> defaultStages = List.of("To Do", "In Progress", "Done");
        for (int i = 0; i < defaultStages.size(); i++) {
            com.archflow.model.Stage stage = new com.archflow.model.Stage();
            stage.setName(defaultStages.get(i));
            stage.setOrder(i);
            stage.setProject(project);
            stageRepository.save(stage);
        }
    }

    public List<ProjectDTO> getUserProjects() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .getUsername();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return projectRepository.findByOwnerId(user.getId()).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public com.archflow.dto.ProjectDetailsDTO getProjectById(@NonNull UUID id, UUID assigneeId) {
        Project project = projectRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new RuntimeException("Project not found"));

        List<com.archflow.model.Stage> stages = stageRepository.findByProjectIdOrderByOrderAsc(id);
        List<com.archflow.model.Task> tasks = taskRepository.findByProjectId(id);

        if (assigneeId != null) {
            tasks = tasks.stream()
                    .filter(task -> task.getAssignee() != null && task.getAssignee().getId().equals(assigneeId))
                    .collect(Collectors.toList());
        }

        final List<com.archflow.model.Task> finalTasks = tasks;

        List<com.archflow.dto.StageDTO> stageDTOs = stages.stream().map(stage -> {
            List<com.archflow.dto.TaskDTO> stageTasks = finalTasks.stream()
                    .filter(task -> task.getStage().getId().equals(stage.getId()))
                    .map(this::mapToTaskDTO)
                    .collect(Collectors.toList());
            return new com.archflow.dto.StageDTO(
                    Objects.requireNonNull(stage.getId()),
                    stage.getName(),
                    stage.getOrder(),
                    stageTasks);
        }).collect(Collectors.toList());

        return new com.archflow.dto.ProjectDetailsDTO(
                Objects.requireNonNull(project.getId()),
                project.getName(),
                project.getClientName(),
                project.getStatus(),
                stageDTOs);
    }

    private ProjectDTO mapToDTO(@NonNull Project project) {
        return new ProjectDTO(
                Objects.requireNonNull(project.getId()),
                project.getName(),
                project.getClientName(),
                project.getStatus());
    }

    private com.archflow.dto.TaskDTO mapToTaskDTO(@NonNull com.archflow.model.Task task) {
        return new com.archflow.dto.TaskDTO(
                Objects.requireNonNull(task.getId()),
                task.getDescription(),
                Objects.requireNonNull(task.getStage().getId()),
                task.getAssignee() != null ? task.getAssignee().getId() : null);
    }
}
