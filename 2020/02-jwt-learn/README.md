+ generating 'ACCESS_TOKEN_SECRET' and 'REFRESH_TOKEN_SECRET' as follow:
  - open a new terminals and enter 'node' REPL, 
  - type as follow to generate 'ACCESS_TOKEN_SECRET' token
  ```bash 
  > require('crypto').randomBytes(64).toString('hex')
  ```
  - same as REFRESH_TOKEN_SECRET generating process

+ It's run request.rest files normally to install vscode extensions of 'REST Client'
