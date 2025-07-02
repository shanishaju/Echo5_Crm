import { commonapi } from "./commonapi"
import { serverurl } from "./serverurl"


export const registerApi = async(reqBody)=>{
return await commonapi('POST',`${serverurl}/register`,reqBody,"")
}