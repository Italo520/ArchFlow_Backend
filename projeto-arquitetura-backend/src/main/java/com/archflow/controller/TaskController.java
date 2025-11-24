package com.archflow.controller;

import com.archflow.dto.CreateTaskRequest;
import com.archflow.dto.TaskDTO;
import com.archflow.dto.UpdateTaskStageRequest;
import com.archflow.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody @NonNull CreateTaskRequest request) {
        return ResponseEntity.ok(taskService.createTask(request));
    }

    @PatchMapping("/{id}/stage")
    public ResponseEntity<TaskDTO> updateTaskStage(@PathVariable @NonNull UUID id,
            @RequestBody @NonNull UpdateTaskStageRequest request) {
        return ResponseEntity.ok(taskService.updateTaskStage(id, request));
    }
}
