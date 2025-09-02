import type { FastifyReply, FastifyRequest } from "fastify"
import fs from 'node:fs';
import { google } from 'googleapis';
import { z } from "zod";

interface FormSubmitBody {
  name: string
  email: string
  phone: string
  church: string
  function: string
}

export async function formSubmitController(
  request: FastifyRequest<{ Body: FormSubmitBody }>,
  reply: FastifyReply
) {
  const credentialsBase64 = process.env.GOOGLE_CREDENTIALS!;

  const credentials = JSON.parse(
    Buffer.from(credentialsBase64, 'base64').toString('utf-8')
  );

  // Configura autenticação
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const spreadsheetId = '1Tx2wncxGkILEkQYvz3NGowVGJ59AFJ4SBxE6zODKwm4';

  // Nome da aba onde os dados serão inseridos
  const SHEET_NAME = 'Página1';

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A1:E1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          request.body.name,
          request.body.email,
          request.body.phone,
          request.body.church,
          request.body.function,
        ]]
      }
    });

    console.log(`Aqui no controller: ${response}`)
  } catch (error) {
    console.error('Error appending to spreadsheet:', error);
    reply.status(500).send({ message: "Error saving form data" });
    return;
  }

  reply.status(201).send({ message: "Form submit created successfully!" })
}