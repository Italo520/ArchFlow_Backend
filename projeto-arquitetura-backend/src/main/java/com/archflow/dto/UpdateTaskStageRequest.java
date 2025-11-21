package com.archflow.dto;

import java.util.UUID;

public class UpdateTaskStageRequest {
    private UUID stageId;

    public UUID getStageId() {
        return stageId;
    }

    public void setStageId(UUID stageId) {
        this.stageId = stageId;
    }
}
