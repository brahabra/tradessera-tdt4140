package app;


import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> { // <1>

}