package model;

public class Util {

	public static void main(String[] args) {
		
		TodoDao dao = new TodoDao();
		
		Todo todo = new Todo("스프링 공부", "상윤", 2);
		
		System.out.println(dao.newTodo(todo));

	}
	

}
