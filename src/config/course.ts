const express = require('express');
import CourseController  from "../controllers/course";
const router = express.Router();
module.exports = router ;

var method=router.method
var url=router.url
console.log(method,url)

router.get('/courses',(req, res) =>{
    return  CourseController.index().then(
        Response=>
        {
         res.send(Response)
         res.end()
        }
    );
  
});

router.get('/course/:id',(req, res) =>{
    CourseController.show(req.params.id).then(
        Response=>
        {
         //   console.log(Response);
         res.send(Response)
         res.end()
        }
   
)});

router.get("/*",(req,res)=>{
    res.send({"msg":"URL NOT DEFINE"})
    res.end()

})

router.patch('/course/:id',(req, res) =>{
    CourseController.update(req.body).then(
        Response=>
        {
         console.log(Response);
         res.send(Response)
         res.end()
        }
)});
    
router.delete('/course/:id',(req, res) =>{
    CourseController.delete(req.params.id).then(
        Response=>
        {
         res.send(Response)
         res.end()
        }
)});

router.post('/course',(req, res) =>{
    CourseController.create(req.body).then(
        Response=>
        {
         //   console.log(Response);
         res.send(Response)
         res.end()
        }
)});

