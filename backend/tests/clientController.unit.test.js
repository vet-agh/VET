const supertest = require('supertest')
const express = require('express')

const app = express()

const employeeController = require('../controllers/clientController')

// Client database test
describe('client', () => {
    
    // Return 404 if _id don't exist
    describe('get client route', () => {
        describe('given the client does not exist', () => {
          it('should return a 404', async () => {
            const clientId = 'client-123'
    
            await supertest(app).get(`/api/clients/${clientId}`).expect(404)
          })
        })   
    })
})