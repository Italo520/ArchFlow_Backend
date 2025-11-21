package com.archflow.repository;

import com.archflow.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StageRepository extends JpaRepository<Stage, UUID> {
    List<Stage> findByProjectIdOrderByOrderAsc(UUID projectId);
}
