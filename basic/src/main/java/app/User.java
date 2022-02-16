package app;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class User {

	private @Id @GeneratedValue Long id;
	private String username;
	private String password;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private Collection<Post> posts = new ArrayList<>();

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}
/*
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Employee employee = (Employee) o;
		return Objects.equals(id, employee.id) &&
			Objects.equals(firstName, employee.firstName) &&
			Objects.equals(lastName, employee.lastName) &&
			Objects.equals(description, employee.description);
	}
*/
	@Override
	public int hashCode() {
		return Objects.hash(id, username, password);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void addPosts(Post post) {
		posts.add(post);
	}

	public void removePosts(Post post) {
		posts.remove(post);
	}

	@Override
	public String toString() {
		return "Employee{" +
			"id=" + id +
			", username='" + username + '\'' +
			", password='" + password + '\'' +
			'}';
	}
}

