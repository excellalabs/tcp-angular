import { HttpClient } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { Injectable } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { Resolve } from '@angular/router'

import { environment } from '../../../environments/environment'
import { IBaseItem } from '../../models/base-item.interface'
import { BaseCrudService, IBaseCrudService } from './base-crud.service'

interface ITestItem extends IBaseItem {
  name: string
  cost: number
}

@Injectable()
class TestItemService extends BaseCrudService<ITestItem>
  implements IBaseCrudService<ITestItem>, Resolve<ITestItem[]> {
  endpoint = '/items/'

  constructor(protected http: HttpClient) {
    super(http)
  }
}

const mockItems = [
  {
    id: 1,
    name: 'Ice Cream',
    cost: 3,
  },
  {
    id: 2,
    name: 'Cookies',
    cost: 2,
  },
  {
    id: 3,
    name: 'Pie',
    cost: 4,
  },
]

describe('BaseCrudService', () => {
  let service: TestItemService
  let httpMock: HttpTestingController
  let items: ITestItem[]
  let endpoint: string

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestItemService],
    }).compileComponents()

    service = TestBed.get(TestItemService)
    httpMock = TestBed.get(HttpTestingController)
    items = [...mockItems].map(i => ({ ...i })) // deep copy
    endpoint = `${environment.api}${service.endpoint}`
  }))

  afterEach(() => {
    // Verify all http requests were seen as expected
    httpMock.verify()
  })

  describe('fetch', () => {
    it('should fire an http.get() call to the endpoint', () => {
      service.fetch().subscribe() // Remember, the call won't fire without a subscription
      const req = httpMock.expectOne(endpoint)
      expect(req.request.method).toBe('GET')
    })
    // Use this done pattern to test things inside a subscription
    it('should return the list of items', done => {
      service.fetch().subscribe(list => {
        expect(list).toEqual(items)
        done()
      })
      const req = httpMock.expectOne({ method: 'GET', url: endpoint })
      req.flush(items)
    })
    it('should update the cache', () => {
      service.fetch().subscribe()
      const req = httpMock.expectOne({ method: 'GET', url: endpoint })
      req.flush(items)
      expect(service.list.value).toEqual(items)
    })
  })

  describe('getById', () => {
    it('should fire an http.get() call with the id in the url', () => {
      service.getById(1).subscribe() // Remember, the call won't fire without a subscription
      const req = httpMock.expectOne(`${endpoint}1`)
      expect(req.request.method).toBe('GET')
    })
    it('should return the fetched item', done => {
      service.getById(1).subscribe(item => {
        expect(item).toEqual(items[0])
        done()
      })
      const req = httpMock.expectOne({ method: 'GET', url: `${endpoint}1` })
      req.flush(items[0])
    })
  })

  describe('create', () => {
    let newItem: ITestItem
    beforeEach(() => {
      newItem = {
        id: null,
        name: 'Cake',
        cost: 3,
      }
    })
    it('should fire an http.post() call to the endpoint', () => {
      service.create(newItem).subscribe() // Remember, the call won't fire without a subscription
      const req = httpMock.expectOne(endpoint)

      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual(newItem)
    })
    // Use this done pattern to test things inside a subscription
    it('should return the newly created item', done => {
      service.create(newItem).subscribe(returnedItem => {
        expect(returnedItem).toEqual({ ...newItem, id: 4 })
        done()
      })

      const req = httpMock.expectOne({ method: 'POST', url: endpoint })
      req.flush({ ...newItem, id: 4 })
      httpMock.expectOne({ method: 'GET', url: endpoint })
    })
    it('should update the cache', () => {
      service.create(newItem).subscribe()
      const req = httpMock.expectOne({ method: 'POST', url: endpoint })
      req.flush({ ...newItem, id: 4 })
      const req2 = httpMock.expectOne({ method: 'GET', url: endpoint })
      req2.flush(items)
      expect(service.list.value).toEqual(items)
    })
  })

  describe('update', () => {
    let updatedItem: ITestItem

    beforeEach(() => {
      updatedItem = { ...items[0], name: 'Ice Cream Sundae' }
    })
    it('should fire an http.put() call to the endpoint', () => {
      service.update(updatedItem).subscribe() // Remember, the call won't fire without a subscription
      const req = httpMock.expectOne(`${endpoint}${updatedItem.id}`)
      req.flush(updatedItem)
      expect(req.request.method).toBe('PUT')
      expect(req.request.body).toEqual(updatedItem)

      httpMock.expectOne({ method: 'GET', url: endpoint })
    })
    // Use this done pattern to test things inside a subscription
    it('should return the newly updated item', done => {
      service.update(updatedItem).subscribe(returnedItem => {
        expect(returnedItem).toEqual(updatedItem)
        done()
      })

      const req = httpMock.expectOne({
        method: 'PUT',
        url: `${endpoint}${updatedItem.id}`,
      })
      req.flush(updatedItem)
      httpMock.expectOne({ method: 'GET', url: endpoint })
    })
    it('should update the cache', () => {
      service.update(updatedItem).subscribe()
      const req = httpMock.expectOne({
        method: 'PUT',
        url: `${endpoint}${updatedItem.id}`,
      })
      req.flush(updatedItem)
      const req2 = httpMock.expectOne({ method: 'GET', url: endpoint })
      const updatedList = [...items]
      updatedList.splice(0)
      updatedList.unshift(updatedItem)
      req2.flush(updatedList)

      expect(service.list.value).toEqual(updatedList)
    })
  })

  describe('delete', () => {
    it('should fire an http.put() call to the endpoint', () => {
      service.delete(1).subscribe() // Remember, the call won't fire without a subscription
      const req = httpMock.expectOne(`${endpoint}1`)
      req.flush({})
      expect(req.request.method).toBe('DELETE')

      httpMock.expectOne({ method: 'GET', url: endpoint })
    })
    it('should update the cache', () => {
      service.delete(1).subscribe()
      const req = httpMock.expectOne({ method: 'DELETE', url: `${endpoint}1` })
      req.flush({})
      const req2 = httpMock.expectOne({ method: 'GET', url: endpoint })
      const updatedList = [...items.filter(i => i.id !== 1)]
      req2.flush(updatedList)

      expect(service.list.value).toEqual(updatedList)
    })
  })

  describe('resolve', () => {
    it('should call fetch', () => {
      service.resolve().subscribe()
      const req = httpMock.expectOne({ method: 'GET', url: endpoint })
      req.flush(items)
      expect(service.list.value).toEqual(items)
    })
  })
})
