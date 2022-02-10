package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TodoDao {
	private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	private static final String dbUrl = "jdbc:mysql://localhost:3306/todo_db?useSSL=false";
	private static final String dbUser = "todo_user";
	private static final String dbPwd = "todo";
	
	
	public Todo getOneData(Integer dataId) {
		
		Todo todo = null;
		
		try {
			Class.forName(JDBC_DRIVER);
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		String sql = "SELECT * FROM todo WHERE id = ?";
		
		try(Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPwd); PreparedStatement ps = conn.prepareStatement(sql)){
			ps.setInt(1, dataId);
			
			try(ResultSet rs = ps.executeQuery()){
				if(rs.next()) {
					Integer id = rs.getInt("id");
					String title = rs.getString("title");
					String name = rs.getString("name");
					int sequence = rs.getInt("sequence");
					String type = rs.getString("type");
					String datetime = rs.getString("regdate");
					
					todo = new Todo(id, title, name, sequence, type, datetime);
				}
				
			}catch(Exception e) {
				e.printStackTrace();
			}
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return todo;
	}
	
	
	public List<Todo> getData(){
		
		List<Todo> list = new ArrayList<>();
		
		try {
			Class.forName(JDBC_DRIVER);
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		String sql = "SELECT * FROM todo";
		
		try(Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPwd); PreparedStatement ps = conn.prepareStatement(sql)){
						
			try(ResultSet rs = ps.executeQuery()){
				while(rs.next()) {
					Integer id = rs.getInt("id");
					String title = rs.getString("title");
					String name = rs.getString("name");
					int sequence = rs.getInt("sequence");
					String type = rs.getString("type");
					String datetime = rs.getString("regdate");
					
					Todo todo = new Todo(id, title, name, sequence, type, datetime);
					list.add(todo);
				}
				
			}catch(Exception e) {
				e.printStackTrace();
			}
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return list;
		
	}
	
	
	public int newTodo(Todo newTodo) {
		int count = 0;
		
		try {
			Class.forName(JDBC_DRIVER);
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		String sql = "INSERT into todo(title, name, sequence) VALUES (?, ?, ?)";
		
		try(Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPwd); PreparedStatement ps = conn.prepareStatement(sql)){
			ps.setString(1, newTodo.getTitle());
			ps.setString(2, newTodo.getName());
			ps.setInt(3, newTodo.getSequence());
			
			count = ps.executeUpdate();			
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return count;
	}
	
	
	public int delTodo(Todo delTodo) {
		int count = 0;
		
		try {
			Class.forName(JDBC_DRIVER);
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		String sql = "DELETE FROM todo WHERE id = ?";
		
		try(Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPwd); PreparedStatement ps = conn.prepareStatement(sql)){
			ps.setInt(1, delTodo.getId());
			
			count = ps.executeUpdate();			
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return count;
	}
	
	
	public int updateTodo(Todo updateTodo) {
		int count = 0;
		
		try {
			Class.forName(JDBC_DRIVER);
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		String sql = "UPDATE todo"
				+ " SET type = CASE"
				+ " WHEN type = \"TODO\" THEN \"DOING\""
				+ " WHEN type = \"DOING\" THEN \"DONE\""
				+ " ELSE \"DONE\""
				+ " END"
				+ " WHERE id = ?";
		
		try(Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPwd); PreparedStatement ps = conn.prepareStatement(sql)){
			ps.setInt(1, updateTodo.getId());
			
			count = ps.executeUpdate();			
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return count;
	}
}
