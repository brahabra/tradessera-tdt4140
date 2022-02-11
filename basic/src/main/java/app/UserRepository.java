
package app;

import org.springframework.data.repository.CrudRepository;

// tag::code[]
public interface UserRepository extends CrudRepository<User, Long> { // <1>

}
// end::code[]
