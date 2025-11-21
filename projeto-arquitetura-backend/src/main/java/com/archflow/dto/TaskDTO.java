package com.archflow.dto;

import java.util.UUID;

public class TaskDTO {
    private UUID id;
    private String description;
    private UUID stageId;
    private UUID assigneeId;

    public TaskDTO() {
    }

    public TaskDTO(UUID id, String description, UUID stageId, UUID assigneeId) {
        this.id = id;
        this.description = description;
        this.stageId = stageId;
        this.assigneeId = assigneeId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UUID getStageId() {
        return stageId;
    }

    public void setStageId(UUID stageId) {
        this.stageId = stageId;
    }

    public UUID getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(UUID assigneeId) {
        this.assigneeId = assigneeId;
    }
}
