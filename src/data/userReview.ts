import DefaultProfile from "../assets/icon/DefaultProfile.png";

export interface UserReview {
  id: number;
  profile_image: string;
  name: string;
  product_id: number;
  created_at: string;
  review: string;
}

export const userReview: UserReview[] = [
  {
    id: 1,
    profile_image: DefaultProfile,
    name: "Budi Santoso",
    product_id: 1,
    created_at: "2023-10-25",
    review:
      "Enak banget! Rasanya gurih dan renyah. Cocok buat temen makan nasi.",
  },
  {
    id: 2,
    profile_image: DefaultProfile,
    name: "Siti Aminah",
    product_id: 1,
    created_at: "2023-10-26",
    review: "Pengiriman cepat, packing aman. Brambang gorengnya mantap!",
  },
  {
    id: 3,
    profile_image: DefaultProfile,
    name: "Rudi Hartono",
    product_id: 2,
    created_at: "2023-10-27",
    review: "Seger banget kunyit asemnya. Manis asemnya pas.",
  },
  {
    id: 4,
    profile_image: DefaultProfile,
    name: "Dewi Lestari",
    product_id: 6,
    created_at: "2023-10-28",
    review: "Kue tetenya lembut banget, manisnya pas. Suka banget!",
  },
  {
    id: 5,
    profile_image: DefaultProfile,
    name: "Agus Setiawan",
    product_id: 6,
    created_at: "2023-10-29",
    review: "Rasanya otentik, kayak jajanan pasar jaman dulu. Recommended!",
  },
  {
    id: 6,
    profile_image: DefaultProfile,
    name: "Rina Wati",
    product_id: 3,
    created_at: "2023-10-30",
    review: "Beras kencurnya anget di badan. Enak diminum pas hujan.",
  },
];
