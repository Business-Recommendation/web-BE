module.exports = (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
        res.status(400).json({ error: 'Missing a required key:value string' })
    }else{
      next();
    }
};