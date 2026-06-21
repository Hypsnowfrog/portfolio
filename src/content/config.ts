import { defineCollection, z } from 'astro:content';

const theme = z.object({
  background: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#f6f5f1'),
  text: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#111111'),
  muted: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#8a8780'),
  line: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#dedbd2'),
  serif: z.string().default('Georgia, serif'),
  sans: z.string().default('Inter, Helvetica, Arial, sans-serif'),
});

const works = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    year: z.coerce.number().int(),
    medium: z.string().min(1),
    dimensions: z.string().min(1),
    category: z.string().optional(),
    series: z.string().optional(),
    image: z.string().startsWith('/uploads/'),
    image_width: z.coerce.number().int().positive(),
    image_height: z.coerce.number().int().positive(),
    alt: z.string().min(1),
    caption: z.string().optional(),
    featured: z.boolean().default(false),
    show_on_home: z.boolean().default(false),
    available: z.boolean().default(false),
    status: z.enum(['Disponible', 'Vendu', 'Collection privée', 'Non disponible']).optional(),
    order: z.coerce.number().int().default(0),
    image_display_mode: z.enum(['contain', 'cover', 'natural', 'featured-large', 'hidden-from-home']).default('contain'),
    background_tone: z.enum(['light', 'dark', 'transparent']).default('light'),
    orientation_hint: z.enum(['auto', 'landscape', 'portrait', 'square', 'panoramic']).default('auto'),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
  }),
});

const settings = defineCollection({
  type: 'data',
  schema: z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('site'), artist_name: z.string(), subtitle: z.string().optional(), location: z.string().optional(),
      email: z.string().email(), instagram: z.string().url().optional(), seo_title: z.string(), seo_description: z.string(),
      og_image: z.string().optional(), featured_work: z.string().optional(), homepage_recent_count: z.coerce.number().int().min(1).max(12).default(6),
      default_image_display_mode: z.enum(['contain', 'cover', 'natural']).default('contain'), enable_filters: z.boolean().default(true),
      enable_contact_form: z.boolean().default(false), theme,
      footer_links: z.array(z.object({ label: z.string(), url: z.string(), enabled: z.boolean().default(true) })).default([]),
    }),
    z.object({
      kind: z.literal('homepage'), title: z.string().optional(), intro: z.string().optional(), featured_work: z.string().optional(),
      hero_enabled: z.boolean().default(true), featured_caption_enabled: z.boolean().default(true), recent_section_enabled: z.boolean().default(true),
      recent_section_title: z.string().default('Œuvres récentes'), recent_count: z.coerce.number().int().min(1).max(12).default(6),
      call_to_action_label: z.string().default('Voir les œuvres'), call_to_action_url: z.string().default('/oeuvres/'),
    }),
    z.object({
      kind: z.literal('about'), title: z.string().default('À propos'), portrait: z.string().optional(), portrait_alt: z.string().optional(),
      portrait_enabled: z.boolean().default(true), bio: z.string().default(''), statement: z.string().default(''),
      cv_sections: z.array(z.object({ title: z.string(), enabled: z.boolean().default(true), items: z.array(z.object({ year: z.coerce.number(), text: z.string() })) })).default([]),
    }),
    z.object({
      kind: z.literal('contact'), title: z.string().default('Contact'), intro: z.string().default(''), email: z.string().email().optional(), instagram: z.string().url().optional(),
      form_enabled: z.boolean().default(false), show_email: z.boolean().default(true), form_name_label: z.string().default('Nom'),
      form_email_label: z.string().default('Email'), form_message_label: z.string().default('Message'), form_submit_label: z.string().default('Envoyer'),
      success_message: z.string().default('Votre message a été envoyé.'), error_message: z.string().default("L'envoi a échoué."), form_endpoint: z.string().url().optional(),
    }),
    z.object({
      kind: z.literal('navigation'), logo_label: z.string(), mobile_menu_label: z.string().default('Menu'), show_instagram_in_nav: z.boolean().default(false),
      items: z.array(z.object({ label: z.string(), url: z.string(), enabled: z.boolean().default(true) })),
    }),
  ]),
});

export const collections = { works, settings };
