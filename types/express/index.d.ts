//*apparently there's a bug in node-ts, this is to fix it

declare namespace Express {
  interface Request {
    user?: any;
  }
}