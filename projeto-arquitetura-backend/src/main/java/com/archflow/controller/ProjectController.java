package com.archflow.controller;

import com.archflow.dto.ProjectDTO;
import com.archflow.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.createProject(projectDTO));
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getUserProjects() {
        return ResponseEntity.ok(projectService.getUserProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.archflow.dto.ProjectDetailsDTO> getProjectById(
            @PathVariable UUID id,
            @RequestParam(required = false) UUID assigneeId) {
        return ResponseEntity.ok(projectService.getProjectById(id, assigneeId));
    }
}
