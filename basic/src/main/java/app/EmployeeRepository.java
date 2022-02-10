package app;

import org.springframework.data.repository.CrudRepository;

// tag::code[]
public interface EmployeeRepository extends CrudRepository<Employee, Long> { // <1>

}
// end::code[]
