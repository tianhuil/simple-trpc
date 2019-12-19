import { IExpressHandlerOptions, registerExpressHandler } from '../src/handler/express'
import { IKoaHandlerOptions, registerKoaHandler } from '../src/handler/koa'
import { directConnector, httpConnector, IHttpConnectorOptions, makeClient } from './client'
import { Handler } from './handler/handler'
import { IRPC, RPCRet } from './type'

export {
  directConnector,
  IHttpConnectorOptions,
  IExpressHandlerOptions,
  IKoaHandlerOptions,
  httpConnector,
  makeClient,
  registerExpressHandler,
  registerKoaHandler,
  Handler,
  IRPC,
  RPCRet,
}
