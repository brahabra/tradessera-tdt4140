package app;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Report {
    private @Id @GeneratedValue Long id;

	private String reporter;
	private String reported;

	public Report() {}

    public Report(String reporter, String reported) {
		this.reporter = reporter;
		this.reported = reported;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, reporter, reported);
	}

	public String getReporter() {
		return reporter;
	}

	public void setReporter(String reporter) {
		this.reporter = reporter;
	}

	public String getReported() {
		return reported;
	}

	public void setReported(String reported) {
		this.reported = reported;
	}

	

	@Override
	public String toString() {
		return "Post{" +
			"id=" + id +
			", Reporter='" + reporter + '\'' +
			", reported='" + reported+ '\'' +
			'}';
	}
}
