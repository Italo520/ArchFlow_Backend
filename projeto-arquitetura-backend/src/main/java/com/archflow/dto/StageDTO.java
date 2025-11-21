package com.archflow.dto;

import java.util.List;
import java.util.UUID;

public class StageDTO {
    private UUID id;
    private String name;
    private Integer order;
    private List<TaskDTO> tasks;

    public StageDTO() {
    }

    public StageDTO(UUID id, String name, Integer order, List<TaskDTO> tasks) {
        this.id = id;
        this.name = name;
        this.order = order;
        this.tasks = tasks;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }
}
