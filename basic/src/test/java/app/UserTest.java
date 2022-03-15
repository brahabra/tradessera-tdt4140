package app;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;


public class UserTest {

    private User user;
    private Post post1;
    private Post post2;
    private Post post3;

    @BeforeEach
	public void setUp() throws Exception {
        this.user = new User("userone", "passone", "user1@ntnu.no","hei");
    }

    @Test
    @DisplayName ("Test contructor")
    public void testConstructor() {
        assertEquals("userone", this.user.getUsername(), "The usernames should be equal");
        assertEquals("passone", this.user.getPassword(), "The passwords should be equal");
    }

    @Test
    @DisplayName ("Test setters")
    public void testSetters() {
        this.user.setUsername("usertwo");
        assertEquals("usertwo", this.user.getUsername(), "The username should be changed");
        this.user.setPassword("passtwo");
        assertEquals("passtwo", this.user.getPassword(), "The password should be changed");
    }

    @Test
    @DisplayName("Test add posts")
    public void testAddPosts() {
        assertFalse(this.user.getPosts().contains(post1), "The post should not be posted yet");
        this.post1 = new Post("titleone", "textone", this.user, 200, "Trondhiem", "Konsert");
        this.user.addPost(this.post1);
        assertTrue(this.user.getPosts().contains(post1), "The post should be posted now");
        this.post2 = new Post("titletwo", "texttwo", this.user, 200, "Trondhiem", "Konsert");
        this.user.addPost(this.post2);
        assertEquals(Arrays.asList(this.post1, this.post2), this.user.getPosts(), "The lists of posts should be equal");
    }
    
    @Test
    @DisplayName("Test remove posts")
    public void testRemovePosts() {
        this.post1 = new Post("titleone", "textone", this.user, 200, "Trondhiem", "Konsert");
        this.post2 = new Post("titletwo", "texttwo", this.user, 200, "Trondhiem", "Konsert");
        this.post3 = new Post("titlethree", "textthree", this.user, 200, "Trondhiem", "Konsert");
        this.user.addPost(this.post1);
        this.user.addPost(this.post2);
        this.user.addPost(this.post3);
        assertEquals(Arrays.asList(this.post1, this.post2, this.post3), this.user.getPosts(), "The list of posts should contain all three posts");
        this.user.removePost(this.post1);
        assertEquals(Arrays.asList(this.post2,this.post3), this.user.getPosts(), "The lists of posts should be equal");
        
        }
}
