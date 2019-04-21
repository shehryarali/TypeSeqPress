import { NextFunction, Request, Response } from "express";
import * as crypto  from "crypto";
import * as _jwt from "jsonwebtoken";
import { jwt } from "../../config";
import { UNAUTHORIZED } from "http-status-codes";


export const verify = (req: Request, res: Response, next: NextFunction) => {

  if (req.url.includes('/auth/')) {
    return next();
  }
  
  const token = req.body.token || req.query.token || req.headers['x-api-token'] || req.query.f;
  let err, payload;

  if (token) {
    try {
      payload = _jwt.verify(token, jwt.secret);
    } catch (err) {
      err = err;
    }
    console.log(payload);
    if (payload && payload.username) {
      req['payload'] = payload;
      req['token'] = token;
      return next();
    }
  }

  return res.status(UNAUTHORIZED).send({
    error: true,
    details: err,
    message: 'Unauthorized'
  })
};

export const generate = (payload: any) => {
  const { email, username } = payload;

  const token = _jwt.sign({ email, username }, jwt.secret, {
      expiresIn: jwt.expiry
  });

  return token;
};

export const hash = (plainText: string) => {
  const hashFunction = crypto.createHash("sha512");

  const cipherText = hashFunction.update(plainText);

  const cipherTextDigest = cipherText.digest("hex");

  return cipherTextDigest;
};
