using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace sample_uploader.Controllers
{
    public class ImageController : ApiController
    {

        [HttpPost]
        public IHttpActionResult Post()
        {
            string _filename = "";
            byte[] _image = null;
            Stream stream = null;

            stream = HttpContext.Current.Request.InputStream;
            //int invoiceId = int.Parse(HttpContext.Current.Request.Form["invoiceId"]);

            HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];
            stream = postedFile.InputStream;
            _filename = Path.GetFileName(HttpContext.Current.Request.Files[0].FileName);

            byte[] buffer = new byte[stream.Length];
            stream.Read(buffer, 0, buffer.Length);
            //          Request.Files[0].InputStream.Read(buffer, 0, Request.Files[0].ContentLength);
            //byte[] _buffer = ImageHelper.Picture_CheckSizing(buffer, "640");
            _image = buffer;

            return Ok();
        }
    }
}
