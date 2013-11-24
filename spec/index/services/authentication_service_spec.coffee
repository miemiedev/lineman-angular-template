describe "service: AuthenticationService", ->

  Given -> module("index")

  Given -> inject ($http, @AuthenticationService) =>
    @$httpPost = spyOn($http, 'post')
    @$httpGet  = spyOn($http, 'get')

  describe "#login", ->
    Given  -> @credentials = {name: 'Dave'}
    When   -> @AuthenticationService.login(@credentials)
    Then   -> expect(@$httpPost).toHaveBeenCalledWith('/login', @credentials)

  describe "#logout", ->
    When -> @AuthenticationService.logout()
    Then -> expect(@$httpPost).toHaveBeenCalledWith('/logout')
