
package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// tag::code[]
@Component // <1>
public class DatabaseLoader implements CommandLineRunner { // <2>

	private final UserRepository repository;

	@Autowired // <3>
	public DatabaseLoader(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception { // <4>
		this.repository.save(new User("Frodo", "frodo@shire.com", "123"));
	}
}
// end::code[]
