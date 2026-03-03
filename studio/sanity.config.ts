import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Procuratio Blog',

  projectId: 'mi6o3w4q',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      // Languages you want to support
      supportedLanguages: [
        { id: 'es', title: 'Español' },
        { id: 'en', title: 'English' },
        { id: 'it', title: 'Italiano' }
      ],
      // The schema types where the language field should be injected
      schemaTypes: ['post'],
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
