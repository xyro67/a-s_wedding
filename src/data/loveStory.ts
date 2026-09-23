export type Chapter = {
  number: string
  title: string
  text: string
  variant: 'verse' | 'photo' | 'highlight' | 'finale'
  image?: string
  imageAlt?: string
}

/**
 * Three chapters carry a photograph; the rest are text-led and use a traditional
 * motif instead, so the narrative stays restrained.
 */
export const loveStory: Chapter[] = [
  {
    number: 'I',
    title: 'Where It All Began',
    text: 'Our story began in medical school, where we first met as MBBS batchmates. For years, we shared the familiar rhythm of college life — lectures, clinical postings, examinations, and countless memories — never knowing that our paths would eventually lead us to something much more meaningful.',
    variant: 'verse',
  },
  {
    number: 'II',
    title: 'Cherished Friendship',
    text: 'It was during our internship that we began to know each other more deeply. Amidst busy hospital days, long conversations, and the simple moments we shared, a genuine bond gradually took shape.',
    variant: 'highlight'
  },
  {
    number: 'III',
    title: 'A Journey Together',
    text: 'After completing our internship, we set out on a trip together. Away from the familiar surroundings of medical school and hospital life, we found ourselves spending more time together, discovering new sides of each other and forming memories that brought us closer.',
    variant: 'photo',
    image: '/images/journey_together.jpg',
    imageAlt: 'Akshay and Surya setting out together on a motorcycle in the hills',
  },
  {
    number: 'IV',
    title: 'When Friendship Became Love',
    text: 'A few days after the journey, our friendship quietly blossomed into something more.',
    variant: 'highlight',
  },
  {
    number: 'V',
    title: 'Growing Together',
    text: 'What began as a friendship between two batchmates gradually grew into a relationship built on understanding, companionship, and shared dreams.',
    variant: 'photo',
    image: '/images/little-moments.jpg',
    imageAlt: 'Akshay and Surya sharing a close, playful moment together',
  },
  {
    number: 'VI',
    title: 'Choosing Each Other',
    text: 'Today, we look back with gratitude at the journey that brought us here — from being batchmates in medical school to choosing each other as life partners.',
    variant: 'photo',
    image: '/images/traditional-embrace.jpg',
    imageAlt: 'Akshay and Surya together in traditional attire',
  },
  {
    number: 'VII',
    title: 'The Next Chapter',
    text: 'And now, we begin the most beautiful chapter of our story — together.',
    variant: 'finale',
  },
]
