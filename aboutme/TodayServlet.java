package aboutme;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalTime;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class TodayServlet
 */
@WebServlet("/today")
public class TodayServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TodayServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		LocalDate currentDate = LocalDate.now();
		LocalTime currentTime = LocalTime.now();
		out.println("<html>");
		out.println("<head></head>");
		out.println("<body>");
		
		out.println("<a href=\"http://localhost:8080/aboutme/index.html\">메인화면</a>");
		
		out.println("<div><h1>");
		out.println("현재시간 : " + currentDate + " "+ currentTime.getHour() + ":" + currentTime.getMinute());
		out.println("</h1></div>");
		
		out.println("</body>");
		out.println("</html>");
	}

}
