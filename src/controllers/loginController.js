const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  res.render('login');
};

exports.register = async (req, res) => {
  const login = new Login(req.body);

  try {
    await login.register();

    if(login.errors.length > 0){
      req.flash('errors', login.errors);
      req.session.save(function(){
        return res.redirect('/login');
    });
    
    return;
    }
  } catch (error) {
    console.log(error);
    return res.render('404')
  }
  

  req.flash('success', 'Seu usuário foi salvo com sucesso!');
    req.session.save(function(){
    return res.redirect('/login');
  });
};
