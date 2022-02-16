package app;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Post {
    private @Id @GeneratedValue Long id;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private User user;

    private String title;
    private String text;

	private Post() {}

    public Post(String user, String title, String text) {
		this.user = new User(user, "password");
		this.title = title;
		this.text = text;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, user, title, text);
	}

	/*
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	*/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}	

	@Override
	public String toString() {
		return "Employee{" +
			"id=" + id +
			", username='" + title + '\'' +
			", password='" + text + '\'' +
			'}';
	}
}
