const Errorhandler = (cb) => {
    return async (req,res) => {
        try{
            cb(req,res)
        }
        catch(err){
            console.log(err)
            return new ErrorMaker(500,err.message || "Something went wrong")
        }
    }
}

module.exports = Errorhandler