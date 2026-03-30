package dk.via.viatab.backend.seed;

import dk.via.viatab.backend.entity.Department;
import dk.via.viatab.backend.entity.RoleName;
import dk.via.viatab.backend.entity.Story;
import dk.via.viatab.backend.entity.StoryStatus;
import dk.via.viatab.backend.entity.User;
import dk.via.viatab.backend.repository.StoryRepository;
import dk.via.viatab.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository,
                          StoryRepository storyRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.storyRepository = storyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@viatab.dk")) {
            User admin = new User();
            admin.setFullName("VIATAB Administrator");
            admin.setEmail("admin@viatab.dk");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRoles(Collections.singleton(RoleName.ADMIN));
            userRepository.save(admin);
        }

        if (storyRepository.count() == 0) {
            User admin = userRepository.findByEmail("admin@viatab.dk").orElseThrow();

            Story softwareStory = new Story(
                    "Breakthrough in VIA Software Engineering",
                    "A new campus project raises student engagement.",
                    "Software Engineering students at VIA Horsens launched a collaborative platform that allows rapid prototyping of campus services.",
                    Department.SOFTWARE_ENGINEERING,
                    StoryStatus.PUBLISHED,
                    "https://example.com/images/software.jpg",
                    "Innovation",
                    admin
            );

            Story businessStory = new Story(
                    "Business faculty secures new partner",
                    "Industry partner expands hands-on learning.",
                    "The Business department is introducing a new case-study lab with local firms supporting real consulting projects.",
                    Department.BUSINESS,
                    StoryStatus.PUBLISHED,
                    "https://example.com/images/business.jpg",
                    "Partnership",
                    admin
            );

            Story constructionStory = new Story(
                    "Construction students prototype smart buildings",
                    "Sustainability and sensors become central in the lab.",
                    "Construction engineering students developed a sensor network that monitors energy use and structural health in a smart building model.",
                    Department.CONSTRUCTION,
                    StoryStatus.PUBLISHED,
                    "https://example.com/images/construction.jpg",
                    "Sustainability",
                    admin
            );

            storyRepository.save(softwareStory);
            storyRepository.save(businessStory);
            storyRepository.save(constructionStory);
        }
    }
}
