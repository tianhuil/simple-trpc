import { IExpressHandlerOptions, registerExpressHandler } from '../src/handler/express'
import { IKoaHandlerOptions, registerKoaHandler } from '../src/handler/koa'
import { directConnector, httpConnector, IHttpConnectorOptions, makeClient } from './client'
import { Handler } from './handler/handler'
import { IData, IError, IRpc, RpcRet } from './type'

export {
  directConnector,
  Handler,
  httpConnector,
  IData,
  IError,
  IExpressHandlerOptions,
  IHttpConnectorOptions,
  IKoaHandlerOptions,
  IRpc,
  makeClient,
  registerExpressHandler,
  registerKoaHandler,
  RpcRet,
}
