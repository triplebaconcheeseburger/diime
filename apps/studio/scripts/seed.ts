/**
 * Seeds a handful of documents so the mobile Feed screen (and the
 * ParallaxHero POC specifically) has something real to render.
 *
 * Usage (from apps/studio, after `npx sanity login` once):
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * Safe to re-run — every document uses a fixed _id and createOrReplace.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-20'})

// Distinct picsum photo IDs chosen for visual contrast between layers.
const PHOTOS = {
  heroBg: 'https://picsum.photos/id/1048/1200/1500',
  heroMid: 'https://picsum.photos/id/1080/1200/1500',
  heroFg: 'https://picsum.photos/id/1024/1200/1500',
  wire: 'https://picsum.photos/id/1060/1200/900',
  review: 'https://picsum.photos/id/1074/1200/900',
  award: 'https://picsum.photos/id/1082/1200/900',
  shop: 'https://picsum.photos/id/1050/1200/900',
  shopLogo: 'https://picsum.photos/id/1050/256/256',
  edition: 'https://picsum.photos/id/1040/1000/1300',
  drop: 'https://picsum.photos/id/1069/1200/900',
  event: 'https://picsum.photos/id/1084/1200/900',
}

async function uploadImage(url: string, filename: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {filename})
  return {_type: 'image' as const, asset: {_type: 'reference' as const, _ref: asset._id}}
}

async function main() {
  console.log('Uploading images…')
  const [heroBg, heroMid, heroFg, wireImg, reviewImg, awardImg, shopImg, shopLogo, editionImg, dropImg, eventImg] =
    await Promise.all([
      uploadImage(PHOTOS.heroBg, 'hero-bg.jpg'),
      uploadImage(PHOTOS.heroMid, 'hero-mid.jpg'),
      uploadImage(PHOTOS.heroFg, 'hero-fg.jpg'),
      uploadImage(PHOTOS.wire, 'wire.jpg'),
      uploadImage(PHOTOS.review, 'review.jpg'),
      uploadImage(PHOTOS.award, 'award.jpg'),
      uploadImage(PHOTOS.shop, 'shop.jpg'),
      uploadImage(PHOTOS.shopLogo, 'shop-logo.jpg'),
      uploadImage(PHOTOS.edition, 'edition.jpg'),
      uploadImage(PHOTOS.drop, 'drop.jpg'),
      uploadImage(PHOTOS.event, 'event.jpg'),
    ])

  console.log('Creating departments…')
  await Promise.all([
    client.createOrReplace({_id: 'seed.department.style', _type: 'department', name: 'Style'}),
    client.createOrReplace({_id: 'seed.department.nightlife', _type: 'department', name: 'Nightlife'}),
    client.createOrReplace({_id: 'seed.department.culture', _type: 'department', name: 'Culture'}),
  ])

  console.log('Creating shop…')
  await client.createOrReplace({
    _id: 'seed.shop.someDays',
    _type: 'shop',
    name: 'Some Days LES',
    slug: {_type: 'slug', current: 'some-days-les'},
    logo: shopLogo,
    heroImage: shopImg,
    description: 'A consignment boutique on Ludlow Street specializing in rotating vintage and local-designer drops.',
    neighborhood: 'Lower East Side',
    address: '145 Ludlow St, New York, NY 10002',
    instagramHandle: '@somedaysles',
    websiteUrl: 'https://example.com/some-days-les',
    isActive: true,
  })

  console.log('Creating edition…')
  await client.createOrReplace({
    _id: 'seed.edition.issue1',
    _type: 'edition',
    title: 'Issue No. 1',
    slug: {_type: 'slug', current: 'issue-1'},
    issueNumber: 1,
    coverImage: editionImg,
    description: 'The debut issue of diime magazine.',
    publishDate: new Date().toISOString(),
    status: 'published',
  })

  console.log('Creating stories…')
  await Promise.all([
    client.createOrReplace({
      _id: 'seed.story.hero',
      _type: 'story',
      title: 'The Last Consignment Rack on Ludlow Street',
      slug: {_type: 'slug', current: 'last-consignment-rack-ludlow'},
      kind: 'feature',
      dek: 'Inside the shop betting that secondhand is the future of the LES.',
      heroImage: heroBg,
      layers: [
        {_type: 'parallaxLayer', _key: 'bg', image: heroBg, depth: 0.1, zIndex: 0},
        {_type: 'parallaxLayer', _key: 'mid', image: heroMid, depth: 0.4, zIndex: 1},
        {_type: 'parallaxLayer', _key: 'fg', image: heroFg, depth: 0.9, zIndex: 2},
      ],
      department: {_type: 'reference', _ref: 'seed.department.style'},
      relatedShop: {_type: 'reference', _ref: 'seed.shop.someDays'},
      edition: {_type: 'reference', _ref: 'seed.edition.issue1'},
      isExclusive: false,
      publishedAt: new Date().toISOString(),
    }),
    client.createOrReplace({
      _id: 'seed.story.wire',
      _type: 'story',
      title: 'Friday Night at Home Sweet Home',
      slug: {_type: 'slug', current: 'friday-night-home-sweet-home'},
      kind: 'wire',
      dek: 'A dispatch from the dance floor.',
      heroImage: wireImg,
      department: {_type: 'reference', _ref: 'seed.department.nightlife'},
      isExclusive: false,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    }),
    client.createOrReplace({
      _id: 'seed.story.review',
      _type: 'story',
      title: "Meet the Buyer Behind LES's Best Vintage Drops",
      slug: {_type: 'slug', current: 'buyer-behind-les-vintage-drops'},
      kind: 'review',
      dek: 'A profile of the eye curating the neighborhood\'s racks.',
      heroImage: reviewImg,
      department: {_type: 'reference', _ref: 'seed.department.culture'},
      relatedShop: {_type: 'reference', _ref: 'seed.shop.someDays'},
      isExclusive: true,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    }),
    client.createOrReplace({
      _id: 'seed.story.award',
      _type: 'story',
      title: 'diime Awards: Best New Boutique 2026',
      slug: {_type: 'slug', current: 'diime-awards-best-new-boutique-2026'},
      kind: 'award',
      dek: 'Our editors pick the shop redefining secondhand downtown.',
      heroImage: awardImg,
      department: {_type: 'reference', _ref: 'seed.department.style'},
      relatedShop: {_type: 'reference', _ref: 'seed.shop.someDays'},
      isExclusive: false,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    }),
  ])

  console.log('Creating drop + event…')
  await Promise.all([
    client.createOrReplace({
      _id: 'seed.drop.fall',
      _type: 'drop',
      title: 'Fall Consignment Drop',
      slug: {_type: 'slug', current: 'fall-consignment-drop'},
      shop: {_type: 'reference', _ref: 'seed.shop.someDays'},
      coverImage: dropImg,
      description: 'A fresh rack of fall vintage, consigned from LES closets.',
      dropDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      earlyAccessMinutes: 30,
      status: 'upcoming',
    }),
    client.createOrReplace({
      _id: 'seed.event.launch',
      _type: 'event',
      title: 'Issue No. 1 Launch Party',
      slug: {_type: 'slug', current: 'issue-1-launch-party'},
      coverImage: eventImg,
      description: 'Celebrating the debut issue with the LES community.',
      venueName: 'Some Days LES',
      venueAddress: '145 Ludlow St, New York, NY 10002',
      startDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      endDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 3).toISOString(),
      capacity: 80,
      rsvpDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(),
      status: 'upcoming',
    }),
  ])

  console.log('Done. Seeded 3 departments, 1 shop, 1 edition, 4 stories, 1 drop, 1 event.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
