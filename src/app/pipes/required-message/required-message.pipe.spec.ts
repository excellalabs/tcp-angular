import { RequiredMessagePipe } from './required-message.pipe'

describe('RequiredMessagePipe', () => {
  let pipe: RequiredMessagePipe
  beforeEach(() => {
    pipe = new RequiredMessagePipe()
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  describe('#transform()', () => {
    it('should produce a formatted message', () => {
      expect(pipe.transform('Form Name')).toEqual(
        'Form Name' + RequiredMessagePipe.postfix
      )
    })
  })
})
