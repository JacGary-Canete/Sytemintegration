package edu.cit.canete.activity01.repository;

import edu.cit.canete.activity01.model.ServiceRequest;
import edu.cit.canete.activity01.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByCreatedBy(User user);
    Optional<ServiceRequest> findByIdAndCreatedBy(Long id, User user);
}