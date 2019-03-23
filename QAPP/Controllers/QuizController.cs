using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QAPP.Filter;
namespace QAPP.Controllers
{
   [AuthorizationFilter]
    public class QuizController : Controller
    {
        // GET: Quiz
        public ActionResult Index()
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

    }
}