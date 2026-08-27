package edu.cit.canete.activity01.controller;

import edu.cit.canete.activity01.model.ServiceRequest;
import edu.cit.canete.activity01.model.User;
import edu.cit.canete.activity01.repository.ServiceRequestRepository;
import edu.cit.canete.activity01.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser(Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found in database"));
    }

    @PostMapping
    public ResponseEntity<ServiceRequest> createRequest(@RequestBody ServiceRequest request, Principal principal) {
        User currentUser = getAuthenticatedUser(principal);
        request.setCreatedBy(currentUser);

        ServiceRequest savedRequest = requestRepository.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
    }

    @GetMapping
    public ResponseEntity<List<ServiceRequest>> getMyRequests(Principal principal) {
        User currentUser = getAuthenticatedUser(principal);
        List<ServiceRequest> requests = requestRepository.findByCreatedBy(currentUser);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequest> getRequestById(@PathVariable Long id, Principal principal) {
        User currentUser = getAuthenticatedUser(principal);

        return requestRepository.findByIdAndCreatedBy(id, currentUser)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceRequest> updateRequest(@PathVariable Long id, @RequestBody ServiceRequest updatedRequest, Principal principal) {
        User currentUser = getAuthenticatedUser(principal);

        Optional<ServiceRequest> existingRequestOpt = requestRepository.findByIdAndCreatedBy(id, currentUser);
        if (existingRequestOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ServiceRequest existingRequest = existingRequestOpt.get();
        existingRequest.setTitle(updatedRequest.getTitle());
        existingRequest.setDescription(updatedRequest.getDescription());
        existingRequest.setCategory(updatedRequest.getCategory());

        requestRepository.save(existingRequest);
        return ResponseEntity.ok(existingRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable Long id, Principal principal) {
        User currentUser = getAuthenticatedUser(principal);

        Optional<ServiceRequest> existingRequestOpt = requestRepository.findByIdAndCreatedBy(id, currentUser);
        if (existingRequestOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        requestRepository.delete(existingRequestOpt.get());
        return ResponseEntity.ok().body("Deleted successfully");
    }
}