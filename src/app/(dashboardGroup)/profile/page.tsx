import { myProfile } from "../_actions/getProfile";
import ProfileContent from "../_components/prodileContent";
const ProfilePage = async () => {
  const user = await myProfile();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          User data could not be loaded. Please log in again.
        </p>
      </div>
    );
  }

  return <ProfileContent user={user} />;
};

export default ProfilePage;
