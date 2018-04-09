# nralcm (Node Rest Api Lifecycle Management)
nralcm provides a environment to manage a request via a lifecycle. The main motive of nralcm is to provide a environment to focus on writing api instead of wasting time again and again on setup project architecture. It gives developers flexibility to write strongly typed code using typescript.
nralcm provides following out of box:

 - Handler
 - Dependency Injection
 - Routing
 - Model Validation
 - Authentication (Centralised)
 - Authorization (Centralised)
 - Filters
 - Request and Response Handler 

# nralcm (Node Rest Api Lifecycle Management)
nralcm provides a environment to manage a request via a lifecycle. The main motive of nralcm is to provide a environment to focus on writing api instead of wasting time again and again on setup project architecture. It gives developers flexibility to write strongly typed code using typescript.
nralcm provides following out of box:

 - Handler
 - Dependency Injection
 - Routing
 - Model Validation
 - Authentication (Centralised)
 - Authorization (Centralised)
 - Filters
 - Request and Response Handler 

## HandlerDispatcher
HandlerDispatcher will be responsible for choosing right handler based on request type

## HttpHandler
Handler will responsible for request management. Handler will be first who will recieve request and response object in the chain. An application can have multiple handlers. For example a handler will be for rest api, another handler can be for images and other files. By implementing a HttpHandler anyone can their own process.

## ExceptionHandler

ExceptionHandler will be response handling errors at application level. This handler will get request, response and error object.

## HttpRequestHandler
HttpRequestHandler is the first handler that get request. Implement IHttpRequestHandler to implement it. Usage of HttpRequestHandler may be to check header, check api key etc.

## RouteMapping
RouteMapping will be responsible for mapping of routes. Every route will map to a class (Controller). If Route will not exist then error will send to exception handler.

## DependencyResolver

DependencyResolver will be responsible for injection of Dependency of controllers. If injection will fail then DependencyResolver will send error to exception handler.

## AuthenticationFilter
This filter will execute based on Authhorize decorator on controller class. This filter will authenticate request. If Authentication will fail then response will return from this flter.

## AuthorizationFilter
This filter will execute after AuthenticationFilter. This filter will authorize user based on their roles. This filter will recieve an array of Roles (string). If Authorization will fail response will return from this filter.

## ModelValidation

ModelValidation will be resposible for model validation like params, queryStrings, and post request body object.

## Filters

Filters will execute before and after action method (rest api method) executed. Filters can be register globally or can use as decorator on controller or action method level. Each filter will pass request to next level after execution or can return response directly from filter.

## Controller

Every controller will extend (inherit) from BaseController classs. Controller class will have request and response object.