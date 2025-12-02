// userProfile.ts
import DefaultProfile from '../assets/icon/DefaultProfile.png';

export interface UserProfile {
  email: string;
  username: string;
  phone: string;
  profileImage: string;
}

export const initialUserProfile: UserProfile = {
  email: 'user@example.com',
  username: 'john_doe',
  phone: '081234567890',
  profileImage: DefaultProfile,
};

export const saveProfile = (profile: UserProfile): void => {
  console.log('Profile saved:', {
    ...profile
  });
};

export const updateProfileImage = (imageFile: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.readAsDataURL(imageFile);
  });
};