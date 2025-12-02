import banggor from '../assets/dummy/productImg/banggor.png';
import kunyitAsem from '../assets/dummy/productImg/kunyit-asem.png';
import berasKencur from '../assets/dummy/productImg/beras-kencur.png';
import klepon from '../assets/dummy/productImg/klepon.png';
import kueLapis from '../assets/dummy/productImg/kue-lapis.png';
import kueTete from '../assets/dummy/productImg/kue-tete.png';
import nasiKuning from '../assets/dummy/productImg/nasi-kuning.png';
import nasiUduk from '../assets/dummy/productImg/nasi-uduk.png';
import sotoAyam from '../assets/dummy/productImg/soto-ayam.png';
import esCampur from '../assets/dummy/productImg/es-campur.png';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  bestseller: boolean;
  likes: boolean;
  stock: number;
}

export const Products: Product[] = [
  {
    id: 1,
    name: 'Brambang Goreng',
    price: 25000,
    description: 'Brambang Goreng enak banget bikin nagih, dibuat dengan minyak yang baru dan dikeringkan menggunakan mesin pengering',
    image: banggor,
    category: 'Jajanan',
    bestseller: true,
    likes: true,
    stock: 12
  },
  {
    id: 2,
    name: 'Kunyit Asem',
    price: 5000,
    description: 'Kunyit Asem',
    image: kunyitAsem,
    category: 'Minuman',
    bestseller: true,
    likes: false,
    stock: 9
  },
  {
    id: 3,
    name: 'Beras Kencur',
    price: 12000,
    description: 'Beras Kencur',
    image: berasKencur,
    category: 'Minuman',
    bestseller: true,
    likes: false,
    stock: 8
  },
  {
    id: 4,
    name: 'Klepon',
    price: 5000,
    description: 'Klepon',
    image: klepon,
    category: 'Jajanan',
    bestseller: false,
    likes: false,
    stock: 10
  },
  {
    id: 5,
    name: 'Kue Lapis',
    price: 3000,
    description: 'Kue Lapis',
    image: kueLapis,
    category: 'Jajanan',
    bestseller: false,
    likes: false,
    stock: 15
  },
  {
    id: 6,
    name: 'Kue Tete',
    price: 3000,
    description: 'Kue Tete',
    image: kueTete,
    category: 'Jajanan',
    bestseller: false,
    likes: false,
    stock: 19
  },
  {
    id: 7,
    name: 'Nasi Kuning',
    price: 25000,
    description: 'Nasi Kuning',
    image: nasiKuning,
    category: 'Makanan',
    bestseller: false,
    likes: true,
    stock: 12
  },
  {
    id: 8,
    name: 'Nasi Uduk',
    price: 8000,
    description: 'Nasi Uduk',
    image: nasiUduk,
    category: 'Makanan',
    bestseller: false,
    likes: true,
    stock: 19
  },
  {
    id: 9,
    name: 'Soto Ayam',
    price: 10000,
    description: 'Soto Ayam',
    image: sotoAyam,
    category: 'Makanan',
    bestseller: false,
    likes: false,
    stock: 19
  },
  {
    id: 10,
    name: 'Es Campur',
    price: 5000,
    description: 'Es Campur',
    image: esCampur,
    category: 'Minuman',
    bestseller: true,
    likes: true,
    stock: 19
  },
];
