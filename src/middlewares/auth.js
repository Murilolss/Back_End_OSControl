import jwt from 'jsonwebtoken'

export function verificaToken(req, res, next){
    const auth = req.headers.authorization || "";
    const token = auft.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token){
        res.status(401).json({error: "Token Não enviado"})
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // convenção: sub = id usuario
        req.logado = {
            id: payload.sub,
            email: payload.email,
            name: payload.name
        };

        return next();
    }
    catch(e){
        res.status(403).json({error: "Token inválido ou expirado"})
        return;
    }
}