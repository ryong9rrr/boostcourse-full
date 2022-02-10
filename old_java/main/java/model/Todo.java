package model;

public class Todo {
	private Integer id;
	private String title;
	private String name;
	private int sequence;
	private String type;
	private String datetime;
	
	public Todo() {
		
	}
	
	public Todo(Integer id) {
		this.id = id;
	}
	
	public Todo(String title, String name, int sequence) {
		this.title = title;
		this.name = name;
		this.sequence = sequence;
	}
	
	public Todo(Integer id, String title, String name, int sequence, String type, String datetime) {
		this.id = id;
		this.title = title;
		this.name = name;
		this.sequence = sequence;
		this.type = type;
		this.datetime = datetime;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", title=" + title + ", name=" + name + ", sequence=" + sequence + ", type=" + type
				+ ", datetime=" + datetime + "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getSequence() {
		return sequence;
	}

	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDatetime() {
		return datetime;
	}

	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
}
