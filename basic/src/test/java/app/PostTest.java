package app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

public class PostTest {

    private User user1;
    private User user2;
    private Post post1;

    @BeforeEach
	public void setUp() throws Exception {
        this.user1 = new User("userone", "passone", "user1@ntnu.no","Hei", 0, 0);
        this.user2 = new User("usertwo", "passtwo", "user2@ntnu.no","Hå", 0, 0);
        this.post1 = new Post("titleone", this.user1, 200, "Trondhiem", "Konsert", "20.04.22", "18:30", "commentone");
    }

    @Test
    @DisplayName ("Test user")
    public void testUser() {
        assertEquals(this.user1, this.post1.getUser(), "The user and the post are not connected");
        assertEquals("userone", this.post1.getUsername(), "The username is not correct");
        this.post1.setUser(user2);
        assertEquals(this.user2, this.post1.getUser(), "The user should be changed now");
    }

    @Test
    @DisplayName ("Test title")
    public void testTitle() {
        assertEquals("titleone", this.post1.getTitle(), "The title is not as expected");
        this.post1.setTitle("newtitle");
        assertEquals("newtitle", this.post1.getTitle(), "The title should be changed now");
    }

    @Test
    @DisplayName ("Test comment")
    public void testComment() {
        assertEquals("commentone", this.post1.getComment(), "The comment is not as expected");
        this.post1.setComment("newcomment");
        assertEquals("newcomment", this.post1.getComment(), "The comment should be chaanged now");
    } 
}
