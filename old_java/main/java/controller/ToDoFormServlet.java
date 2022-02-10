package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Todo;
import model.TodoDao;

@WebServlet("/todoForm")
public class TodoFormServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public TodoFormServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher requestDispatcher = request.getRequestDispatcher("./todoForm.jsp");
		requestDispatcher.forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");
		
		String whatTodo = request.getParameter("what-todo");
		String whoTodo = request.getParameter("who-todo");
		int rankTodo = Integer.parseInt(request.getParameter("rank-todo"));
		
		TodoDao dao = new TodoDao();
		Todo todo = new Todo(whatTodo, whoTodo, rankTodo);
		
		int insertCount = dao.newTodo(todo);
		System.out.println(insertCount + "건의 데이터가 추가되었습니다.");
		
		response.sendRedirect("main");
	}

}
