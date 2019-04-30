const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const { existsOrError } = app.api.validation;
    const signin = async (req, res) => {
        let user;
        try {
            existsOrError(req.body.email, 'Informe o e-mail');
            existsOrError(req.body.password, 'Informe a senha');

            user = await app.db('users').where({ email: req.body.email }).first();
            existsOrError(user, 'Usuário não encontrado');

            // const isMatch = bcrypt.compareSync(req.body.password, user.password);

            // existsOrError(isMatch, 'Senha inválida');

        } catch (msg) {
            return res.status(400).send(msg);
        };

        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60)
        };

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        });
    };

    const validateToken = async (req, res) => {
        const userData = req.body || null;
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret);
                if (new Date(token.exp * 1000) > new Date()) {
                    const now = Math.floor(Date.now() / 1000);
                    userData.exp = now + (60 * 60);
                    return res.send(userData)
                };
            };
        } catch (err) {
            return res.send(err);
        };
    };

    return { signin, validateToken };
}