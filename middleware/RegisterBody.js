module.exports = (req, res, next) => {
    const {email, username, password} = req.body
    if(!email || !username || !password){
        res.status(400).json({ error: 'Missing a required key:value string' })
    }else{
      next();
    }
};