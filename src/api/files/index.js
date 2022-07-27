import express from "express"
import { pipeline } from "stream" // CORE MODULE
import fs from "fs-extra"
import { join } from "path"
import { getProductsForStream, getProductsPdf } from "../../lib/fs/tools.js"
import { createGzip } from "zlib"

const filesRouter = express.Router()


filesRouter.get("/productsJson", async(req,res,next) => {
    try {
        
        res.setHeader("Content-Disposition", "attachments; filename=Products.json.gz")
        const source = getProductsForStream();
        const destination = res;
        const transform = createGzip()

        pipeline(source,transform,destination,err => {
            if(err) {
                console.log(err);
            }
        })
        
    } catch (error) {
        next(error)
    }
})

filesRouter.get("/PDF",(req,res,next)=>{
   try {
    res.setHeader("Content-Disposition", "attachments; filename=Products.pdf")

    const source = getProductsPdf();
    const destination = res;
    pipeline(source,destination,err => {
        if(err){
            console.log(err);
        }
    })

   } catch (error) {
    next(error)
   } 
})

export default filesRouter