import { Request, Response, NextFunction } from 'express'

export function sleep(msec = 1000) {
  return new Promise(res => setTimeout(res, msec))
}

export function asyncHandler(cb: (req: Request, res: Response) => Promise<any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    cb(req, res).catch(next)
  }
}
