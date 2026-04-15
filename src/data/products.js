import sai_baba from '../assets/images/sai-baba.png'
import ram_darbar from '../assets/images/ram_darbar.png'
import durga from '../assets/images/durga_maa.png'
import hanuman from '../assets/images/hanuman.png'
import ganesh from '../assets/images/ganesh.png'
import sai_baba_seated from '../assets/images/sai_baba_1.png'
import radha_krishna from '../assets/images/radha_krishna_pair.png'
import custom_temple from '../assets/images/custom_temple.png'
import small_krishna from '../assets/images/small_krishna.png'
import hanuman_flying from '../assets/images/hanuman_flying.png'
import ganesh_standing from '../assets/images/ganesh_standing.png'
import krishna_with from '../assets/images/krishna_with.png'
import sai_baba_2 from '../assets/images/sai_baba2.png'
import sai_baba_3 from '../assets/images/sai_baba3.png'
import kar_1 from '../assets/images/kar3.png'
import kar_2 from '../assets/images/kar2.png'
import kar_3 from '../assets/images/kar_4.png'
import duar_1 from '../assets/images/duar_2.png'
import duar_2 from '../assets/images/duar_1.png'
import hnu_2 from '../assets/images/hnu2.png'
import hnu_3 from '../assets/images/hun3.png'
import gan_2 from '../assets/images/gan2.png'
import gan_3 from '../assets/images/gan3.png'
import baba2 from '../assets/images/baba2.png'
import baba3 from '../assets/images/baba3.png'
import rad2 from '../assets/images/ra2.png'
import shiv_parivar from '../assets/images/shiv_parivar.png'
import shiv2 from '../assets/images/shiv2.png'
import shiv3 from '../assets/images/shiv3.png'
import shiv_meditation from '../assets/images/shiv_meditation.png'
import shiv_med2 from '../assets/images/shiv_med2.png'
import shiv_med3 from '../assets/images/shiv_med3.png'
import lakshmi from '../assets/images/lakshmi.png'
import lak2 from '../assets/images/lak2.png'
import saraswati from '../assets/images/saraswati.png'
import buddha from '../assets/images/buddha.png'
import bud2 from '../assets/images/bud2.png'
// import bal_gopal from '../assets/images/bal_gopal.png'
import vishnu from '../assets/images/vishnu.png'
import vis2 from '../assets/images/vis2.png'


