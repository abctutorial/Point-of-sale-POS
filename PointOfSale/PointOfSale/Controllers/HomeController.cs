using PointOfSale.Helper;
using PointOfSale.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PointOfSale.Controllers
{
    public class HomeController : Controller
    {
        [AuthorizationFilter]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AccessDenied()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public JsonResult CheckLogin(string username, string password)
        {
            POS_TutorialEntities db = new POS_TutorialEntities();
            string md5StringPassword = AppHelper.GetMd5Hash(password);
            var dataItem = db.Users.Where(x => x.Username == username && x.Password == md5StringPassword).SingleOrDefault();
            bool isLogged = true;
            if (dataItem != null)
            {
                Session["Username"] = dataItem.Username;
                Session["Role"] = dataItem.Role;
                isLogged = true;
            }
            else
            {
                isLogged = false;
            }
            return Json(isLogged, JsonRequestBehavior.AllowGet);
        }
        [AuthorizationFilter]
        public ActionResult UserCreate()
        {
            return View();
        }
        [HttpPost]
        public JsonResult SaveUser(User user)
        {
            POS_TutorialEntities db = new POS_TutorialEntities();
            bool isSuccess = true;

            if (user.UserId>0)
            {
                db.Entry(user).State = EntityState.Modified;
            }
            else
            {
                user.Status = 1;
                user.Password = AppHelper.GetMd5Hash(user.Password);
                db.Users.Add(user);
            }
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                isSuccess = false;
            }

            return Json(isSuccess, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetAllUser()
        {
            POS_TutorialEntities db = new POS_TutorialEntities();
            var dataList = db.Users.Where(x=>x.Status==1).ToList();
            return Json(dataList, JsonRequestBehavior.AllowGet);
        }
        [AuthorizationFilter]
        public ActionResult Category()
        {
            return View();
        }
        [HttpPost]
        public JsonResult SaveCategory(Category cat)
        {
            POS_TutorialEntities db = new POS_TutorialEntities();
            bool isSuccess = true;
            if (cat.CategoryId > 0)
            {
                db.Entry(cat).State = EntityState.Modified;
            }
            else
            {
                cat.Status = 1;
                db.Categories.Add(cat);
            }
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                isSuccess = false;
            }
            return Json(isSuccess, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetAllGetegory()
        {
            POS_TutorialEntities db = new POS_TutorialEntities();
            var dataList = db.Categories.Where(x => x.Status == 1).ToList();
            return Json(dataList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Logout()
        {
            Session["Username"] = null;
            Session["Role"] = null;
            return RedirectToAction("Login");
        }
    }
}