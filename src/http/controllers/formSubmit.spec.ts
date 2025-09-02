import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../app'

describe('Form Submit(E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  it('[POST] /form-submit', async () => {
    const response = await request(app.server)
      .post('/form-submit')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        church: 'John Doe',
        function: 'Pastor'
      })

      console.log(`Aqui no teste ${response}`)

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({ message: 'Form submit created successfully!' })
  })
})