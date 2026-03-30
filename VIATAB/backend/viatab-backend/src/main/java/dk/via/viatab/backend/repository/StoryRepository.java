package dk.via.viatab.backend.repository;

import dk.via.viatab.backend.entity.Department;
import dk.via.viatab.backend.entity.Story;
import dk.via.viatab.backend.entity.StoryStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {

    @Query("""
            SELECT s FROM Story s
            WHERE (:department IS NULL OR s.department = :department)
            AND (:status IS NULL OR s.status = :status)
            AND (
                :search IS NULL OR :search = '' OR
                LOWER(s.title) LIKE LOWER(CONCAT('%', :search, '%')) OR
                LOWER(s.caption) LIKE LOWER(CONCAT('%', :search, '%')) OR
                LOWER(s.category) LIKE LOWER(CONCAT('%', :search, '%'))
            )
            """)
    Page<Story> searchStories(@Param("department") Department department,
            @Param("status") StoryStatus status,
            @Param("search") String search,
            Pageable pageable);

    // 👉 ADD THIS BACK
    Page<Story> findByAuthorId(Long authorId, Pageable pageable);
}
