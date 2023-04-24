import HttpException from "./HttpException";

export default class BadRequest extends HttpException {
    
    constructor(message?: string) {
        super(400, message || "Bad Request")
    }
}