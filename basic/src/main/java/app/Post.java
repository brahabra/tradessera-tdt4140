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

	private String username;
	private String email;
    private String title;
    private String text;
	private int price;

	public Post() {}

    public Post(String title, String text, User user, int price) {
		this.user = user;
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.title = title;
		this.text = text;
		this.price = price;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, user, title, text, price);
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public User getUser() {
		return user;
	}

	public String getUsername() {
		return username;
	}

	public String getEmail() {
		return email;
	}

	public void setUser(User user) {
		this.user = user;
	}

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
		return "Post{" +
			"id=" + id +
			", Title='" + title + '\'' +
			", text='" + text + '\'' +
			", username='" + username + '\'' +
			", price='" + String.valueOf(price) + '\'' +
			'}';
	}
}
