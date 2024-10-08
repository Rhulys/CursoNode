const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
    static login(req, res) {
        res.render("auth/login");
    }

    static async loginPost(req, res) {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.render("auth/login", {
                message: "Usuário não encontrado!",
            });

            return;
        }
        // check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            res.render("auth/login", {
                message: "Senha inválida!",
            });

            return;
        }

        // initialize session
        req.session.userid = user.id;

        req.flash("message", "Login realizado com sucesso!");

        req.session.save(() => {
            res.redirect("/");
        });
        
    }

    static register(req, res) {
        res.render("auth/register");
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        // Password match validation
        if (password != confirmpassword) {
            req.flash("message", "As senhas não coincidem!");
            res.render("auth/register");

            return;
        }

        // check if user exists
        const checkifUserExists = await User.findOne({
            where: { email: email },
        });

        if (checkifUserExists) {
            req.flash("message", "E-mail já cadastrado!");
            res.render("auth/register");

            return;
        }

        // create a password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword,
        };


            const createdUser = await User.create(user);

            // initialize session
            req.session.userid = createdUser.id;

            req.flash("message", "Cadastro realizado com sucesso!");

            req.session.save(() => {
                res.redirect("/");
            });
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect("/login");
    }
};
