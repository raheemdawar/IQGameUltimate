using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using QAPP.DB;
namespace QAPP.Controllers
{
    public class HomeController : Controller
    {

        IqwebEntities _db = new IqwebEntities();
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(string email,string password)
        {
            if(!String.IsNullOrEmpty(email) && !String.IsNullOrEmpty(password))
            {
                Student student = (from recs in _db.Students
                                   where recs.email.ToLower().Equals(email.ToLower())
                                   select recs).FirstOrDefault();
                if(student!=null)
                {
                    if( student.password.Equals(password))
                    {
                        Session["student"] = student;
                        return RedirectToAction("index", "Quiz");
                    }
                }
            }
            return View();
        }
        public ActionResult logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon(); // it will clear the session at the end of request
            return  RedirectToAction("Index");
            
        }
        public ActionResult register()
        {
           

            return View();
        }
        [HttpPost]
        public ActionResult register(string username, string email, string password)
        {
            if(!String.IsNullOrEmpty(username)&&!String.IsNullOrEmpty(email)&&!String.IsNullOrEmpty(password))
            {
                Student student = (from recs in _db.Students
                                   where recs.email.ToLower().Equals(email.ToLower())
                                   select recs).FirstOrDefault();
                if (student == null)
                {
                    Student newStudent = new Student();
                    newStudent.email = email;
                    newStudent.password = password;
                    newStudent.username = username;
                    _db.Students.Add(newStudent);
                    _db.SaveChanges();
                    Session["student"] = student;
                    return RedirectToAction("index", "Quiz");
                }
            }

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult takeQuiz()
        {
            return View();
        }
    }
}