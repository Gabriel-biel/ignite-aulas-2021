
### Requisitos

- [x] Checks Exists User Account
- [x] Checks Create Todos Availability
- [] Checks Todo Exists
- [] Find User By Id

### Regras de Negócio

- [x] Should be able to find by username in header and pass it to request.user
- [x] Should not able able to find a non existing user by username in header
- [x] should be able to let user create a new todo when is in free plan and have less than ten todos
- [x] Should not be able to let user create a new todo when is not Pro and already have ten todos
- [x] Should be able to let user create infinite new todos when is in Pro plan
- [x] Should be able to put user and todo in request when both exits
- [x] Should not be able to put user and todo in request when user does not exists
- [x] Should not be able to put user and todo in request when todo id is not uuid
- [x] Should not be able to put user and todo in request when todo does not exists
- [] Should be able to find user by id route param and pass it to request.user
- [] Should not be able to pass user to request.user when it does not exists