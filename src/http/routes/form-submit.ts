import z from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { formSubmitController } from "../controllers/formSubmit.ts"

export const formSubmitRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/form-submit', {
    schema: {
      tags: ['form-submit'],
      summary: 'Create a form submit',
      description: 'This route receive a form submit and create a form submit in database',
      body: z.object({
        name: z.string().min(5, 'Nome precisa ter pelo menos 5 caracteres.'),
        email: z.string().email('Email inválido.'),
        phone: z.string().min(10, 'Telefone precisa ter pelo menos 10 caracteres.'),
        church: z.string().min(5, 'Igreja precisa ter pelo menos 5 caracteres.'),
        function: z.string().min(5, 'Função precisa ter pelo menos 5 caracteres.'),
      }),
      response: {
        // 201: z.object({ formSubmitId: z.uuid() }).describe('Form submit created successfully!')
        201: z.object({ message: z.string() }).describe('Form submit created successfully!')
      }
    },
  }, formSubmitController)
}