export const products = [
{
  id: 1,
  name: "Sai Baba Blessing",
  category: "sai-baba",
  size: "medium",
  price: 25000,
  images: [sai_baba, sai_baba_2, sai_baba_3], // ✅ FIX
  material: "Premium Makrana Marble",
  height: "18 inch",
  finish: "Hand-painted with gold accents",
  weight: "12 kg",
  desc: "A serene representation..."
},
  { 
    id: 2, 
    name: "Krishna with Flute", 
    category: "krishna", 
    size: "medium", 
    price: 32000, 
   
    images: [ krishna_with, kar_1, kar_2, kar_3 ], // ✅ FIX
    material: "White Makrana Marble", 
    height: "24 inch", 
    finish: "Polished with gold leaf", 
    weight: "18 kg", 
    desc: "Lord Krishna in his iconic pose playing the divine flute, adorned with a peacock feather crown and intricate jewelry details." 
  },
  { 
    id: 3, 
    name: "Ram Darbar Set", 
    category: "ram", 
    size: "large", 
    price: 85000, 
    image: ram_darbar, 
    material: "Premium Makrana Marble", 
    height: "36 inch", 
    finish: "Gold painted details", 
    weight: "65 kg", 
    desc: "Complete Ram Darbar including Lord Ram, Sita, Lakshman, and Hanuman in a grand composition." 
  },
  { 
    id: 4, 
    name: "Durga Maa", 
    category: "durga", 
    size: "large", 
    price: 55000, 
    images: [durga, duar_1, duar_2], // ✅ FIX
    material: "Makrana Marble", 
    height: "30 inch", 
    finish: "Multi-color hand paint", 
    weight: "35 kg", 
    desc: "Goddess Durga in her powerful eight-armed form, mounted on her lion, with exquisite detailing." 
  },
  { 
    id: 5, 
    name: "Hanuman Ji", 
    category: "hanuman", 
    size: "medium", 
    price: 28000, 
    images: [hanuman, hnu_2, hnu_3],
    material: "White Marble", 
    height: "24 inch", 
    finish: "Orange & gold accents", 
    weight: "20 kg", 
    desc: "Lord Hanuman in his devotional pose, carrying the Sanjeevani mountain." 
  },
  { 
    id: 6, 
    name: "Ganesh Ji", 
    category: "ganesh", 
    size: "small", 
    price: 15000, 
    images: [ganesh, gan_2, gan_3],
    material: "Makrana Marble", 
    height: "12 inch", 
    finish: "Polished white with gold", 
    weight: "6 kg", 
    desc: "Lord Ganesha in a seated position with beautiful ornamental details and a natural marble glow." 
  },
  { 
    id: 7, 
    name: "Sai Baba Seated", 
    category: "sai-baba", 
    size: "large", 
    price: 45000, 
    images: [sai_baba_seated, baba2, baba3],
    material: "Premium Makrana", 
    height: "36 inch", 
    finish: "Realistic hand paint", 
    weight: "40 kg", 
    desc: "A life-like seated Sai Baba with intricate facial features and flowing robes." 
  },
  { 
    id: 8, 
    name: "Radha Krishna Pair", 
    category: "krishna", 
    size: "medium", 
    price: 42000, 
    images: [radha_krishna, rad2], 
    material: "White Makrana Marble", 
    height: "24 inch", 
    finish: "Multi-color with gold", 
    weight: "25 kg", 
    desc: "Divine couple Radha and Krishna in an enchanting dance pose." 
  },
  { 
    id: 9, 
    name: "Custom Temple Murti", 
    category: "custom", 
    size: "xlarge", 
    price: 0, 
    image: custom_temple,
    material: "As per requirement", 
    height: "Custom", 
    finish: "Custom", 
    weight: "Varies", 
    desc: "Fully customized marble statue designed and crafted to your specifications." 
  },
  { 
    id: 10, 
    name: "Small Krishna", 
    category: "krishna", 
    size: "small", 
    price: 12000, 
    image: small_krishna, 
    material: "White Marble", 
    height: "8 inch", 
    finish: "Polished with paint", 
    weight: "3 kg", 
    desc: "A beautiful small Krishna murti perfect for home temple." 
  },
  { 
    id: 11, 
    name: "Hanuman Flying", 
    category: "hanuman", 
    size: "large", 
    price: 48000, 
    image: hanuman_flying, 
    material: "Premium Marble", 
    height: "36 inch", 
    finish: "Dynamic paint finish", 
    weight: "38 kg", 
    desc: "Dynamic flying Hanuman sculpture capturing the moment of his leap to Lanka." 
  },
  { 
    id: 12, 
    name: "Ganesh Standing", 
    category: "ganesh", 
    size: "medium", 
    price: 22000, 
    image: ganesh_standing,
    material: "Makrana Marble", 
    height: "18 inch", 
    finish: "Gold & white", 
    weight: "10 kg", 
    desc: "Standing Ganesh Ji with detailed crown and ornaments." 
  },
  {
  id: 13,
  name: "Shiv Parivar",
  category: "shiv",
  size: "large",
  price: 78000,
  images: [shiv_parivar, shiv2, shiv3],
  material: "Premium Makrana Marble",
  height: "32 inch",
  finish: "Hand-painted with gold detailing",
  weight: "50 kg",
  desc: "Complete Shiv Parivar with Lord Shiva, Parvati, Ganesha and Kartikeya in divine composition."
},
{
  id: 14,
  name: "Shiv Ji Meditation",
  category: "shiv",
  size: "medium",
  price: 30000,
  images: [shiv_meditation, shiv_med2, shiv_med3],
  material: "White Marble",
  height: "24 inch",
  finish: "Matte white finish",
  weight: "22 kg",
  desc: "Lord Shiva in deep meditation seated on Mount Kailash."
},
{
  id: 15,
  name: "Lakshmi Ji",
  category: "lakshmi",
  size: "medium",
  price: 27000,
  images: [lakshmi, lak2],
  material: "Makrana Marble",
  height: "20 inch",
  finish: "Gold & multi-color",
  weight: "18 kg",
  desc: "Goddess Lakshmi seated on lotus symbolizing wealth and prosperity."
},
{
  id: 16,
  name: "Saraswati Maa",
  category: "saraswati",
  size: "medium",
  price: 26000,
  images: [saraswati],
  material: "White Marble",
  height: "22 inch",
  finish: "Soft pastel hand paint",
  weight: "17 kg",
  desc: "Goddess Saraswati playing veena representing wisdom and knowledge."
},
{
  id: 17,
  name: "Buddha Statue",
  category: "buddha",
  size: "medium",
  price: 24000,
  images: [buddha, bud2],
  material: "White Marble",
  height: "20 inch",
  finish: "Smooth polish",
  weight: "16 kg",
  desc: "Peaceful Buddha statue symbolizing calmness and enlightenment."
},
// {
//   id: 18,
//   name: "Bal Gopal",
//   category: "krishna",
//   size: "small",
//   price: 14000,
//   images: [bal_gopal, bal2],
//   material: "Makrana Marble",
//   height: "10 inch",
//   finish: "Colorful with gold",
//   weight: "5 kg",
//   desc: "Baby Krishna in crawling pose with butter pot."
// },
// {
//   id: 19,
//   name: "Mahavir Swami",
//   category: "jain",
//   size: "medium",
//   price: 31000,
//   images: [mahavir, mah2],
//   material: "White Marble",
//   height: "24 inch",
//   finish: "Gloss polish",
//   weight: "20 kg",
//   desc: "Lord Mahavir in meditative posture symbolizing peace and non-violence."
// },
{
  id: 20,
  name: "Vishnu Ji",
  category: "vishnu",
  size: "large",
  price: 60000,
  images: [vishnu, vis2],
  material: "Premium Marble",
  height: "30 inch",
  finish: "Rich gold detailing",
  weight: "40 kg",
  desc: "Lord Vishnu standing with Shankh, Chakra, Gada and Padma."
}
]

export const categories = [
  { id: 'all', name: 'All', emoji: '🔱' },
  { id: 'sai-baba', name: 'Sai Baba', emoji: '🙏' },
  { id: 'krishna', name: 'Krishna', emoji: '🦚' },
  { id: 'ram', name: 'Ram', emoji: '🏹' },
  { id: 'durga', name: 'Durga', emoji: '🔱' },
  { id: 'hanuman', name: 'Hanuman', emoji: '🐒' },
  { id: 'ganesh', name: 'Ganesh', emoji: '🐘' },
  { id: 'custom', name: 'Custom', emoji: '✨' },
]

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === 'all') return products
  return products.filter(product => product.category === category)
}

// Helper function to get related products
export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId)
  if (!product) return []
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}