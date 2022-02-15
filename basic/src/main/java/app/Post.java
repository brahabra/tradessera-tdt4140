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
    private String title;
    private String text;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private User user;

    public Post(String title, String text) {
		this.title = title;
		this.text = text;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, title, text);
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
		return "Employee{" +
			"id=" + id +
			", username='" + title + '\'' +
			", password='" + text + '\'' +
			'}';
	}
}
