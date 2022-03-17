package app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// tag::code[]
@Controller // <1>
public class HomeController {

	@RequestMapping(value = {"/", "/login", "/users", "/register", "/posts", "/createPost", "/profile", "/admin", "/userProfile"}) // <2>
	public String index() {
		return "index"; // <3>
	}

}
// end::code[]
