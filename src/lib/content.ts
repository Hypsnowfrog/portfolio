import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type SettingsEntry = CollectionEntry<'settings'>['data'];
export type SiteSettings = Extract<SettingsEntry, { kind: 'site' }>;
export type HomepageSettings = Extract<SettingsEntry, { kind: 'homepage' }>;
export type AboutSettings = Extract<SettingsEntry, { kind: 'about' }>;
export type ContactSettings = Extract<SettingsEntry, { kind: 'contact' }>;
export type NavigationSettings = Extract<SettingsEntry, { kind: 'navigation' }>;

export type SiteData = {
  site: SiteSettings;
  homepage: HomepageSettings;
  about: AboutSettings;
  contact: ContactSettings;
  navigation: NavigationSettings;
  works: CollectionEntry<'works'>[];
};

export async function getSiteData(): Promise<SiteData> {
  const [site, homepage, about, contact, navigation, entries] = await Promise.all([
    getEntry('settings', 'site-settings'), getEntry('settings', 'homepage'), getEntry('settings', 'about'),
    getEntry('settings', 'contact'), getEntry('settings', 'navigation'), getCollection('works'),
  ]);
  if (!site || !homepage || !about || !contact || !navigation) throw new Error('Les réglages CMS requis sont absents.');
  const works = entries.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
  return {
    site: site.data as SiteSettings,
    homepage: homepage.data as HomepageSettings,
    about: about.data as AboutSettings,
    contact: contact.data as ContactSettings,
    navigation: navigation.data as NavigationSettings,
    works,
  };
}
