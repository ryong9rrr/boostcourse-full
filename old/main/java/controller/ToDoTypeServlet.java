package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.Todo;
import model.TodoDao;

@WebServlet("/todo/*")
public class TodoTypeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public TodoTypeServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		
		String pathInfo = request.getPathInfo();
		String[] pathParts = pathInfo.split("/");
		String idStr = pathParts[1];
		int id = Integer.parseInt(idStr);
		
		TodoDao dao = new TodoDao();
		
		//Todo todo = dao.getOneData(id);
		
		Todo clickedTodo = new Todo(id);
		int updateCount = dao.updateTodo(clickedTodo);
		System.out.println(updateCount + "건의 데이터가 변경되었습니다.");
		Todo updateTodo = dao.getOneData(id);
		
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(updateTodo);
		
		PrintWriter out = response.getWriter();
		out.println(json);
		out.close();
		
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pathInfo = request.getPathInfo();
		String[] pathParts = pathInfo.split("/");
		String idStr = pathParts[1];
		int id = Integer.parseInt(idStr);
		
		TodoDao dao = new TodoDao();
		
		Todo clickedTodo = new Todo(id);
		int deleteCount = dao.delTodo(clickedTodo);
		System.out.println(deleteCount + "건의 데이터가 삭제되었습니다.");
	}
	
}
