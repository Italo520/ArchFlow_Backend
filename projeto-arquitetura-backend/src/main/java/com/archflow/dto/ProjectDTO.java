package com.archflow.dto;

import java.util.UUID;

public class ProjectDTO {
    private UUID id;
    private String name;
    private String clientName;
    private String status;

    public ProjectDTO() {
    }

    public ProjectDTO(UUID id, String name, String clientName, String status) {
        this.id = id;
        this.name = name;
        this.clientName = clientName;
        this.status = status;
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

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
