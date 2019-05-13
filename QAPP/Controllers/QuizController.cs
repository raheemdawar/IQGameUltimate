using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QAPP.Filter;
using QAPP.DB;
namespace QAPP.Controllers
{
   [AuthorizationFilter]
    public class QuizController : Controller
    {
        iqwebEntities iqwebEntities = new iqwebEntities();
        // GET: Quiz
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult categories()
        {
            return View();
        }
        public ActionResult educationalquizs()
        {
            return View();
        }
        public ActionResult gamequizs()
        {
            return View();
        }
        public ActionResult sudoku()
        {
            return View();
        }
        public ActionResult iqquiz()
        {
            return View();
        }
        public ActionResult mathtest()
        {
            return View();
        }
        public ActionResult funquiz()
        {
            return View();
        }
        public ActionResult logicalquiz()
        {
            return View();
        }
        public ActionResult commonsence()
        {
            return View();
        }
        public ActionResult puzzle()
        {
            return View();
        }
        public void saveresult(string name,string correct)
        {
            
            if(!String.IsNullOrEmpty(name)&& !String.IsNullOrEmpty(correct))
            {
                Student student = Session["student"] as Student;
                if(student!=null)
                {
                    Quiz quiz = new Quiz();
                    quiz.fk_studentid = student.id;
                    quiz.marks = correct;
                    quiz.quizname = name;
                    iqwebEntities.Quizs.Add(quiz);
                    iqwebEntities.SaveChanges();
                }
            }
         
        }
        public ActionResult account()
        {
            Student student = Session["student"] as Student;
            List<Quiz> model = iqwebEntities.Quizs.Where(x => x.fk_studentid == student.id).ToList();

            return View(model);
        }


    }
}