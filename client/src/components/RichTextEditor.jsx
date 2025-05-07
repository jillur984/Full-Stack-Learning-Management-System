import React, { useCallback, useState } from "react";
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
} from "remirror/extensions";
import { Remirror, useRemirror } from "@remirror/react";

const RichTextEditor = () => {
  const extensions = useCallback(
    () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
    ],
    []
  );

  const { manager, state, onChange } = useRemirror({
    extensions,
    content: "<p>This is the initial value</p>",
    stringHandler: "html",
  });

  const [value, setValue] = useState("<p>This is the initial value</p>");

  const handleChange = useCallback(({ helpers }) => {
    const html = helpers.getHTML();
    setValue(html);
  }, []);

  return (
    <Remirror
      manager={manager}
      state={state}
      onChange={handleChange}
      autoFocus
    />
  );
};

export default RichTextEditor;
