import Button from "../components/Button";
import Input from "../components/Input";

export default function CreatePost() {
  return (
    <div className="max-w-5xl">

      <h1 className="text-4xl font-bold mb-8">
        Create New Post
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">

        <Input
          placeholder="Post Title"
        />

        <input
          type="file"
          className="w-full border rounded-lg p-3"
        />

        <select
          className="w-full border rounded-lg p-3"
        >

          <option>
            Select Category
          </option>

          <option>
            Programming
          </option>

          <option>
            React
          </option>

          <option>
            Node.js
          </option>

          <option>
            AI
          </option>

        </select>

        <textarea
          rows="12"
          placeholder="Write your blog here..."
          className="w-full border rounded-lg p-4 resize-none"
        />

        <div className="flex gap-4">

          <Button>
            Save Draft
          </Button>

          <Button className="bg-green-600 hover:bg-green-700">
            Publish
          </Button>

        </div>

      </div>

    </div>
  );
}