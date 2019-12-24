import { IExpressHandlerOptions, registerExpressHandler } from '../src/handler/express'
import { IKoaHandlerOptions, registerKoaHandler } from '../src/handler/koa'
import { directConnector, httpConnector, IHttpConnectorOptions, makeClient } from './client'
import { Handler } from './handler/handler'
import { IRPC, RPCRet, IError, IData } from './type'

export {
  directConnector,
  Handler,
  httpConnector,
  IData,
  IError,
  IExpressHandlerOptions,
  IHttpConnectorOptions,
  IKoaHandlerOptions,
  IRPC,
  makeClient,
  registerExpressHandler,
  registerKoaHandler,
  RPCRet,
}
