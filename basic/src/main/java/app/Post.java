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
	private int price;
	private String location;
	private String eventType;
	private String dateOfEvent;
	private String timeOfEvent;
	private String comment;
	private int rating;
	private boolean closed;

	public Post() {}

    public Post(String title, User user, int price, String location, String eventType, String dateOfEvent, String timeOfEvent, String comment, String... closed) {
		boolean closed1 = closed.length > 0 ? true : false;
		this.user = user;
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.title = title;
		this.price = price;
		this.location = location;
		this.eventType = eventType;
		this.dateOfEvent = dateOfEvent;
		this.timeOfEvent = timeOfEvent;
		this.comment = comment;
		this.rating = user.getRating();
		this.closed = closed1;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, user, title, price, location, eventType, dateOfEvent, timeOfEvent, comment, rating);
	}

	public String getTimeOfEvent() {
		return timeOfEvent;
	}

	public void setTimeOfEvent(String timeOfEvent) {
		this.timeOfEvent = timeOfEvent;
	}

	public String getDateOfEvent() {
		return dateOfEvent;
	}
	
	public void setDateOfEvent(String dateOfEvent) {
		this.dateOfEvent = dateOfEvent;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}	

	public boolean getClosed() {
		return closed;
	}

	public void setClosed(boolean closed) {
		this.closed = closed;
	}	

	@Override
	public String toString() {
		return "Post{" +
			"id=" + id +
			", Title='" + title + '\'' +
			", username='" + username + '\'' +
			", price='" + String.valueOf(price) + '\'' +
			", rating='" + String.valueOf(rating) + '\'' +
			'}';
	}
}
