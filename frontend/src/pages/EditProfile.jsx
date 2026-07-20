import Button from "../components/Button";
import Input from "../components/Input";
import user from "../data/user";

export default function EditProfile() {
  return (
    <div className="max-w-4xl">

      <h1 className="text-4xl font-bold mb-8">
        Edit Profile
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">

        <div>

          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover"
          />

          <input
            type="file"
            className="mt-4"
          />

        </div>

        <Input
          defaultValue={user.name}
        />

        <Input
          defaultValue={user.username}
        />

        <Input
          defaultValue={user.email}
        />

        <textarea
          rows="5"
          defaultValue={user.bio}
          className="w-full border rounded-lg p-4"
        />

        <Input
          defaultValue={user.github}
        />

        <Input
          defaultValue={user.linkedin}
        />

        <Button>
          Save Changes
        </Button>

      </div>

    </div>
  );
}