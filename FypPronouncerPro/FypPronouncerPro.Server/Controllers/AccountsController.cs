using FypPronouncerPro.Server.DTO;
using FypPronouncerPro.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace FypPronouncerPro.Server.Controllers
{
    [ApiController]
    [Route("AccountsManagement")]
    public class AccountsController : Controller
    {
        private readonly DataBaseContext dbContext;
        public AccountsController(DataBaseContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // sign up method

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUP([FromBody] SignUPDTO student_dto)
        {
            if (student_dto == null) { return BadRequest("Empty Data"); }

            var emailExists = await dbContext.Students.Where(x => x.Email == student_dto.Email).FirstOrDefaultAsync();
            var nameExists = await dbContext.Students.Where(x => x.FullName == student_dto.FullName).FirstOrDefaultAsync();

            if (emailExists != null)
            {
                return BadRequest("Email already exists please use another email");
            }
            if (nameExists != null)
            {
                return BadRequest("Ussername already exists please use another username");
            }

            var student = new StudentsModel
            {
                FullName = student_dto.FullName,                                                                                    
                Email = student_dto.Email,
                Password = student_dto.Password,
                isActive = true,
            };

            dbContext.Students.Add(student);
            await dbContext.SaveChangesAsync();
            return Ok("Student Registered Successfully");
        }

        // sign up method

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInDTO student_dto)
        {
            if (student_dto == null) { return BadRequest("Empty Fields"); }

            StudentsModel student = await dbContext.Students.Where(x => x.Email == student_dto.Email).FirstOrDefaultAsync();
            if (student == null)
            {
                return BadRequest("Email does not exists");
            }
            if (student.Password != student_dto.Password)
            {
                return BadRequest("Check your password");
            }
            return Ok("Welcome " + student.FullName);
        }

        [HttpPost]
        [Route("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] SignInDTO student_dto)
        {
            if (student_dto.Email == null) { return BadRequest("invalid data"); }

            // check if the user exists or not

            var user = await dbContext.Students.Where(x => x.Email == student_dto.Email).FirstOrDefaultAsync();
            if (user == null) 
            { 
                return BadRequest("user not found");
            }
            else
            {

                // send email
                string mail = "umber22j@gmail.com";
                string pw = "tchemyqybpoajrgv";

                var client = new SmtpClient("smtp.gmail.com", 587)
                {
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(mail, pw)
                };

                var message = new MailMessage(mail, student_dto.Email)
                {
                    Subject = "PronouncerPro Forgot Password",
                    Body = "Your new password is : " + student_dto.Password,
                    IsBodyHtml = true
                };

                await client.SendMailAsync(message);
                // Update the password
                user.Password = student_dto.Password;

                await dbContext.SaveChangesAsync();

                return Ok("Password has been changed Check From Your Email");
            }
        }
    }
}
