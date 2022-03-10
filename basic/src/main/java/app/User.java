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
	private String email;
	private String bio;
	private int rating;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private Collection<Post> posts = new ArrayList<>();

	public User() {}
	
	public User(String username, String password, String email, String bio) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.bio = bio;
		this.rating = 0;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, username, password);
	}

	public Long getId() {
		return id;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
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

	public void addPost(Post post) {
		posts.add(post);
	}

	public void removePost(Post post) {
		posts.remove(post);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<Post> getPosts() {
		return posts;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getBio() {
		return bio;
	}

	@Override
	public String toString() {
		return "User{" +
			"id=" + id +
			", username='" + username + '\'' +
			", password='" + password + '\'' +
			", email='" + email + '\'' +
			", rating='" + rating + '\'' +
			'}';
	}
}

