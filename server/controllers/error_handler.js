
//we will send an object that will have the error message and error status
//{message: "Message",status:100}
const Error_Handler = (error,req,res,next)=>{

  return res.status(error.status || 500).json({
      error:{
          message:error.message || "Oops,something went wrong !"
      }
  })
}

export default Error_Handler;

