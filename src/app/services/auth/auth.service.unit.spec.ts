import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service
  const adminKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6ImFkbWluIn0.1dxln22U-jkWVN0WDLH0ltpkW47YrI550OXn90v6ahI'
  const userKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6InVzZXIifQ.vnbR72yHX00WxfuffPtvJHshw8_ovRaDoCiMX9O0zVU'
  const expiredKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU2MDg4MDM0Njk3MiwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6InVzZXIifQ.AAEXad4d-yujbraq02gyXXZEzvxWZ3ySv2ISmyHK0fQ'
  beforeEach(() => {
    service = new AuthService(null, null)
    service.router = { navigateByUrl: function() {} }
    service.key = 'tcp-test-key'
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('logout should clear localstorage', () => {
    localStorage.setItem(service.key, adminKey)
    service.logout()
    expect(localStorage.getItem(service.key)).toEqual(null)
  })

  it('getToken() should return token', () => {
    localStorage.setItem(service.key, adminKey)
    expect(service.getToken()).toEqual(adminKey)
  })

  it('getToken() decoded should return decoded token', () => {
    localStorage.setItem(service.key, adminKey)
    expect(service.getToken(true).role).toEqual('admin')
  })

  it('getToken() should not return token when expired', () => {
    localStorage.setItem(service.key, expiredKey)
    expect(service.getToken()).toEqual(null)
  })

  it('getEmail() should return email', () => {
    localStorage.setItem(service.key, adminKey)
    expect(service.getEmail()).toEqual('jon.doe@gmail.com')
  })

  it('getRole() should return role', () => {
    localStorage.setItem(service.key, adminKey)
    expect(service.getRole()).toEqual('admin')
  })

  it('isLoggedIn() should return true if logged in', () => {
    localStorage.setItem(service.key, adminKey)
    expect(service.isLoggedIn()).toEqual(true)
  })

  it('isLoggedIn() should return false if not logged in', () => {
    localStorage.removeItem(service.key)
    expect(service.isLoggedIn()).toEqual(false)
  })

  it('isAdmin() should return true if user is admin', () => {
    localStorage.setItem(service.key, adminKey)
    expect(service.isAdmin()).toEqual(true)
  })

  it('isAdmin() should return false if user is not admin', () => {
    localStorage.setItem(service.key, userKey)
    expect(service.isAdmin()).toEqual(false)
  })
})
