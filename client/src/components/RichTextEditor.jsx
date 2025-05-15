import { Textarea } from "@/components/ui/textarea";

export function RichTextEditor({ input, setInput }) {
  const handleChange = (e) => {
    setInput({ ...input, description: e.target.value });
  };

  return (
    <Textarea
      value={input.description || ""}
      onChange={handleChange}
      placeholder="Type your message here."
    />
  );
}
